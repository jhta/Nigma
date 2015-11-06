const SpaceConstants = require('../../constants/space/space-constants');
var Dispatcher = require('../../dispatchers/dispatcher');
var SpaceApi = require('../../api/utils/space');
var QuestionAPI = require('../../api/utils/question');
const API = require('../../api/API');


var SpaceActions = {

  previewQuestion(questionid, data) {
    SpaceApi.preview({
      question: JSON.stringify(data),
      questionid: questionid
    }, (err, res) => {
      if (res) {
        if(res.ok) {
          window.open(res.url);
        } else {
          console.error("There was an error trying to preview question ");
        }
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
    };

    QuestionAPI.updateQuestionData(payload, (err) => {
      if (err) {
        //Mostrar mensaje de error
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

    QuestionAPI.updateQuestionData(payload, (err) => {
      if (err) {
        //Mostrar mensaje de error
        return;
      }

      QuestionAPI.exportQuestionData(payload, (err) => {
        if (err) {
          //Mostrar mensaje de error
          return;
        }

        let url = API.getUrl();
        url = url.replace(/api/,"static");

        window.open(`${url}/${questionId}.zip`);
      });
    });
  },

  setActualQuestion(question){
    Dispatcher.dispatch({
      type: SpaceConstants.SET_ACTUAL_QUESTION,
      data: question
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
