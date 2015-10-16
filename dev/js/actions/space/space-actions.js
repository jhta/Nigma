const SpaceConstants = require('../../constants/space/space-constants');
var Dispatcher = require('../../dispatchers/dispatcher');
var SpaceApi = require('../../api/utils/space');
var QuestionAPI = require('../../api/utils/question');
var SpaceActions = {
  previewQuestion(data) {

    SpaceApi.preview({
      question: JSON.stringify(data)
    }, (err, data) => {
      console.log(data);
      if(data.ok){
        window.open(data)
      } else {
        console.log("Error");
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
      console.log(data);
      if(data.ok){
        Dispatcher.dispatch({
          type: SpaceConstants.PREVIEW_QUESTION,
          response: data.ok
        });
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
