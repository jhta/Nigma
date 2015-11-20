const CommonError = require('./common-error');
const uniqid = require('uniqid');
class Answer {
  constructor() {
    this.names = [];
    this.correctValues = [];
    this.showLabel = true;
    this.precision = 0;
    this.commonErrors = [];
    this._id = uniqid();
    this.code = null;
  }

  addCommonError() {
    this.commonErrors.push(new CommonError());
  }

  static createFromResponse(jsonAnswer) {
    var answer = new Answer();
    answer.names = jsonAnswer.names;
    answer.code = jsonAnswer.code;
    answer.correctValues = jsonAnswer.correctValues;
    answer.showLabel = jsonAnswer.showLabel;
    answer.precision = jsonAnswer.precision;
    answer._id = jsonAnswer._id;
    answer.code = jsonAnswer.code;
    answer.commonErrors = jsonAnswer.commonErrors.map(commonErrorJson => CommonError.createFromResponse(commonErrorJson));
    return answer;
  }
}

module.exports = Answer;
