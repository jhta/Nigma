const ExpressionEvaluator = require('../variables/expression-evaluator');
class CommonError {
  constructor() {
    this.values = {};
    this.message = "";
  }

  isValid(variables) {
    var output = ExpressionEvaluator.isEvaluable(this.values, variables);
    if(output.error)
      output.messages = `Error común, ${this.value}: ${output.messages}`
    return output;
  }

  static createFromResponse(commonErrorJson) {
    var commonError = new CommonError();
    commonError.values = commonErrorJson.values;
    commonError.message = commonErrorJson.message;
    return commonError;
  }
}
module.exports = CommonError;