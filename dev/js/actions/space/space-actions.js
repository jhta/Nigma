const SpaceConstants = require('../../constants/space/space-constants');
var Dispatcher = require('../../dispatchers/dispatcher');
var SpaceApi = require('../../api/utils/space');
var QuestionAPI = require('../../api/utils/question');

var SpaceActions = {

  previewQuestion(questionid, data) {
    SpaceApi.preview({
      question: JSON.stringify(data),
      questionid: questionid
    }, (err, data) => {

      if(data.ok){
        window.open(data.url);
      } else {
        console.error("There was an error trying to preview question ");
      }
    });
  },
  updateQuestionData(data, questionId) {
    var payload = {
      question: {
        data: JSON.stringify(data)
      },
      questionid: questionId
    }
    console.log(payload);
    QuestionAPI.updateQuestionData(payload, (err, data) => {

      if(data.ok){
        Dispatcher.dispatch({
          type: SpaceConstants.PREVIEW_QUESTION,
          response: data.ok
        });
      }
    });

  },

  updateQuestionAndExport(questionId, data) {
    var payload = {
      question: {
        data: JSON.stringify(data)
      },
      questionid: questionId
    };

    QuestionAPI.updateQuestionData(payload, (err, data) => {
      if(data.ok){
        QuestionAPI.exportQuestionData(payload, (err, data) => {
          if(data.ok){



          } else {
            //Implemnetar mensaje
          }
        });

      } else {
        //Implementar mensaje
      }
    });

  },

  addFormulation(formulation){
    Dispatcher.dispatch({
          type: SpaceConstants.ADD_FORMULATION,
          data: formulation
        });
  }
}

module.exports = SpaceActions;
