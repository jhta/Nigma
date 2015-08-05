var Specific = function (codeFragment) {
  var self = this;
  self.codeFragment = codeFragment;

  self.checkSyntax =  function () {
    var regex = this.syntax;
    var match = this.codeFragment.match(regex);
    var elementsFilled = true;
    if(match){
      var elements = match[3].split(',');
      for(var i = 0;i < elements.length; i++){
        elements[i] = elements[i].trim();
        if(elements[i] == ''){
          elementsFilled = false;
          break;
        }
      }
    }
    if(!match || !elementsFilled){
      return false;
    } else if(match && elementsFilled) {
      return true;
    } else {
      return false
    }
  }

  self.getParameters = function () {
    var match = self.codeFragment.match(self.syntax);
    if(match){
      var elements = match[3].split(',');
      for(var i = 0;i < elements.length; i++){
        elements[i] = elements[i].trim();
        if(elements[i] == ''){
          elementsFilled = false;
          break;
        }
      }
      return {
        error: false,
        variable: {
          name: match[1].trim(),
          elements: elements
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
    } else {
      var variable = variableParameters.variable;
      var vector = variable.elements
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
Specific.prototype.identifier = 'E'
Specific.prototype.syntax =  /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(e|E)\{([^\}]+)\}/
module.exports = Specific;
