const API = require('../API');

const UserApi = {

  _routes: {

    getData: {
      route: "/users/data",
      method: API._REQUEST_METHOD.get
    }
  },

  getData() {
    const route = this._routes.getData;
    return API.callAjaxRequest(route, null);
  }

};

module.exports = UserApi;
