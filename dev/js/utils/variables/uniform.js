var Uniform = function(codeFragment) {
  this.codeFragment = codeFragment;

  this.checkSyntax = function() {
    var match = this.codeFragment.match(this.syntax);
    var emptyParameters = false;
    if(match){
      emptyParameters = [match[3].trim(), match[4].trim(), match[5].trim()].some(element  => element == '');
    }
    if(match && emptyParameters){
      return {
        error: true,
        message: 'Incorrect syntax for uniform variable. Some of the parameters of the Uniform variable are empty',
        variable: null
      };
    } else if (!match){
      return {
        error: true,
        message: 'Incorrect syntax for uniform variable. The syntax used to create an Uniform variable is $x = U[min; max; step]',
        variable: null
      };
    } else {
      return {
        error: false,
        message: null,
        variable: null
      }
    }
  }

  this.getParameters = function() {
    var match = this.codeFragment.match(this.syntax);
    return {
      error: false,
      variable: {
        name: match[1].trim(),
        min: match[3].trim(),
        max: match[4].trim(),
        step: match[5].trim(),
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
      variable.code = `window.${variable.name} = ${variable.min} + Math.floor(((${variable.max} - ${variable.min}) * Math.random()/${variable.step})) * ${variable.step}`
      return {
        error: false,
        variable: variable
      };
    }
  }
}
Uniform.prototype.identifier = 'U'
Uniform.prototype.syntax =  /(\$[a-zA-Z])\s*=\s*(u|U)\[([^\,]+)\,([^\,]+)\,([^\]]+)\]/
Uniform.prototype.createSkeleton = function(){
  return "$U = U[min, max, paso]";
}
module.exports = Uniform;
