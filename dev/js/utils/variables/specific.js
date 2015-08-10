let Specific = function(codeFragment) {

  this.codeFragment = codeFragment;

  this.checkSyntax = function() {
    let regex = this.syntax;
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

  this.getParameters = function() {
    let match = this.codeFragment.match(this.syntax);
    let elements = match[3].split(',');
    elements = elements.map(element => (element.trim()));
    return {
      error: false,
      variable: {
        name: match[1].trim(),
        elements: elements,
        code: null
      }
    }
  }

  this.generateCode = function() {
    let syntaxValidation = this.checkSyntax();
    if(syntaxValidation.error){
      return syntaxValidation
    } else {
      let parameters = this.getParameters();
      let variable = parameters.variable;
      let vector = variable.elements
      let vectorName = "vector_" + variable.name;
      let randomName = "random_" + variable.name;

      let code = [
        `var ${vectorName} = [${vector}]`,
        `var ${randomName} = Math.floor((Math.random() * ${vector.length}))`,
        `var ${variable.name} = ${vectorName}[${randomName}]`
      ]
      variable.code = code.join(";");
      return {
        error: false,
        variable: variable
      };
    }
  }
}
Specific.prototype.identifier = 'E'
Specific.prototype.syntax =  /(\$[a-zA-Z])\s*=\s*(e|E)\{([^\}]+)\}/
module.exports = Specific;
