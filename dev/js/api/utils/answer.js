const API = require('../API');
const AnswerAPI = {
  _routes: {
    validate: {
      route: "/answer/validate",
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

module.exports = AnswerAPI;
