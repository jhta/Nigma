const CommonError = require('./common-error');
const ExpressionEvaluator = require('../variables/expression-evaluator');
const Variable = require('../variables/variable');
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
    var commonErrorValidation = this._validateCommonErrors(variables);
    var labelValidation = this._validateConsistence(variables);
    var precisionValidation =  this._validatePrecision(variables);

    output = this._mergeErrors(output, evaluationOutput);
    output = this._mergeErrors(output, commonErrorValidation);
    output = this._mergeErrors(output, labelValidation);
    output = this._mergeErrors(output, precisionValidation);


    return output;
  }

  _mergeErrors(output, validationOutput) {
    output.error = output.error || validationOutput.error;
    if(validationOutput.error){
      output.messages.push(`Answer correct value, ${this.correctValue}: ${validationOutput.messages[0]}`);
    }
    return output;
  }

  _validateConsistence(variables) {
    if(this.showLabel && (this.name == "" || this.name == null)){
       return {error: true, messages: ["Show label is active and label text is empty"]};
    } else {
      return {error: false, messages: []};
    }
  }

  _validatePrecision(variables) {
    if(isNaN(this.precision)){
      return {error: true, messages: ["Precision is invalid"]};
    } else {
      return {error: false, messages: []};
    }
  }

  _validateCommonErrors(variables) {
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
    var missconceptions = this.commonErrors.map((commonError) => ({"value": Variable.replaceVariables(commonError.value), "message": commonError.message}))
    var codeText = [
      `var correctValue = ${Variable.replaceVariables(this.correctValue)};`,
      `switch(inputValue){`,
        `case correctValue:`,
          `console.log("You did it!");`,
          `break;`
    ];
    for(var i = 0; i < this.commonErrors.length; i++) {
      var commonError = this.commonErrors[i];
      codeText.push(`case ${Variable.replaceVariables(commonError.value)}:`);
      codeText.push(`console.log("You fail, ${commonError.message}");`);
      codeText.push(`break;`);
    }
    codeText.push("}")
    console.log(codeText);
    return codeText.join("\n");
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
