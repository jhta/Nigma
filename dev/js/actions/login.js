const Disptcher 	= require('../dispatchers/dispatcher.js');

const LoginActions = {

  LoginComplete( data ) {
    Disptcher.dispatch({
      type: "LOGIN_COMPLETE",
      data: data
    })
  }

};

module.exports = LoginActions;
