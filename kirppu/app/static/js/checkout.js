// Generated by CoffeeScript 1.7.1
(function() {
  var Api, Config, InputHandler, State, hasPrefix;

  Config = (function() {
    function Config() {}

    Config.prototype.urls = {
      apiValidateCounter: null,
      apiClerkLogin: null,
      apiClerkLogout: null,
      apiItemInfo: null,
      apiItemReserve: null,
      apiReceiptStart: null,
      apiReceiptFinish: null
    };

    Config.prototype.uiId = {
      stateText: null,
      codeInput: null,
      codeForm: null,
      receiptResult: null
    };

    Config.prototype.uiRef = {
      stateText: null,
      codeInput: null,
      codeForm: null,
      receiptResult: null
    };

    Config.prototype.settings = {
      itemPrefix: null,
      clerkPrefix: "::",
      counterPrefix: ":*",
      commandPrefix: ":=",
      removeItemPrefix: "-",
      payPrefix: "+"
    };

    Config.prototype.app = {
      inputHandler: null
    };

    Config.prototype.check = function() {
      var element, errors, key, value, _ref;
      errors = false;
      _ref = this.uiId;
      for (key in _ref) {
        value = _ref[key];
        element = $("#" + value);
        if (!((element != null) && element.length === 1)) {
          console.error("Name " + value + " does not identify an element for " + key + ".");
          errors = true;
          continue;
        }
        this.uiRef[key] = element;
      }
      if (!errors) {
        errors = this._bind();
      }
      return errors;
    };

    Config.prototype._bind = function() {
      if (this.app.inputHandler != null) {
        this.app.inputHandler.bind();
      }
      return false;
    };

    return Config;

  })();

  window.CheckoutConfig = new Config();

  State = (function() {
    function State() {
      this.counterInfo = null;
      this.clerkInfo = null;
    }

    State.prototype.canLoginClerk = function() {
      return this.counterInfo != null;
    };

    State.prototype.canValidateCounter = function() {
      return this.counterInfo == null;
    };

    State.prototype.canStartReceipt = function() {
      return (this.counterInfo != null) && this.clerkInfo;
    };

    State.prototype.getHeadingText = function() {
      return "Checkout ";
    };

    return State;

  })();

  InputHandler = (function() {
    function InputHandler(config) {
      this.cfg = config ? config : CheckoutConfig;
      this.enabled = {
        clerk: true,
        counter: true,
        command: true,
        item: true
      };
    }

    InputHandler.prototype.bind = function() {
      return this.cfg.uiRef.codeForm.submit((function(_this) {
        return function(event) {
          var ctl, ret, value;
          ctl = _this.cfg.uiRef.codeInput;
          value = ctl.val();
          ret = _this.onInput(value);
          if (ret === true) {
            ctl.val("");
          } else {
            console.error("Input not understood: '" + value + "', ret=" + ret);
          }
          return event.preventDefault();
        };
      })(this));
    };

    InputHandler.prototype.onInput = function(input) {
      var settings;
      settings = this.cfg.settings;
      if (hasPrefix(input, settings.clerkPrefix)) {
        this.onInputClerk(input);
      } else if (hasPrefix(input, settings.counterPrefix)) {
        this.onInputCounter(input);
      } else if (hasPrefix(input, settings.commandPrefix)) {
        this.onInputCommand(input);
      } else if ((settings.itemPrefix == null) || hasPrefix(input, settings.itemPrefix)) {
        this.onInputItem(input);
      } else {
        return false;
      }
      return true;
    };

    InputHandler.prototype.onInputClerk = function(input) {};

    InputHandler.prototype.onInputCounter = function(input) {};

    InputHandler.prototype.onInputCommand = function(input) {};

    InputHandler.prototype.onInputItem = function(input) {
      return Api.findItem(input, (function(_this) {
        return function(data) {
          var row;
          row = $("<tr>");
          row.append($("<td>").text("?"), $("<td>").text(data.code), $("<td>").text(data.name), $("<td>").text(data.price.formatCents()));
          return _this.cfg.uiRef.receiptResult.append(row);
        };
      })(this));
    };

    return InputHandler;

  })();

  window.InputHandler = InputHandler;

  hasPrefix = function(lhs, prefix) {
    return (prefix != null) && lhs.substr(0, prefix.length) === prefix;
  };

  Api = (function() {
    function Api() {}

    Api.C = CheckoutConfig;

    Api._dump = function(data) {
      return console.log(JSON.stringify(data));
    };

    Api._sel = function(fn) {
      if (fn != null) {
        return fn;
      } else {
        return this._dump;
      }
    };

    Api.validateCounter = function(code, onComplete) {
      return $.post(this.C.urls.apiValidateCounter, {
        code: code
      }, this._sel(onComplete));
    };

    Api.clerkLogin = function(code, counter, onComplete) {
      var args;
      args = {
        code: code,
        counter: counter
      };
      return $.post(this.C.urls.apiClerkLogin, args, this._sel(onComplete));
    };

    Api.clerkLogout = function(onComplete) {
      return $.post(this.C.urls.apiClerkLogout, this._sel(onComplete));
    };

    Api.findItem = function(code, onComplete) {
      return $.get(this.C.urls.apiItemInfo, {
        code: code
      }, this._sel(onComplete));
    };

    Api.startReceipt = function(onComplete) {
      return $.post(this.C.urls.apiReceiptStart, this._sel(onComplete));
    };

    Api.reserveItem = function(itemCode, onComplete) {
      return $.post(this.C.urls.apiItemReserve, {
        code: itemCode
      }, this._sel(onComplete));
    };

    Api.finishReceipt = function(onComplete) {
      return $.post(this.C.urls.apiReceiptFinish, this._sel(onComplete));
    };

    return Api;

  })();

  window.Api = Api;

  Number.FRACTION_LEN = 2;

  Number.FRACTION = Math.pow(10, Number.FRACTION_LEN);

  Number.prototype.formatCents = function() {
    var fraction, fraction_len, fraction_str, ignored, wholes, _i, _ref;
    wholes = Math.abs(Math.round(this / Number.FRACTION));
    fraction = Math.abs(this % Number.FRACTION);
    fraction_str = "";
    fraction_len = ("" + fraction).length;
    for (ignored = _i = fraction_len, _ref = Number.FRACTION_LEN; fraction_len <= _ref ? _i < _ref : _i > _ref; ignored = fraction_len <= _ref ? ++_i : --_i) {
      fraction_str += "0";
    }
    fraction_str += fraction;
    if (this < 0) {
      wholes = "-" + wholes;
    }
    return wholes + "." + fraction_str;
  };

  String.prototype.parseCents = function() {
    var cents, fraction, fraction_exp, matcher, pat, wholes;
    pat = /^(-?)(\d*)(?:[,.](\d*))?$/;
    matcher = pat.exec(this);
    if (matcher == null) {
      return null;
    }
    if (matcher[1] == null) {
      matcher[1] = "";
    }
    if (matcher[2] == null) {
      matcher[2] = "0";
    }
    if (matcher[3] == null) {
      matcher[3] = "0";
    }
    wholes = matcher[2] - 0;
    fraction = matcher[3] - 0;
    fraction_exp = Math.pow(10, Number.FRACTION_LEN - matcher[3].length);
    fraction = Math.round(fraction * fraction_exp);
    cents = wholes * Number.FRACTION;
    if (matcher[1] !== "-") {
      cents += fraction;
    } else {
      cents = -cents - fraction;
    }
    return cents;
  };

}).call(this);
