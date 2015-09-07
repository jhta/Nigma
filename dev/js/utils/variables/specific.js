const Variable = require('./variable');
const ExpressionEvaluator = require('./expression-evaluator');

class Specific extends Variable {

  checkSyntax(currentVariables) {
    let regex = this.syntax();
    let match = this.codeFragment.match(regex);

    let elementsFilled = true;
    if(match){
      let elements = match[3].split(',');
      elementsFilled = elements.every(element => element.trim() != '');
    }

    if(match && !elementsFilled){
      return {
        error: true,
        message: 'Incorrect syntax for specific variable. Some of the parameters of the Specific variable are empty'
      };
    } else if (match && !this.validName(currentVariables, match[1])) {
      return {
        error: true,
        message: `Repeated variable name ${match[1]}`,
      };
    } else if (!match){
      return {
        error: true,
        message: 'Incorrect syntax for specific variable. The syntax used to create a Specific variable is _x = E{exp1, exp2,..., expn}'
      };
    } else {

      return {
        error: false,
        message: null
      }
    }
  }

  parseCode() {
    let match = this.codeFragment.match(this.syntax());
    let elements = match[3].split(',');
    elements = elements.map(element => element.trim());
    this.parameters = {
      elements: elements
    }
    this.name = match[1]
  }

  generateCode(currentVariables) {
    let syntaxValidation = this.checkSyntax(currentVariables);
    if(syntaxValidation.error){
      return syntaxValidation
    } else {
      this.parseCode();
      let vector = this.parameters.elements;
      let vectorName = `_vector_${this.name}`;
      let randomName = `_random_${this.name}`;

      let code = [
        `var ${vectorName} = [${vector}]`,
        `var ${randomName} = Math.floor((Math.random() * ${vector.length}))`,
        `window.outputValues['${this.name}'] = ${vectorName}[${randomName}]`
      ]
      console.log(code);
      this.code = `${code.join(";")};`;
      return {
        error: false,
        variable: this
      };
    }
  }

  static identifier() {
    return 'E';
  }

  identifier() {
    return 'E';
  }

  syntax() {
    return /(\_[a-zA-Z])\s*=\s*(e|E)\{([^\}]+)\}/;
  }

  getPossibleValue(variables) {
    if(this.possibleValue != null) {
      return this.possibleValue;
    }
    var random = Math.floor(Math.random() * this.parameters.elements.length)
    var output = ExpressionEvaluator.evaluate(this.parameters.elements[random], variables);
    return this.possibleValue = output.possibleValue;
  }

  static createSkeleton() {
    return "_E = E{numero 1, numero 2}";
  }

}

module.exports = Specific;
