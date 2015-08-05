const Uniform = require('./uniform');
const Specific = require('./specific');
const Categorical = require('./categorical');


var VariableParser = {

  _detectVariableType(nigmaCode){
    var regex = /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|e|c|U|E|C)(\[|\{)/
    var match = nigmaCode.match(regex)
    if(match){
      var type;
      switch (match[2].toUpperCase()) {
        case Uniform.prototype.identifier:
          type =  Uniform
          break;
        case Specific.prototype.identifier:
          type =  Specific
          break;
        case Categorical.prototype.identifier:
          type =  Categorical
          break;
      }
      return {
        error: false,
        errorMessage: null,
        variable: {
          name: match[1],
          type: type
        }
      }

    }else{
      return {
        error: true,
        errorMessage: "Variable is not well formated or type could not be determined",
        variable: null
      }
    }
  },

  generateCode(nigmaCode) {
    var output = {
      errors: [],
      code: []
    }
    var _detect = this._detectVariableType;
    nigmaCode.forEach(function (codeFragment) {
      var variableType = _detect(codeFragment)
      if(variableType.error){
        output.error.push(variableType.errorMessage)
      } else {
        var variable = new variableType.variable.type(codeFragment);
        if(variable.checkSyntax()){
          output.code.push(variable.generateCode().code)
        } else {
          console.log("Somethning is not right", variable.checkSyntax());
          /** **/
        }
      }
    });

    return output
  }
}

module.exports = VariableParser;
