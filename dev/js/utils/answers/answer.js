const CommonError = require('./common-error');
const Parser = require('../parser');

class Answer {
  constructor() {
    this.name = "";
    this.correctValue = "";
    this.showLabel = true;
    this.precision = 0;
    this.commonErrors = [];
    this._id = null;
  }

  addCommonError() {
    this.commonErrors.push(new CommonError());
  }

  isValid(variables) {
    console.log(this);
    console.log(">>>>>>>>>>>>>>>>>>>>");
    console.log(Parser.isEvaluable(this.correctValue, variables));
    return true;
  }

  static createFromResponse(jsonAnswer) {
    var answer = new Answer();
    answer.name = jsonAnswer.name;
    answer.correctValue = jsonAnswer.correctValue;
    answer.showLabel = jsonAnswer.showLabel;
    answer.precision = jsonAnswer.precision;
    answer._id = jsonAnswer._id;
    answer.commonErrors = jsonAnswer.commonErrors.map(commonErrorJson => CommonError.createFromResponse(commonErrorJson));
    return answer;
  }
}

module.exports = Answer;
