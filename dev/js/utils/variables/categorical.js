var Categorical = function(codeFragment) {

  this.codeFragment = codeFragment;

  this.checkSyntax = function() {
    var regex = this.syntax;
    var match = this.codeFragment.match(regex);
    var elementsFilled = true;
    if(match){
      var elements = match[3].split(',');
      elementsFilled = elements.every(element => element.trim() != '');
    }

    if(match && !elementsFilled){
      return {
        error: true,
        message: 'Incorrect syntax for categorical variable. Some of the parameters of the Categorical variable are empty'
      };
    } else if (!match){
      return {
        error: true,
        message: "Incorrect syntax for categorical variable. The syntax used to create a Categorical variable is: $x = C{'text 1', 'text 2', ... , 'text 3'}"
      };
    } else {
      return {
        error: false,
        message: null
      }
    }
  }

  this.getParameters = function() {
    var match = this.codeFragment.match(this.syntax);
    var elements = match[3].split(',');
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
    var syntaxValidation = this.checkSyntax();
    if(syntaxValidation.error){
      return syntaxValidation
    } else {
      var parameters = this.getParameters();
      var variable = parameters.variable;
      var vector = variable.elements
      var vectorName = "vector_" + variable.name;
      var randomName = "random_" + variable.name;

      var code = [
        `var ${vectorName} = [${vector}]`,
        `var ${randomName} = Math.floor((Math.random() * ${vector.length}))`,
        `window.${variable.name} = ${vectorName}[${randomName}]`
      ]
      variable.code = code.join(";");
      return {
        error: false,
        variable: variable
      };
    }
  }
}
Categorical.prototype.identifier = 'C'
Categorical.prototype.syntax =  /(\$[a-zA-Z])\s*=\s*(c|C)\{([^\}]+)\}/
module.exports = Categorical;
