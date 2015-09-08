const Variable = require('./variable');
const ExpressionEvaluator = require('./expression-evaluator');

class Uniform extends Variable {

  checkSyntax(currentVariables) {
    var match = this.codeFragment.match(this.syntax());
    var emptyParameters = false;
    if(match){
      emptyParameters = [match[3].trim(), match[4].trim(), match[5].trim()].some(element  => element == '');
    }
    if(match && emptyParameters){
      return {
        error: true,
        message: 'Incorrect syntax for uniform variable. Some of the parameters of the Uniform variable are empty',
      };
    } else if (match && !this.validName(currentVariables, match[1])) {
      return {
        error: true,
        message: `Repeated variable name ${match[1]}`,
      };
    } else if (!match){
      return {
        error: true,
        message: 'Incorrect syntax for uniform variable. The syntax used to create an Uniform variable is _x = U[min; max; step]',
      };
    } else {
      return {
        error: false,
        message: null,
      }
    }
  }

  parseCode() {
    var match = this.codeFragment.match(this.syntax());
    this.parameters = {
      min: match[3].trim(),
      max: match[4].trim(),
      step: match[5].trim(),
    }
    this.name = match[1];
  }

  generateCode(currentVariables) {
    var syntaxValidation = this.checkSyntax(currentVariables);
    if(syntaxValidation.error){
      return syntaxValidation
    } else {
      this.parseCode();
      this.code = `Variables['${this.name}'] = ${this.parameters.min} + Math.floor(((${this.parameters.max} - ${this.parameters.min}) * Math.random()/${this.parameters.step})) * ${this.parameters.step};`
      return {
        error: false,
        variable: this
      };
    }
  }

  static identifier() {
    return 'U';
  }

  identifier() {
    return 'U';
  }

  getPossibleValue(variables) {
    if(this.possibleValue != null) {
      return this.possibleValue;
    }
    var min = ExpressionEvaluator.evaluate(this.parameters.min, variables).possibleValue;
    var max = ExpressionEvaluator.evaluate(this.parameters.max, variables).possibleValue;
    var step = ExpressionEvaluator.evaluate(this.parameters.step, variables).possibleValue;
    var output = min + Math.floor(((max - min) * Math.random() / step)) * step;
    return this.possibleValue = output;
  }

  syntax() {
    return /(\_[a-zA-Z])\s*=\s*(u|U)\[([^\,]+)\,([^\,]+)\,([^\]]+)\]/;
  }

  static createSkeleton() {
    return "_U = U[min, max, paso]";
  }

}

module.exports = Uniform;
