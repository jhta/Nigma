const CommonError = require('./common-error');
const ExpressionEvaluator = require('../variables/expression-evaluator');
const Variable = require('../variables/variable');
const uniqid = require('uniqid');
class Answer {
  constructor() {
    this.names = [];
    this.correctValue = [];
    this.showLabel = true;
    this.precision = 0;
    this.commonErrors = [];
    this._id = uniqid();
    this.code = null;
    console.log(this);
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
      output.messages.push(`Valor correcto de respuesta, ${this.correctValue}: ${validationOutput.messages[0]}`);
    }
    return output;
  }

  _validateConsistence(variables) {
    if(this.showLabel && (this.name == "" || this.name == null)){
       return {error: true, messages: ["La etiqueta no puede estar vacia"]};
    } else {
      return {error: false, messages: []};
    }
  }

  _validatePrecision(variables) {
    if(isNaN(this.precision)){
      return {error: true, messages: ["Precisión es invalida"]};
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
    this._generateCode();
    return output;
  }

  _generateCode() {
    var missconceptions = this.commonErrors.map((commonError) => ({"value": Variable.replaceVariables(commonError.value), "message": commonError.message}))
    var codeText = [
      `var correctValue = ${Variable.replaceVariables(this.correctValue)};`,
      `switch(inputValue){`,
        `case correctValue:`,
          `console.log("You did it!");`,
          `response = 'Correcto';`,
          `answerError = false;`,
          `break;`
    ];
    for(var i = 0; i < this.commonErrors.length; i++) {
      var commonError = this.commonErrors[i];
      codeText.push(`case ${Variable.replaceVariables(commonError.value)}:`);
      codeText.push(`console.log("You fail, ${commonError.message}");`);
      codeText.push(`response = '${commonError.message}';`);
      codeText.push(`error = true;`);
      codeText.push(`console.log("You fail, ${commonError.message}");`);
      codeText.push(`break;`);
    }
    codeText.push(`default:`);
    codeText.push(`response = "Incorrecto!";`);
    codeText.push(`answerError = true;`);
    codeText.push(`break;`);
    codeText.push("}");
    return this.code = codeText;
  }

  static createFromResponse(jsonAnswer) {
    var answer = new Answer();
    answer.names = jsonAnswer.names;
    answer.correctValues = jsonAnswer.correctValues;
    answer.showLabel = jsonAnswer.showLabel;
    answer.precision = jsonAnswer.precision;
    answer._id = jsonAnswer._id;
    answer.commonErrors = jsonAnswer.commonErrors.map(commonErrorJson => CommonError.createFromResponse(commonErrorJson));
    return answer;
  }
}

module.exports = Answer;
