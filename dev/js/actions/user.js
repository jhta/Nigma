const Dispatcher = require('../dispatchers/dispatcher.js');
const UserApi = require('../api/utils/user');
const UserActionConstants = require('../constants/user-constants');
const Auth = require("../utils/auth");

const LoginActions = {

  loginComplete(data) {
    Auth.loginComplete(data.token);

    UserApi.getData((err, user)=> {
      if (!err) {

        Auth.saveUserData(user);
        Dispatcher.dispatch({
          type: UserActionConstants.LOGIN_COMPLETE,
          user: user
        })
      }
    });
  },

  setUserStore (){
    Dispatcher.dispatch({
      type: UserActionConstants.SET_USER
    })
  }

};

module.exports = LoginActions;
