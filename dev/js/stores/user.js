const Dispatcher = require("../dispatchers/dispatcher");
const EventEmitter = require("events").EventEmitter;
const CHANGE_EVENT = "change";
const _redirect = false;
const assign = require("object-assign");
const Auth = require("../utils/auth");
const UserActionConstants = require('../constants/user-constants');

var _user;

var UserStore = assign(EventEmitter.prototype, {

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

  getUser: function () {
    return _user;
  },

  redirect: function () {
    return _redirect;
  },

  saveUser: function (user) {
    _user = user;
  }

});

/**
 * Register of dispatch
 */

UserStore.dispatchToken = Dispatcher.register(function (action) {

  switch (action.type) {

    case UserActionConstants.LOGIN_COMPLETE:
      UserStore.saveUser(action.user);
      UserStore.emitChange();
      break;

    case UserActionConstants.SET_USER:
      UserStore.saveUser(Auth.getUser());
      UserStore.emitChange();
      break;


  }
  return true;
});

module.exports = UserStore;
