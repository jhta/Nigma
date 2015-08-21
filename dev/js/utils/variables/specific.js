var Variable = require('./variable');
class Specific extends Variable {

  checkSyntax() {
    let regex = Specific.syntax();
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
    } else if (!match){
      return {
        error: true,
        message: 'Incorrect syntax for specific variable. The syntax used to create a Specific variable is $x = E{exp1, exp2,..., expn}'
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

  generateCode() {
    let syntaxValidation = this.checkSyntax();
    if(syntaxValidation.error){
      return syntaxValidation
    } else {
      this.parseCode();
      let vector = this.parameters.elements;
      let vectorName = "_vector_";
      let randomName = "_random_";

      let code = [
        `var ${vectorName} = [${vector}]`,
        `var ${randomName} = Math.floor((Math.random() * ${vector.length}))`,
        `${this.name} = ${vectorName}[${randomName}]`
      ]
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

  syntax() {
    return /(\$[a-zA-Z])\s*=\s*(e|E)\{([^\}]+)\}/;
  }

  static createSkeleton() {
    return "$E = E{numero 1, numero 2}";
  }

}

module.exports = Specific;
