const ExpressionEvaluator = require('../variables/expression-evaluator');
class CommonError {
  constructor() {
    this.value = "";
    this.message = "";
  }

  isValid(variables) {
    var output = ExpressionEvaluator.isEvaluable(this.value, variables);
    if(output.error)
      output.messages = `Error común, ${this.value}: ${output.messages}`
    return output;
  }

  static createFromResponse(commonErrorJson) {
    var commonError = new CommonError();
    commonError.value = commonErrorJson.value;
    commonError.message = commonErrorJson.message;
    return commonError;
  }
}
module.exports = CommonError;