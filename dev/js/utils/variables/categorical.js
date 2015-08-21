var Specific = require('./specific');
class Categorical extends Specific {

  checkSyntax() {
    let regex = this.syntax();
    console.log(regex);
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

  static identifier() {
    return 'C';
  }

  syntax() {
    return /(\$[a-zA-Z])\s*=\s*(c|C)\{([^\}]+)\}/;
  }

  static createSkeleton() {
    return "$C = C{'texto 1', 'texto 2'}";
  }

}

module.exports = Categorical;
