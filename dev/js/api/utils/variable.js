const API = require('../API');
const VariableAPI = {
  _routes: {
    validate: {
      route: "/variables/validate",
      method: API._REQUEST_METHOD.post
    }
  },
  validate(data, cb){
    const route = this._routes.validate;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  }
}

module.exports = VariableAPI;
