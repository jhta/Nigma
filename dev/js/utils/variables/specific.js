const Variable = require('./variable');
const ExpressionEvaluator = require('./expression-evaluator');

class Specific extends Variable {

  static identifier() {
    return 'E';
  }

  identifier() {
    return 'E';
  }

  static createSkeleton() {
    return "_E = E{numero 1, numero 2}";
  }

}

module.exports = Specific;
