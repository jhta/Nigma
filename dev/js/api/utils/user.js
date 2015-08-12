const API = require('../API');

const UserApi = {

  _routes: {

    get: {
      route: "/users/data",
      method: API._REQUEST_METHOD.get
    }
  },

  getData(cb){
    const route = this._routes.get;

    API.callAjaxRequest(route, null, function(err, res) {
      if(err){
        return cb(true);
      }

      cb(!res.body.ok, res.body.user);
    });
  }

};

module.exports = UserApi;
