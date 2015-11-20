const Variable = require('./variable');
const ExpressionEvaluator = require('./expression-evaluator');

class Uniform extends Variable {

  
  static identifier() {
    return 'U';
  }

  identifier() {
    return 'U';
  }


  static createSkeleton() {
    return "_U = U[min, max, paso]";
  }

}

module.exports = Uniform;
