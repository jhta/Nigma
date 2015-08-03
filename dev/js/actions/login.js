const Dispatcher 	= require('../dispatchers/dispatcher.js');
const UserApi = require('../api/utils/user');
const LoginActionConstants = require('../constants/login-constants');

const LoginActions = {

  loginComplete( data ) {
    Dispatcher.dispatch({
      type: LoginActionConstants.LOGIN_COMPLETE,
      data: data
    })
  },

  userData (){
    UserApi.getData(function(err, user) {
      if(!err){
        Dispatcher.dispatch({
          type: LoginActionConstants.USER_DATA,
          user: user
        });
      }
    });
  }

};

module.exports = LoginActions;
