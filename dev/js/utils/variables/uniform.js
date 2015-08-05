var Uniform = function(codeFragment) {
  var self = this;
  self.codeFragment = codeFragment;

  self.checkSyntax = function () {
    var match = self.codeFragment.match(self.syntax);
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

  self.getParameters = function () {
    var match = self.codeFragment.match(self.syntax);
    if(match){
      return {
        error: false,
        variable: {
          name: match[1].trim(),
          min: parseInt(match[3].trim()),
          max: parseInt(match[4].trim()),
          step: parseInt(match[5].trim()),
        }
      }
    } else {
      return {
        error: true,
        variable: null
      }
    }
  }

  self.generateCode = function () {
    var variableParameters = self.getParameters();
    if(variableParameters.error){
      return {
        error: true,
        code: null
      }
    }else {
      var variable = variableParameters.variable;
      var vector = []
      for(var i = variable.min; i <= variable.max; i+= variable.min){
        vector.push(i);
      }
      var vectorName = "vector_" + variable.name;
      var randomName = "random_" + variable.name;

      var code = [
        ["var ", vectorName , "=[", vector, "];"].join(""),
        ["var ", randomName, "=", "Math.floor((Math.random() * ", vector.length ,"))"].join(""),
        ["var ", variable.name, "=", vectorName, "[", randomName, "];"].join("")
      ]
      return {
        error: false,
        code: code
      };
    }
  }


}
Uniform.prototype.identifier = 'U'
Uniform.prototype.syntax =  /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|U)\[([^\;]+)\;([^\;]+)\;([^\]]+)\]/
module.exports = Uniform;
