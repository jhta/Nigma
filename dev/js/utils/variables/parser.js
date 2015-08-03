const UNIFORM = require('./uniform');
const SPECIFIC = require('./specific');
const CATEGORICAL = require('./categorical');


const VariableParser = {
  _detectVariableType: function(nigmaCode){
    var regex = /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|e|c|U|E|C)(\[|\{)/
    var match = nigmaCode.match(regex)
    if(match){
      var type;
      switch (match[2].toUpperCase()) {
        case UNIFORM.identifier:
          type =  UNIFORM
          break;
        case SPECIFIC.identifier:
          type =  SPECIFIC
          break;
        case CATEGORICAL.identifier:
          type =  CATEGORICAL
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
  _checkSyntax: function (nigmaCode) {
    var self = this
    const typeOutput = self._detectVariableType(nigmaCode)
    if(!typeOutput.error){
      var variableObj = typeOutput.variable.type.checkSyntax(nigmaCode);
      if(variableObj.error){
        return {
          error: true
        }
      }else{
        return variableObj.variable.generateCode(variableObj.variable)
      }
    } else {
      return {
        error: true,
        errorMessage: typeOutput.errorMessage
      };
    }
  },
  generateCode: function (nigmaCode) {


  }
}

module.exports = VariableParser;
