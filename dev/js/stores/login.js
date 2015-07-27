var Dispatcher = require("../dispatchers/dispatcher");
var EventEmitter = require("events").EventEmitter;
var CHANGE_EVENT = "change";
var _redirect = false;
var assign        = require("object-assign");
var Auth = require("../utils/auth");

var LoginStore = assign(EventEmitter.prototype, {

  //GENERAL

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  //GETTERS

  getLoggedIn: function () {
    return Auth.loggedIn();
  },

  redirect: function () {
    return _redirect;
  },

  loginComplete: function (data) {
    Auth.loginComplete(data.token);
  }

});

/**
 * Register of dispatch
 */

LoginStore.dispatchToken = Dispatcher.register(function (action) {

  switch (action.type) {

    case "LOGIN_COMPLETE":
      LoginStore.loginComplete(action.data);
      LoginStore.emitChange();
      break;

  }
  return true;
});

module.exports = LoginStore;
