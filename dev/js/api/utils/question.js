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
    },
    exportQuestionData: {
      route: "/questions/:questionid/data",
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

  updateQuestionData(data, cb){
    const route = this._routes.updateQuestionData;
    API.callAjaxRequest(route, data, (err, res) => {
      console.log("Respuesta", res);
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question);
      }
    });
  },

  exportQuestionData(data, cb){
    const route = this._routes.exportQuestionData;

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
