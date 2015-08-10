var Uniform = function(codeFragment) {
  this.codeFragment = codeFragment;

  this.checkSyntax = function() {
    var match = this.codeFragment.match(this.syntax);
    var emptyParameters = false;
    if(match){
      emptyParameters = [match[3].trim(), match[4].trim(), match[5].trim()].some(function (element) {
        return element == '';
      });
    }
    if(!match || emptyParameters){
      return false;
    } else if (match && !emptyParameters){
      return true;
    } else {
      return false
    }
  }

  this.getParameters = function() {
    var match = this.codeFragment.match(this.syntax);
    if(match){
      return {
        error: false,
        variable: {
          name: match[1].trim(),
          min: match[3].trim(),
          max: match[4].trim(),
          step: match[5].trim(),
        }
      }
    } else {
      return {
        error: true,
        variable: null
      }
    }
  }

  this.generateCode = function() {
    var variableParameters = this.getParameters();
    if(variableParameters.error){
      return {
        error: true,
        code: null
      }
    }else {
      var variable = variableParameters.variable;

      var randomName = "random_" + variable.name;

      var code = [
        `var ${variable.name} = ${variable.min} + Math.floor(((${variable.max} - ${variable.min}) * Math.random()/${variable.step})) * ${variable.step}`,
      ]
      variable["code"] = code;
      return {
        error: false,
        variable: variable
      };
    }
  }

}
Uniform.prototype.identifier = 'U'
Uniform.prototype.syntax =  /(\$[a-zA-Z])\s*=\s*(u|U)\[([^\;]+)\;([^\;]+)\;([^\]]+)\]/
module.exports = Uniform;
