/**
 * AUTHENTICATION OBJECT
 * *********************
 */

const Auth = {


  loginComplete(token){
    localStorage.setItem("token", token);
  },

  saveUserData(user){
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUserName(){
    //var user = JSON.parse(localStorage.getItem("user"));
  },

  logout(cb) {
    localStorage.clear();
    cb(false);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  onChange: function () {
  }
};

module.exports = Auth;
