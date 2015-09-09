const SpaceConstants = require('../../constants/space/space-constants');
var Dispatcher = require('../../dispatchers/dispatcher');
var SpaceApi = require('../../api/utils/space');
var SpaceActions = {
  previewQuestion(data) {

    SpaceApi.preview({
      question: JSON.stringify(data)
    }, (err, data) => {
      console.log(data);
      if(data.ok){
        Dispatcher.dispatch({
          type: SpaceConstants.PREVIEW_QUESTION,
          response: data.ok
        });
      }
    });

  },
}

module.exports = SpaceActions;
