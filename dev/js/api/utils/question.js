const API = require('../API');
const QuestionAPI = {
  _routes: {

    create: {
      route: "/folders/:folderid/questions",
      method: API._REQUEST_METHOD.post
    },

    delete: {
      route: "/questions/:questionid",
      method: API._REQUEST_METHOD.delete
    }
  },

  createQuestion(data, cb){
    const route = this._routes.create;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question);
      }
    });
  },

  deleteQuestion(data, cb){
    const route = this._routes.delete;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.ok);
      }
    });
  }
};

module.exports = QuestionAPI;
