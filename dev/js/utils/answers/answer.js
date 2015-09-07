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
    var output = {error: false, messages: []}
    var evaluationOutput = ExpressionEvaluator.isEvaluable(this.correctValue, variables);
    var commonErrorValidation = this._validateCommonErrors();
    var labelValidation = this._validateConsistence();
    var precisionValidation =  this._validatePrecision();

    output = _mergeErrors(output, evaluationOutput)
    output = _mergeErrors(output, commonErrorValidation)
    output = _mergeErrors(output, labelValidation)
    output = _mergeErrors(output, precisionValidation)


    return output;
  }

  _mergeErrors(output, validationOutput) {
    output.error = output.error || validationOutput.error;
    if(validationOutput.error)
      output.messages.concat([`Answer correct value, ${this.correctValue}: ${validationOutput.messages[0]}`]);
    return output;
  }

  _validateConsistence() {
    if(this.showLabel && (this.label == "" || this.label == null)){
       return {error: true, messages: ["Show label is active and label text is empty"]};
    } else {
      return {error: false, messages: []};
    }
  }

  _validatePrecision() {
    if(isNaN(this.precision)){
      return {error: true, messages: ["Precision is invalid"]};
    } else {
      return {error: false, messages: []};
    }
  }

  _validateCommonErrors() {
    var output = {error: false, messages: []};
    for(var i = 0; i < this.commonErrors.length; i++){
      var commonError = this.commonErrors[i];
      var validation = commonError.isValid(variables);
      output.error = output.error || validation.error;
      output.messages = output.messages.concat(validation.messages);
    }
    return output;
  }

  generateCode() {

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
