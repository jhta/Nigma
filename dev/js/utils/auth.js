/**
 * AUTHENTICATION OBJECT
 * *********************
 */

const Auth = {

  loggedIn() {
    return localStorage.getItem("token");
  },

  loginComplete(token){
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  onChange: function () {
  }
};

module.exports = Auth;
