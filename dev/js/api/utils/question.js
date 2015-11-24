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
      route: "/questions/:questionid/scorms",
      method: API._REQUEST_METHOD.post
    },

    share: {
      route: "/users/questions/:questionId",
      method: API._REQUEST_METHOD.post,
    },

    delete: {
      route: "/questions/:questionId",
      method: API._REQUEST_METHOD.delete,
    },

    validateVariables: {
      route: "/questions/:questionId/variables/validate",
      method: API._REQUEST_METHOD.post
    },

    validateAnswers: {
      route: "/questions/:questionId/answers/validate",
      method: API._REQUEST_METHOD.post
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
        cb(err, null);
      } else {
        cb(!res.body.ok);
      }
    });
  },

  exportQuestionData(data, cb){

    console.log("Data", data);
    const route = this._routes.exportQuestionData;

    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(err, null);
      } else {
        cb(!res.body.ok);
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
  },

  deleteQuestion(data, cb) {
    const route = this._routes.delete;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question)
      }
    });
  }, 
  validateVariables(data, cb){
    const route = this._routes.validateVariables;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  },
  validateAnswers(data, cb){
    const route = this._routes.validateAnswers;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  }
}

module.exports = QuestionAPI;
