const MenuActionConstants = require('../constants/menu-constants');
var Dispatcher = require('../dispatchers/dispatcher.js');

var MenuActions = {
  addFolder: function (folderName) {
    Dispatcher.dispatch({
      type: MenuActionConstants.ADD_FOLDER,
      folderName: folderName
    });
  },
  addQuestion: function (folderIndex, question) {
    Dispatcher.dispatch({
      type: MenuActionConstants.ADD_QUESTION,
      folderIndex: folderIndex,
      question: question
    });
  },
}

module.exports = MenuActions;
