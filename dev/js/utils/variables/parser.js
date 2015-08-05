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
        case Specific.identifier:
          type =  Specific
          break;
        case Categorical.identifier:
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
    console.log(_detect);
    nigmaCode.forEach(function (codeFragment) {
      var variableType = _detect(codeFragment)
      if(variableType.error){
        output.error.push(variableType.errorMessage)
      } else {
        var variable = new variableType.type(codeFragment);
        if(variable.checkSyntax()){
          console.log(variable.getParameters());
          output.code.push(variable.generateCode())
        } else {
          /** **/
        }
      }
    }).bind(this);

    return output
  }
}

module.exports = VariableParser;
