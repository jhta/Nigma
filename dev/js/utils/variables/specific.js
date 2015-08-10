var Specific = function(codeFragment) {

  this.codeFragment = codeFragment;

  this.checkSyntax = function() {
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

  this.getParameters = function() {
    var match = this.codeFragment.match(this.syntax);
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

  this.generateCode = function() {
    var variableParameters = this.getParameters();
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
        ["var ", vectorName , "=[", vector, "]"].join(""),
        ["var ", randomName, "=", "Math.floor((Math.random() * ", vector.length ,"))"].join(""),
        ["var ", variable.name, "=", vectorName, "[", randomName, "]"].join("")
      ]
      variable["code"] = code;
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
