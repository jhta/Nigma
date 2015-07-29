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
