const ExpressionEvaluator = require('../variables/expression-evaluator');
class CommonError {
  constructor() {
    this.values = {};
    this.message = "";
  }

  

  static createFromResponse(commonErrorJson) {
    var commonError = new CommonError();
    commonError.values = commonErrorJson.values;
    commonError.message = commonErrorJson.message;
    return commonError;
  }
}
module.exports = CommonError;