// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.VendorCompensation = (function(_super) {
    __extends(VendorCompensation, _super);

    function VendorCompensation(cfg, switcher, vendor) {
      this.onConfirm = __bind(this.onConfirm, this);
      this.onCancel = __bind(this.onCancel, this);
      this.onGotItems = __bind(this.onGotItems, this);
      VendorCompensation.__super__.constructor.call(this, cfg, switcher);
      this.vendor = vendor;
    }

    VendorCompensation.prototype.title = function() {
      return "Vendor Compensation";
    };

    VendorCompensation.prototype.enter = function() {
      VendorCompensation.__super__.enter.apply(this, arguments);
      this.cfg.uiRef.codeForm.hide();
      this.cfg.uiRef.body.append(new VendorInfo(this.vendor).render());
      this.buttonForm = $('<form class="hidden-print">').append(this.abortButton());
      this.cfg.uiRef.body.append(this.buttonForm);
      this.itemDiv = $('<div>');
      this.cfg.uiRef.body.append(this.itemDiv);
      return Api.item_list({
        vendor: this.vendor.id
      }).done(this.onGotItems);
    };

    VendorCompensation.prototype.exit = function() {
      this.cfg.uiRef.codeForm.show();
      return VendorCompensation.__super__.exit.apply(this, arguments);
    };

    VendorCompensation.prototype.confirmButton = function() {
      return $('<input type="button" class="btn btn-success">').attr('value', 'Confirm').click(this.onConfirm);
    };

    VendorCompensation.prototype.abortButton = function() {
      return $('<input type="button" class="btn btn-default">').attr('value', 'Cancel').click(this.onCancel);
    };

    VendorCompensation.prototype.continueButton = function() {
      return $('<input type="button" class="btn btn-primary">').attr('value', 'Continue').click(this.onCancel);
    };

    VendorCompensation.prototype.onGotItems = function(items) {
      var i, table;
      this.compensableItems = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          i = items[_i];
          if (i.state === 'SO') {
            _results.push(i);
          }
        }
        return _results;
      })();
      if (this.compensableItems.length > 0) {
        table = new ItemReportTable('Sold Items');
        table.update(this.compensableItems);
        this.itemDiv.empty().append(table.render());
        return this.buttonForm.empty().append(this.confirmButton(), this.abortButton());
      } else {
        this.itemDiv.empty().append($('<em>').text('No compensable items'));
        return this.buttonForm.empty().append(this.continueButton());
      }
    };

    VendorCompensation.prototype.onCancel = function() {
      return this.switcher.switchTo(VendorReport, this.vendor);
    };

    VendorCompensation.prototype.onConfirm = function() {
      var i, nItems, _i, _len, _ref, _results;
      this.buttonForm.empty();
      nItems = this.compensableItems.length;
      _ref = this.compensableItems;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(Api.item_compensate({
          code: i.code
        }).done((function(_this) {
          return function() {
            nItems -= 1;
            if (nItems <= 0) {
              return _this.onCompensated();
            }
          };
        })(this)));
      }
      return _results;
    };

    VendorCompensation.prototype.onCompensated = function() {
      var i, items, table, _i, _len;
      items = this.compensableItems;
      this.compensableItems = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        i = items[_i];
        i.state = 'CO';
      }
      table = new ItemReportTable('Compensated Items');
      table.update(items);
      this.itemDiv.empty().append(table.render());
      return this.buttonForm.empty().append(this.continueButton());
    };

    return VendorCompensation;

  })(CheckoutMode);

}).call(this);
