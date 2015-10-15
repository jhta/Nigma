const API = require('../API');
const QuestionAPI = {
  _routes: {
    create: {
      route: "/folders/:folderid/questions",
      method: API._REQUEST_METHOD.post
    },
    share: {
      route: "/users/questions/:questionId",
      method: API._REQUEST_METHOD.post,
    }
  },
  createQuestion(data, cb){
    const route = this._routes.create;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question);
      }
    });
  },
  shareQuestion(data, cb) {
    const route = this._routes.share;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question)
      }
    });
  }
}

module.exports = QuestionAPI;
