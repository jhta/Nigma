const CommonError = require('./common-error');
const ExpressionEvaluator = require('../variables/expression-evaluator');

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
    var output = ExpressionEvaluator.isEvaluable(this.correctValue, variables);
    if(output.error)
      output.messages = [`Answer correct value, ${this.correctValue}: ${output.messages}`];
    else
      output.messages = [];
    for(var i = 0; i < this.commonErrors.length; i++){
      var commonError = this.commonErrors[i];
      var validation = commonError.isValid(variables);
      output.error = output.error || validation.error;
      output.messages = output.messages.concat(validation.messages);
    }
    return output;
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
