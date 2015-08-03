var Dispatcher = require("../dispatchers/dispatcher");
var EventEmitter = require("events").EventEmitter;
var CHANGE_EVENT = "change";
var _redirect = false;
var assign        = require("object-assign");
var Auth = require("../utils/auth");
const LoginActionConstants = require('../constants/login-constants');


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


  getLoggedIn: function () {
    return Auth.loggedIn();
  },

  redirect: function () {
    return _redirect;
  },

  loginComplete: function (data) {
    Auth.loginComplete(data.token);
  },

  userData: function(user){
    Auth.saveUserData(user);
  }

});

/**
 * Register of dispatch
 */

LoginStore.dispatchToken = Dispatcher.register(function (action) {

  switch (action.type) {

    case LoginActionConstants.LOGIN_COMPLETE:
      LoginStore.loginComplete(action.data);
      LoginStore.emitChange();
      break;

    case LoginActionConstants.USER_DATA:
      LoginStore.userData(action.user);
      LoginStore.emitChange();
      break;

  }
  return true;
});

module.exports = LoginStore;
