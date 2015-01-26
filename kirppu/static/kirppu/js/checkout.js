(function(){this.displayPrice=function(t,e){var n,r;return null==e&&(e=!1),null!=t?Number.isInteger(t)?n=t.formatCents()+" €":(n=t,e=!1):(n="",e=!1),e&&t.round5()!==t&&(r=t.round5().formatCents()+" €",n=""+r+" ("+n+")"),n},this.displayState=function(t){return{SO:gettext("sold"),BR:gettext("on display"),ST:gettext("about to be sold"),MI:gettext("missing"),RE:gettext("returned to the vendor"),CO:gettext("sold and compensated to the vendor"),AD:gettext("not brought to the event")}[t]},Number.prototype.round5=function(){var t;return t=this%5,t>=2.5?this+(5-t):this-t}}).call(this),function(){var t;t=function(){function t(){}return t.prototype.uiId={container:null,body:null,glyph:null,stateText:null,subtitleText:null,codeInput:null,codeForm:null,modeMenu:null,dialog:null},t.prototype.uiRef={container:null,body:null,glyph:null,stateText:null,subtitleText:null,codeInput:null,codeForm:null,modeMenu:null,dialog:null},t.prototype.settings={itemPrefix:null,clerkPrefix:"::",counterPrefix:":*",removeItemPrefix:"-",payPrefix:"+",abortPrefix:null,logoutPrefix:null,counterCode:null,clerkName:null},t.prototype.check=function(){var t,e,n,r,o;e=!1,o=this.uiId;for(n in o)r=o[n],t=$("#"+r),null!=t&&1===t.length?this.uiRef[n]=t:(console.error("Name "+r+" does not identify an element for "+n+"."),e=!0);return e},t}(),window.CheckoutConfig=new t,Number.FRACTION_LEN=2,Number.FRACTION=Math.pow(10,Number.FRACTION_LEN),Number.prototype.formatCents=function(){var t,e,n,r,o,i,s;for(o=Math.floor(Math.abs(this/Number.FRACTION)),t=Math.abs(this%Number.FRACTION),n="",e=(""+t).length,r=i=e,s=Number.FRACTION_LEN;s>=e?s>i:i>s;r=s>=e?++i:--i)n+="0";return n+=t,0>this&&(o="-"+o),o+"."+n},String.prototype.parseCents=function(){var t,e,n,r,o,i;return o=/^(-?)(\d*)(?:[,.](\d*))?$/,r=o.exec(this),null==r?null:(null==r[1]&&(r[1]=""),null==r[2]&&(r[2]="0"),null==r[3]&&(r[3]="0"),i=r[2]-0,e=r[3]-0,n=Math.pow(10,Number.FRACTION_LEN-r[3].length),e=Math.round(e*n),t=i*Number.FRACTION,"-"!==r[1]?t+=e:t=-t-e,t)}}.call(this),function(){var t=[].slice;this.DateTimeFormatter=function(){function e(){}return e.timeZone=null,e.locales=null,e._createDateOptions=function(){return{timeZone:this.constructor.timeZone}},e._dateSupportsLocales=function(t){var e;try{(new Date)[t]("i")}catch(n){if(e=n,"RangeError"===e.name){try{(new Date)[t](this.locales,{timeZone:this.timeZone})}catch(n){if(e=n,"RangeError"===e.name)return 1}return 2}}return 0},e._buildSupport=function(){var e,n,r,o,i;for(n=1<=arguments.length?t.call(arguments,0):[],r={},o=0,i=n.length;i>o;o++)e=n[o],r[e]=this._dateSupportsLocales(e);return r},e.init=function(t,e){return null==t&&(t=void 0),null==e&&(e=void 0),null!=t&&null!=e&&(this.locales=t,this.timeZone=e),this._dateSupport=this._buildSupport("toLocaleDateString","toLocaleTimeString","toLocaleString")},e._dateSupport=null,e._callDateLocale=function(t,e){var n,r;return n=new Date(t),r=this._dateSupport[e],2===r?n[e](this.locales,this._createDateOptions()):1===r?n[e](this.locales):n[e]()},e.date=function(t){return this._callDateLocale(t,"toLocaleDateString")},e.time=function(t){return this._callDateLocale(t,"toLocaleTimeString")},e.datetime=function(t){return this._callDateLocale(t,"toLocaleString")},e}()}.call(this),function(){this.Dialog=function(){function t(t,e){null==t&&(t="#dialog_template"),null==e&&(e="#dialog_template_label"),this.container=$(t),this.title=this.container.find(e),this.body=this.container.find(".modal-body"),this.buttons=this.container.find(".modal-footer"),this.title.empty(),this.body.empty(),this.buttons.empty(),this.btnPositive=null,this.btnNegative=null}return t.prototype.addPositive=function(t){return null==t&&(t="success"),this.btnPositive=this._button(t)},t.prototype.addNegative=function(t){return null==t&&(t="default"),this.btnNegative=this._button(t)},t.prototype.setEnabled=function(t,e){return null==e&&(e=!0),e?t.removeAttr("disabled"):t.attr("disabled","disabled")},t.prototype.show=function(t){return null==t&&(t={keyboard:!1}),null!=this.btnPositive&&this.buttons.append(this.btnPositive),null!=this.btnNegative&&this.buttons.append(this.btnNegative),this.container.modal(t)},t.prototype._button=function(t){return null==t&&(t="default"),$('<button type="button" class="btn btn-'+t+'" data-dismiss="modal">')},t}()}.call(this),function(){this.ResultTable=function(){function t(t){this.dom=$('<table class="table table-striped table-hover table-condensed">'),null!=t&&this.dom.append($('<caption class="h3">').text(t)),this.head=$("<tr>"),this.body=$("<tbody>"),this.dom.append($("<thead>").append(this.head),this.body)}return t.prototype.render=function(){return this.dom},t}()}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};this.ItemReceiptTable=function(t){function n(){n.__super__.constructor.apply(this,arguments),this.head.append(['<th class="receipt_index">#</th>','<th class="receipt_code">'+gettext("code")+"</th>",'<th class="receipt_item">'+gettext("item")+"</th>",'<th class="receipt_price">'+gettext("price")+"</th>"].map($))}return e(n,t),n}(ResultTable)}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};this.ItemReportTable=function(t){function n(){var t;n.__super__.constructor.apply(this,arguments),this.columns=[{title:gettext("#"),render:function(t,e){return e+1},"class":"receipt_index numeric"},{title:gettext("code"),render:function(t){return t.code},"class":"receipt_code"},{title:gettext("item"),render:function(t){return t.name},"class":"receipt_item"},{title:gettext("price"),render:function(t){return displayPrice(t.price)},"class":"receipt_price numeric"},{title:gettext("status"),render:function(t){return displayState(t.state)},"class":"receipt_status"}],this.head.append(function(){var e,n,r,o;for(r=this.columns,o=[],e=0,n=r.length;n>e;e++)t=r[e],o.push($("<th>").text(t.title).addClass(t["class"]));return o}.call(this))}return e(n,t),n.prototype.update=function(t){var e,n,r,o,i,s,u;for(this.body.empty(),i=0,n=s=0,u=t.length;u>s;n=++s)r=t[n],i+=r.price,o=$("<tr>").append(function(){var t,o,i,s;for(i=this.columns,s=[],t=0,o=i.length;o>t;t++)e=i[t],s.push($("<td>").text(e.render(r,n)).addClass(e["class"]));return s}.call(this)),this.body.append(o);return this.body.append($("<tr>").append($('<th colspan="3">').text(gettext("Total:")),$('<th class="receipt_price numeric">').text(displayPrice(i)),$("<th>")))},n}(ResultTable)}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};this.VendorList=function(t){function n(){n.__super__.constructor.apply(this,arguments),this.head.append(['<th class="receipt_index">#</th>','<th class="receipt_username">username</th>','<th class="receipt_vendor_id">id</th>','<th class="receipt_name">name</th>','<th class="receipt_email">email</th>','<th class="receipt_phone">phone</th>'].map($))}return e(n,t),n.prototype.append=function(t,e,n){var r,o;return o=$("<tr>"),o.addClass("receipt_tr_clickable"),o.append($("<td>").text(e)),o.append(function(){var e,n,o,i;for(o=["username","id","name","email","phone"],i=[],e=0,n=o.length;n>e;e++)r=o[e],i.push($("<td>").text(t[r]));return i}()),o.click(n),this.body.append(o)},n}(ResultTable)}.call(this),function(){this.VendorInfo=function(){function t(t){var e,n,r,o,i;for(this.dom=$('<div class="vendor-info-box">'),this.dom.append($("<h3>").text(gettext("Vendor"))),n=$('<dl class="dl-horizontal">'),i=["name","email","phone","id"],r=0,o=i.length;o>r;r++)e=i[r],n.append($("<dt>").text(e)),n.append($("<dd>").text(t[e]));this.dom.append(n)}return t.prototype.render=function(){return this.dom},t}()}.call(this),function(){this.ReceiptSum=function(){function t(){this.dom=$('<p class="lead text-right">')}return t.prototype.render=function(){return this.dom},t.prototype.set=function(t){return this.dom.text(t)},t.prototype.setEnabled=function(t){return null==t&&(t=!0),setClass(this.dom,"text-muted",!t)},t}()}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e},n=[].slice;this.PrintReceiptTable=function(t){function r(){var t;t=1<=arguments.length?n.call(arguments,0):[],r.__super__.constructor.apply(this,t),this.head.append(['<th class="receipt_vendor_id">'+this.constructor.strVendor+"</th>",'<th class="receipt_code">'+this.constructor.strCode+"</th>",'<th class="receipt_item">'+this.constructor.strItem+"</th>",'<th class="receipt_price">'+this.constructor.strPrice+"</th>"].map($))}return e(r,t),r.strCode="code",r.strItem="item",r.strPrice="price",r.strVendor="vendor",r.joinedLine=function(t,e){return null==t&&(t=""),null==e&&(e=!1),$("<tr>").append($('<td colspan="4">')[e?"html":"text"](t))},r.createRow=function(){var t,e,r,o,i,s,u,c,p;for(t=3<=arguments.length?n.call(arguments,0,s=arguments.length-2):(s=0,[]),e=arguments[s++],r=arguments[s++],o=$("<tr>"),p=n.call(t).concat([displayPrice(e,r)]),u=0,c=p.length;c>u;u++)i=p[u],o.append($("<td>").text(i));return o},r}(ResultTable)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};this.setClass=function(t,e,n){return t.hasClass(e)!==n&&(n?t.addClass(e):t.removeClass(e)),t},this.ModeSwitcher=function(){function e(n){this._onFormSubmit=t(this._onFormSubmit,this);var r;this.cfg=n?n:CheckoutConfig,this._currentMode=null,this._bindMenu(e.entryPoints),this._bindForm(),r=function(t){return function(){var e;return e=function(){return t.cfg.uiRef.codeInput.focus()},setTimeout(e,0)}}(this),this.cfg.uiRef.dialog.on("hidden.bs.modal",r),$("#help_dialog").on("hidden.bs.modal",r)}return e.entryPoints={},e.registerEntryPoint=function(t,e){return t in this.entryPoints?console.error("Name '"+t+"' was already registered for '"+this.entryPoints[t].name+"' while registering '"+e.name+"'."):this.entryPoints[t]=e},e.prototype.startDefault=function(){return this.switchTo(e.entryPoints.counter_validation)},e.prototype.switchTo=function(t,e){return null==e&&(e=null),null!=this._currentMode&&this._currentMode.exit(),this.setMenuEnabled(!0),this._currentMode=new t(this,this.cfg,e),this.cfg.uiRef.container.removeClass().addClass("container").addClass("color-mode"),this.cfg.uiRef.container.addClass("color-"+this._currentMode.constructor.name),this.cfg.uiRef.body.empty(),this.cfg.uiRef.glyph.removeClass().addClass("glyphicon"),this._currentMode.glyph()&&this.cfg.uiRef.glyph.addClass("glyphicon-"+this._currentMode.glyph()),this.cfg.uiRef.stateText.text(this._currentMode.title()),this.cfg.uiRef.subtitleText.text(this._currentMode.subtitle()||""),this.cfg.uiRef.codeInput.attr("placeholder",this._currentMode.inputPlaceholder()),this._currentMode.enter(),this.cfg.uiRef.codeInput.focus()},e.prototype._bindForm=function(){var t;return t=this.cfg.uiRef.codeForm,t.off("submit"),t.submit(this._onFormSubmit)},e.prototype._onFormSubmit=function(t){var e,n,r,o,i,s,u;return t.preventDefault(),o=this.cfg.uiRef.codeInput.val(),n=this._currentMode.actions(),i=function(){var t,r,i;for(i=[],t=0,r=n.length;r>t;t++)e=n[t],0===o.indexOf(e[0])&&i.push(e);return i}(),i=i.sort(function(t,e){return e[0].length-t[0].length}),null!=i[0]?(u=i[0],s=u[0],r=u[1],r(o.slice(s.length),s),this.cfg.uiRef.codeInput.val("")):console.error("Input not accepted: '"+o+"'.")},e.prototype._bindMenu=function(t){var e,n,r,o,i,s,u,c;for(s=this.cfg.uiRef.modeMenu,i=s.find("[data-entrypoint]"),u=0,c=i.length;c>u;u++)o=i[u],r=$(o),n=r.attr("data-entrypoint"),n in t?(e=t[n],function(t,e){return r.click(function(){return console.log("Changing mode from menu to "+e.name),t.switchTo(e)})}(this,e)):(console.warn("Entry point '"+n+"' could not be found from registered entry points. Source:"),console.log(o))},e.prototype.setMenuEnabled=function(t){var e;return e=this.cfg.uiRef.modeMenu,setClass(e,"disabled",!t),setClass(e.find("a:first"),"disabled",!t)},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};this.CheckoutMode=function(){function e(e,n){this.onLogout=t(this.onLogout,this),this.switcher=e,this.cfg=n?n:CheckoutConfig}return e.prototype.glyph=function(){return""},e.prototype.title=function(){return"[unknown mode]"},e.prototype.subtitle=function(){return""+this.cfg.settings.clerkName+" @ "+this.cfg.settings.counterName},e.prototype.inputPlaceholder=function(){return"Barcode"},e.prototype.enter=function(){},e.prototype.exit=function(){},e.prototype.actions=function(){return[["",function(){}]]},e.prototype.onLogout=function(){return Api.clerk_logout().then(function(t){return function(){return console.log("Logged out "+t.cfg.settings.clerkName+"."),t.cfg.settings.clerkName=null,t.switcher.switchTo(ClerkLoginMode)}}(this),function(){return function(){return alert("Logout failed!"),!0}}(this))},e}()}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};this.ItemCheckoutMode=function(t){function n(){n.__super__.constructor.apply(this,arguments),this.receipt=new ItemReceiptTable}return e(n,t),n.prototype.enter=function(){return n.__super__.enter.apply(this,arguments),this.cfg.uiRef.body.append(this.receipt.render())},n.prototype.createRow=function(t,e,n,r,o){var i,s,u,c,p;for(null==r&&(r=null),null==o&&(o=!1),i=$('<tr id="'+e+'">'),p=[t,e,n,displayPrice(r,o)],u=0,c=p.length;c>u;u++)s=p[u],i.append($("<td>").text(s));return i},n}(CheckoutMode)}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}},r={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};e=function(t){return window.btoa(encodeURIComponent(escape(t)))},t=function(t){return unescape(decodeURIComponent(window.atob(t)))},this.CounterValidationMode=function(r){function i(){return this.onResultError=n(this.onResultError,this),this.onResultSuccess=n(this.onResultSuccess,this),i.__super__.constructor.apply(this,arguments)}return o(i,r),ModeSwitcher.registerEntryPoint("counter_validation",i),i.COOKIE="mCV",i.prototype.title=function(){return"Locked"},i.prototype.subtitle=function(){return"Need to validate counter."},i.prototype.enter=function(){var e,n;return i.__super__.enter.apply(this,arguments),this.switcher.setMenuEnabled(!1),e=$.cookie(this.constructor.COOKIE),null!=e?(n=JSON.parse(t(e)),this.onResultSuccess(n)):void 0},i.prototype.actions=function(){return[[this.cfg.settings.counterPrefix,function(t){return function(e){return Api.counter_validate({code:e}).then(t.onResultSuccess,t.onResultError)}}(this)]]},i.prototype.onResultSuccess=function(t){var n,r;return n=t.counter,r=t.name,this.cfg.settings.counterCode=n,this.cfg.settings.counterName=r,console.log("Validated "+n+" as "+r+"."),$.cookie(this.constructor.COOKIE,e(JSON.stringify({counter:n,name:r}))),this.switcher.switchTo(ClerkLoginMode)},i.prototype.onResultError=function(t){return 419===t.status?void console.log("Invalid counter code supplied."):(alert("Error:"+t.responseText),!0)},i.clearStore=function(){return $.removeCookie(this.COOKIE)},i}(CheckoutMode)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};this.ClerkLoginMode=function(e){function r(){return this.onResultError=t(this.onResultError,this),this.onResultSuccess=t(this.onResultSuccess,this),r.__super__.constructor.apply(this,arguments)}return n(r,e),ModeSwitcher.registerEntryPoint("clerk_login",r),r.prototype.title=function(){return"Locked"},r.prototype.subtitle=function(){return"Login..."},r.prototype.enter=function(){return r.__super__.enter.apply(this,arguments),this.switcher.setMenuEnabled(!1)},r.prototype.actions=function(){return[[this.cfg.settings.clerkPrefix,function(t){return function(e,n){return Api.clerk_login({code:n+e,counter:t.cfg.settings.counterCode}).then(t.onResultSuccess,t.onResultError)}}(this)]]},r.prototype.onResultSuccess=function(t){var e;return e=t.user,this.cfg.settings.clerkName=e,console.log("Logged in as "+e+"."),null!=t.receipts?this.multipleReceipts(t.receipts):null!=t.receipt?this.activateReceipt(t.receipt):this.switcher.switchTo(CounterMode)},r.prototype.onResultError=function(t){return 419===t.status?void console.log("Login failed: "+t.responseText):(alert("Error:"+t.responseText),!0)},r.prototype.activateReceipt=function(t){return this.switcher.switchTo(CounterMode,t)},r.prototype.multipleReceipts=function(t){var e,n,r,o;return e=new Dialog,e.title.html('<span class="glyphicon glyphicon-warning-sign text-warning"></span> Multiple receipts active'),n=$("<div>").text("Please select receipt, which you want to continue."),o=$("<tbody>"),this._createReceiptTable(t,e,o),r=$('<table class="table table-striped table-hover table-condensed">').append(o),e.body.append(n,r),e.addPositive().text("Select").click(function(e){return function(){var n;return n=o.find(".success").data("index"),null!=n?(console.log("Selected "+(1+n)+": "+t[n].start_time),e.switcher.switchTo(CounterMode,t[n])):void 0}}(this)),e.setEnabled(e.btnPositive,!1),e.addNegative().text("Cancel").click(function(){return console.log("Cancelled receipt selection")}),e.show({keyboard:!1,backdrop:"static"})},r.prototype._createReceiptTable=function(t,e,n){var r,o,i,s,u;for(r=s=0,u=t.length;u>s;r=++s)o=t[r],i=$("<tr>"),i.append($("<td>").text(r+1),$("<td>").text(DateTimeFormatter.datetime(o.start_time)),$("<td>").text(o.total.formatCents()),$("<td>").text(o.counter)),i.click(function(){return n.find(".success").removeClass("success"),$(this).addClass("success"),e.setEnabled(e.btnPositive)}),i.data("index",r),n.append(i);return n},r}(CheckoutMode)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},r=[].slice;this.ItemCheckInMode=function(e){function o(){var e,n,i;e=2<=arguments.length?r.call(arguments,0,i=arguments.length-1):(i=0,[]),n=arguments[i++],this.onResultError=t(this.onResultError,this),this.onResultSuccess=t(this.onResultSuccess,this),o.__super__.constructor.apply(this,arguments),this.currentVendor=null}return n(o,e),ModeSwitcher.registerEntryPoint("vendor_check_in",o),o.prototype.glyph=function(){return"import"},o.prototype.title=function(){return"Vendor Check-In"},o.prototype.actions=function(){return[["",function(t){return function(e){return Api.item_checkin({code:e}).then(t.onResultSuccess,t.onResultError)}}(this)],[this.cfg.settings.logoutPrefix,this.onLogout]]},o.prototype.onResultSuccess=function(t){var e;return t.vendor!==this.currentVendor?(this.currentVendor=t.vendor,Api.vendor_get({id:this.currentVendor}).done(function(e){return function(n){var r;return e.receipt.body.prepend(new VendorInfo(n).render()),r=e.createRow("",t.code,t.name,t.price),e.receipt.body.prepend(r)}}(this))):(e=this.createRow("",t.code,t.name,t.price),this.receipt.body.prepend(e))},o.prototype.onResultError=function(t){return 404===t.status?void alert("No such item"):(alert("Error:"+t.responseText),!0)},o}(ItemCheckoutMode)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};this.VendorCheckoutMode=function(e){function r(e,n,o){this.onCheckedOut=t(this.onCheckedOut,this),this.onItemFound=t(this.onItemFound,this),this.returnItem=t(this.returnItem,this),this.onGotItems=t(this.onGotItems,this),r.__super__.constructor.call(this,e,n),this.vendorId=null!=o?o.id:null,this.receipt=new ItemReceiptTable("Returned items"),this.lastItem=new ItemReceiptTable,this.remainingItems=new ItemReceiptTable("Remaining items")}return n(r,e),ModeSwitcher.registerEntryPoint("vendor_check_out",r),r.prototype.enter=function(){return r.__super__.enter.apply(this,arguments),this.cfg.uiRef.body.prepend(this.remainingItems.render()),this.cfg.uiRef.body.prepend(this.lastItem.render()),null!=this.vendorId?this.addVendorInfo():void 0},r.prototype.glyph=function(){return"export"},r.prototype.title=function(){return"Vendor Check-Out"},r.prototype.actions=function(){return[["",this.returnItem],[this.cfg.settings.logoutPrefix,this.onLogout]]},r.prototype.addVendorInfo=function(){return Api.vendor_get({id:this.vendorId}).done(function(t){return function(e){return t.cfg.uiRef.body.prepend($('<input type="button">').addClass("btn btn-primary").attr("value","Open Report").click(function(){return t.switcher.switchTo(VendorReport,e)})),t.cfg.uiRef.body.prepend(new VendorInfo(e).render())}}(this)),Api.item_list({vendor:this.vendorId}).done(this.onGotItems)},r.prototype.onGotItems=function(t){var e,n,r,o,i,s,u,c,p;for(n={BR:0,ST:0,MI:0},i=0,u=t.length;u>i;i++)e=t[i],null!=n[e.state]&&(o=this.createRow("",e.code,e.name,e.price),this.remainingItems.body.prepend(o));for(r={RE:0,CO:0},p=[],s=0,c=t.length;c>s;s++)e=t[s],null!=r[e.state]&&(o=this.createRow("",e.code,e.name,e.price),p.push(this.receipt.body.prepend(o)));return p},r.prototype.returnItem=function(t){return Api.item_find({code:t}).done(this.onItemFound)},r.prototype.onItemFound=function(t){if(null==this.vendorId)this.vendorId=t.vendor,this.addVendorInfo();else if(this.vendorId!==t.vendor)return void alert("Someone else's item!");return Api.item_checkout({code:t.code}).done(this.onCheckedOut)},r.prototype.onCheckedOut=function(t){return this.receipt.body.prepend($("tr",this.lastItem.body)),this.lastItem.body.prepend($("#"+t.code,this.remainingItems.body))},r}(ItemCheckoutMode)}.call(this),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}},n={}.hasOwnProperty,r=function(t,e){function r(){this.constructor=t}for(var o in e)n.call(e,o)&&(t[o]=e[o]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o=[].slice;this.CounterMode=function(n){function i(){var n,r,s;n=2<=arguments.length?o.call(arguments,0,s=arguments.length-1):(s=0,[]),r=arguments[s++],this.onLogout=e(this.onLogout,this),this.onAbortReceipt=e(this.onAbortReceipt,this),this.onPayReceipt=e(this.onPayReceipt,this),this.onRemoveItem=e(this.onRemoveItem,this),this.showError=e(this.showError,this),this.onAddItem=e(this.onAddItem,this),i.__super__.constructor.apply(this,n),this._receipt=new t,this.receiptSum=new ReceiptSum,null!=r&&this.restoreReceipt(r),this.receipt.body.attr("id","counter_receipt")}return r(i,n),ModeSwitcher.registerEntryPoint("customer_checkout",i),i.prototype.glyph=function(){return"euro"},i.prototype.title=function(){return"Checkout"},i.prototype.actions=function(){return[[this.cfg.settings.abortPrefix,this.onAbortReceipt],[this.cfg.settings.logoutPrefix,this.onLogout],[this.cfg.settings.payPrefix,this.onPayReceipt],[this.cfg.settings.removeItemPrefix,this.onRemoveItem],["",this.onAddItem]]},i.prototype.enter=function(){return this.cfg.uiRef.body.append(this.receiptSum.render()),i.__super__.enter.apply(this,arguments),this._setSum()},i.prototype.addRow=function(t,e,n,r){var o,i;return null==r&&(r=!1),null!=t?(this._receipt.rowCount++,o=this._receipt.rowCount,null!=n&&0>n&&(o=-o)):(t="",o=""),i=this.createRow(o,t,e,n,r),this.receipt.body.prepend(i),this._receipt.isActive()&&this._setSum(this._receipt.total),i},i.prototype.onAddItem=function(t){return""!==t.trim()?this._receipt.isActive()?this.reserveItem(t):Api.item_find({code:t,available:!0}).then(function(e){return function(){return e.startReceipt(t)}}(this),function(e){return function(n){return e.showError(n.status,n.responseText,t)}}(this)):void 0},i.prototype.showError=function(t,e,n){var r;switch(t){case 404:r="Item is not registered.";break;case 409:r=e;break;case 423:r=e;break;default:r="Error "+t+"."}return alert(r+" "+n)},i.prototype.restoreReceipt=function(t){return this.switcher.setMenuEnabled(!1),Api.receipt_activate({id:t.id}).then(function(t){return function(e){var n,r,o,i,s;for(t._receipt.start(e),t._receipt.total=e.total,t.receipt.body.empty(),s=e.items,o=0,i=s.length;i>o;o++)n=s[o],r="DEL"===n.action?-n.price:n.price,t.addRow(n.code,n.name,r);return t._setSum(t._receipt.total)}}(this),function(t){return function(){return alert("Could not restore receipt!"),t.switcher.setMenuEnabled(!0)}}(this))},i.prototype.startReceipt=function(t){return this._receipt.start(),this.switcher.setMenuEnabled(!1),Api.receipt_start().then(function(e){return function(n){return e._receipt.data=n,e.receipt.body.empty(),e._setSum(),e.reserveItem(t)}}(this),function(t){return function(){return alert("Could not start receipt!"),t._receipt.end(),t.switcher.setMenuEnabled(!0),!0}}(this))},i.prototype._setSum=function(t,e){var n;return null==t&&(t=0),null==e&&(e=null),n="Total: "+t.formatCents()+" €",null!=e&&(n+=" / Return: "+e.formatCents()+" €"),this.receiptSum.set(n),this.receiptSum.setEnabled(this._receipt.isActive())},i.prototype.reserveItem=function(t){return Api.item_reserve({code:t}).then(function(t){return function(e){return t._receipt.total+=e.price,t.addRow(e.code,e.name,e.price)}}(this),function(e){return function(n){return e.showError(n.status,n.responseText,t),!0}}(this))},i.prototype.onRemoveItem=function(t){return this._receipt.isActive()?Api.item_release({code:t}).then(function(t){return function(e){return t._receipt.total-=e.price,t.addRow(e.code,e.name,-e.price)}}(this),function(){return function(){return alert("Item not found on receipt: "+t),!0}}(this)):void 0},i.prototype.onPayReceipt=function(t){var e,n,r,o,i;if(Number.isConvertible(t)){if(t=t.replace(",","."),t.indexOf(".")?t=100*(t-0):t-=0,t<this._receipt.total)return void alert("Not enough given money!");if(t>4e4)return void alert("Not accepting THAT much money!");for(this.receipt.body.children(".receipt-ending").removeClass("success").addClass("info text-muted"),e=t-this._receipt.total,i=[this.addRow(null,"Subtotal",this._receipt.total,!0),this.addRow(null,"Cash",t),this.addRow(null,"Return",e,!0)],r=0,o=i.length;o>r;r++)n=i[r],n.addClass("success receipt-ending");if(this._setSum(this._receipt.total,e.round5()),this._receipt.isActive())return Api.receipt_finish().then(function(t){return function(e){return t._receipt.end(e),console.log(t._receipt),t.switcher.setMenuEnabled(!0),t.receiptSum.setEnabled(!1)}}(this),function(){return function(){return alert("Error ending receipt!"),!0}}(this))}},i.prototype.onAbortReceipt=function(){return this._receipt.isActive()?Api.receipt_abort().then(function(t){return function(e){return t._receipt.end(e),console.log(t._receipt),t.addRow(null,"Aborted",null).addClass("danger"),t.switcher.setMenuEnabled(!0),t.receiptSum.setEnabled(!1)}}(this),function(){return function(){return alert("Error ending receipt!"),!0}}(this)):void 0},i.prototype.onLogout=function(){return this._receipt.isActive()?void alert("Cannot logout while receipt is active!"):i.__super__.onLogout.apply(this,arguments)},i}(ItemCheckoutMode),t=function(){function t(){this.start(null),this.active=!1}return t.prototype.isActive=function(){return this.active},t.prototype.start=function(t){return null==t&&(t=null),this.active=!0,this.rowCount=0,this.total=0,this.data=t},t.prototype.end=function(t){return null==t&&(t=null),this.active=!1,this.data=t},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};this.ReceiptPrintMode=function(e){function r(){this.findReceipt=t(this.findReceipt,this),r.__super__.constructor.apply(this,arguments),this.receipt=new PrintReceiptTable}return n(r,e),ModeSwitcher.registerEntryPoint("reports",r),r.strTotal="Total",r.strTitle="Find receipt",r.strSell="%d, served by %c",r.prototype.enter=function(){return r.__super__.enter.apply(this,arguments),this.cfg.uiRef.body.append(this.receipt.render())},r.prototype.glyph=function(){return"list-alt"},r.prototype.title=function(){return this.constructor.strTitle},r.prototype.subtitle=function(){return""},r.prototype.actions=function(){return[["",this.findReceipt],[this.cfg.settings.logoutPrefix,this.onLogout]]},r.prototype.findReceipt=function(t){return Api.receipt_get({item:t}).then(function(t){return function(e){return t.renderReceipt(e)}}(this),function(){return function(){return alert("Item not found in receipt!")}}(this))},r.prototype.renderReceipt=function(t){var e,n,r,o,i,s,u,c,p,a,l,h;for(this.receipt.body.empty(),a=t.items,s=0,c=a.length;c>s;s++)e=a[s],"ADD"===e.action&&(r=PrintReceiptTable.createRow(e.vendor,e.code,e.name,e.price,!1),this.receipt.body.append(r));for(n=function(e){switch(e[1]){case"d":return DateTimeFormatter.datetime(t.sell_time);case"c":return t.clerk.print;default:return e[1]}},o=/%[dc%]/g,i=this.constructor.strSell.replace(o,n),l=[this.constructor.middleLine,PrintReceiptTable.createRow("","",this.constructor.strTotal,t.total,!0),PrintReceiptTable.joinedLine(i)].concat(this.constructor.tailLines),h=[],u=0,p=l.length;p>u;u++)r=l[u],h.push(this.receipt.body.append(r));return h},r.middleLine=PrintReceiptTable.joinedLine(),r.tailLines=[PrintReceiptTable.joinedLine()],r}(CheckoutMode)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};this.VendorCompensation=function(e){function r(e,n,o){this.onConfirm=t(this.onConfirm,this),this.onCancel=t(this.onCancel,this),this.onGotItems=t(this.onGotItems,this),r.__super__.constructor.call(this,e,n),this.vendor=o}return n(r,e),r.prototype.title=function(){return"Vendor Compensation"},r.prototype.enter=function(){return r.__super__.enter.apply(this,arguments),this.cfg.uiRef.codeForm.hide(),this.cfg.uiRef.body.append(new VendorInfo(this.vendor).render()),this.buttonForm=$('<form class="hidden-print">').append(this.abortButton()),this.cfg.uiRef.body.append(this.buttonForm),this.itemDiv=$("<div>"),this.cfg.uiRef.body.append(this.itemDiv),Api.item_list({vendor:this.vendor.id}).done(this.onGotItems)},r.prototype.exit=function(){return this.cfg.uiRef.codeForm.show(),r.__super__.exit.apply(this,arguments)},r.prototype.confirmButton=function(){return $('<input type="button" class="btn btn-success">').attr("value","Confirm").click(this.onConfirm)},r.prototype.abortButton=function(){return $('<input type="button" class="btn btn-default">').attr("value","Cancel").click(this.onCancel)},r.prototype.continueButton=function(){return $('<input type="button" class="btn btn-primary">').attr("value","Continue").click(this.onCancel)},r.prototype.onGotItems=function(t){var e,n;return this.compensableItems=function(){var n,r,o;for(o=[],n=0,r=t.length;r>n;n++)e=t[n],"SO"===e.state&&o.push(e);return o}(),this.compensableItems.length>0?(n=new ItemReportTable("Sold Items"),n.update(this.compensableItems),this.itemDiv.empty().append(n.render()),this.buttonForm.empty().append(this.confirmButton(),this.abortButton())):(this.itemDiv.empty().append($("<em>").text("No compensable items")),this.buttonForm.empty().append(this.continueButton()))},r.prototype.onCancel=function(){return this.switcher.switchTo(VendorReport,this.vendor)
},r.prototype.onConfirm=function(){var t,e,n,r,o,i;for(this.buttonForm.empty(),e=this.compensableItems.length,o=this.compensableItems,i=[],n=0,r=o.length;r>n;n++)t=o[n],i.push(Api.item_compensate({code:t.code}).done(function(t){return function(){return e-=1,0>=e?t.onCompensated():void 0}}(this)));return i},r.prototype.onCompensated=function(){var t,e,n,r,o;for(e=this.compensableItems,this.compensableItems=[],r=0,o=e.length;o>r;r++)t=e[r],t.state="CO";return n=new ItemReportTable("Compensated Items"),n.update(e),this.itemDiv.empty().append(n.render()),this.buttonForm.empty().append(this.continueButton())},r}(CheckoutMode)}.call(this),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}},n={}.hasOwnProperty,r=function(t,e){function r(){this.constructor=t}for(var o in e)n.call(e,o)&&(t[o]=e[o]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};t=[[gettext("Compensable Items"),{SO:0},!1],[gettext("Returnable Items"),{BR:0,ST:0},!1],[gettext("Other Items"),{MI:0,RE:0,CO:0},!1],[gettext("Not brought to event"),{AD:0},!0]],this.VendorReport=function(n){function o(t,n,r){this.onReturn=e(this.onReturn,this),this.onCompensate=e(this.onCompensate,this),this.onGotItems=e(this.onGotItems,this),o.__super__.constructor.call(this,t,n),this.vendor=r}return r(o,n),o.prototype.title=function(){return gettext("Item Report")},o.prototype.inputPlaceholder=function(){return"Search"},o.prototype.actions=function(){return[["",function(t){return function(e){return t.switcher.switchTo(VendorFindMode,e)}}(this)],[this.cfg.settings.logoutPrefix,this.onLogout]]},o.prototype.enter=function(){var t,e;return o.__super__.enter.apply(this,arguments),this.cfg.uiRef.body.append(new VendorInfo(this.vendor).render()),e=$('<input type="button">').addClass("btn btn-primary").attr("value",gettext("Compensate")).click(this.onCompensate),t=$('<input type="button">').addClass("btn btn-primary").attr("value",gettext("Return Items")).click(this.onReturn),this.cfg.uiRef.body.append($('<form class="hidden-print">').append(e,t)),Api.item_list({vendor:this.vendor.id}).done(this.onGotItems)},o.prototype.onGotItems=function(e){var n,r,o,i,s,u,c,p,a,l,h;for(h=[],p=0,a=t.length;a>p;p++)l=t[p],i=l[0],u=l[1],n=l[2],o=function(){var t,n,o;for(o=[],t=0,n=e.length;n>t;t++)r=e[t],null!=u[r.state]&&o.push(r);return o}(),c=new ItemReportTable(i),c.update(o),s=c.render(),n&&s.addClass("hidden-print"),h.push(this.cfg.uiRef.body.append(s));return h},o.prototype.onCompensate=function(){return this.switcher.switchTo(VendorCompensation,this.vendor)},o.prototype.onReturn=function(){return this.switcher.switchTo(VendorCheckoutMode,this.vendor)},o}(CheckoutMode)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},r=[].slice;this.VendorFindMode=function(e){function o(){var e,n,i;e=2<=arguments.length?r.call(arguments,0,i=arguments.length-1):(i=0,[]),n=arguments[i++],this.onVendorsFound=t(this.onVendorsFound,this),o.__super__.constructor.apply(this,arguments),this.vendorList=new VendorList,this.query=n}return n(o,e),ModeSwitcher.registerEntryPoint("vendor_find",o),o.prototype.enter=function(){return o.__super__.enter.apply(this,arguments),this.cfg.uiRef.body.append(this.vendorList.render()),null!=this.query?Api.vendor_find({q:this.query}).done(this.onVendorsFound):void 0},o.prototype.glyph=function(){return"user"},o.prototype.title=function(){return"Vendor Search"},o.prototype.inputPlaceholder=function(){return"Search"},o.prototype.actions=function(){return[["",function(t){return function(e){return Api.vendor_find({q:e}).done(t.onVendorsFound)}}(this)],[this.cfg.settings.logoutPrefix,this.onLogout]]},o.prototype.onVendorsFound=function(t){var e,n,r,o,i;for(this.vendorList.body.empty(),i=[],e=r=0,o=t.length;o>r;e=++r)n=t[e],i.push(function(t){return function(e,n){return t.vendorList.append(e,n+1,function(){return t.switcher.switchTo(VendorReport,e)})}}(this)(n,e));return i},o}(CheckoutMode)}.call(this),function(){var t;t=/^-?\d+([,\.]\d*)?$/,Number.isConvertible=function(e){return t.test(e)}}.call(this),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){function e(t){return u.raw?t:encodeURIComponent(t)}function n(t){return u.raw?t:decodeURIComponent(t)}function r(t){return e(u.json?JSON.stringify(t):String(t))}function o(t){0===t.indexOf('"')&&(t=t.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return t=decodeURIComponent(t.replace(s," ")),u.json?JSON.parse(t):t}catch(e){}}function i(e,n){var r=u.raw?e:o(e);return t.isFunction(n)?n(r):r}var s=/\+/g,u=t.cookie=function(o,s,c){if(void 0!==s&&!t.isFunction(s)){if(c=t.extend({},u.defaults,c),"number"==typeof c.expires){var p=c.expires,a=c.expires=new Date;a.setTime(+a+864e5*p)}return document.cookie=[e(o),"=",r(s),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var l=o?void 0:{},h=document.cookie?document.cookie.split("; "):[],d=0,f=h.length;f>d;d++){var m=h[d].split("="),y=n(m.shift()),g=m.join("=");if(o&&o===y){l=i(g,s);break}o||void 0===(g=i(g))||(l[y]=g)}return l};u.defaults={},t.removeCookie=function(e,n){return void 0===t.cookie(e)?!1:(t.cookie(e,"",t.extend({},n,{expires:-1})),!t.cookie(e))}});