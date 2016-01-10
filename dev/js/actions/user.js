const Dispatcher 	= require('../dispatchers/dispatcher.js');
const UserApi = require('../api/utils/user');
const UserActionConstants = require('../constants/user-constants');
const Auth = require("../utils/auth");

const LoginActions = {

  loginComplete( data ) {
    Auth.loginComplete(data.token);
    UserApi.getData()
    	.then(function(res) {
    		var user = res.user;
    		Auth.saveUserData(user);
    		Dispatcher.dispatch({
    		  type: UserActionConstants.LOGIN_COMPLETE,
    		  user: user
    		});
    	})
    	.catch(function(error) {
    		console.error(error)
    	})
  },

  setUserStore (){
    console.log("Si se ejecuta");
    Dispatcher.dispatch({
      type: UserActionConstants.SET_USER
    })
  }

};

module.exports = LoginActions;
