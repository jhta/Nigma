const API = require('../API');
const QuestionAPI = {
  _routes: {
    create: {
      route: "/folders/:folderid/questions",
      method: API._REQUEST_METHOD.post
    },
    updateQuestionData: {
      route: "/questions/:questionid/data",
      method: API._REQUEST_METHOD.put
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
  updateQuestionData(data, cb){
    const route = this._routes.updateQuestionData;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question);
      }
    });
  }
}

module.exports = QuestionAPI;
