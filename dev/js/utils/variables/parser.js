const Uniform = require('./uniform');
const Specific = require('./specific');
const Categorical = require('./categorical');


var VariableParser = {

  _detectVariableType(nigmaCode){
    var regex = /(\$[a-zA-Z])\s*=\s*(u|e|c|U|E|C)(\[|\{)/
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
        message: null,
        type: type
      }

    }else{
      return {
        error: true,
        message: "Variable is not well formated or type could not be determined. Uniform: $x = U[min; max; step], Specific: $x = E{exp1, exp2,..., expn}, Categorical: $x = C{'text 1', 'text 2', ... , 'text 3'}",
        type: null
      }
    }
  },

  generateCode(nigmaCode) {
    var output = {
      errors: [],
      variables: []
    }
    var _detect = this._detectVariableType;
    var line = 0;
    for(var j = 0; j < nigmaCode.length; j++){
      var codeFragment = nigmaCode[j];
      line++;
      var variableType = _detect(codeFragment)
      if(variableType.error){
        output.errors.push({
          message: `Error at line ${line}: ${variableType.message}`,
          line: line
        });
        break;
      } else {
        var variable = new variableType.type(codeFragment);
        var variableOuput = variable.generateCode();
        if(variableOuput.error){
          output.errors.push({
            message: `Error at line ${line}: ${variable.message}`,
            line: line
          });
        } else {
          output.variables.push(variableOuput.variable);
        }
      }
    };
    return output;
  },
  executeCode(variables) {
    window.outputValues = {}
    var output = {
      errors: [],
      result: null
    };
    var javascriptCode = variables.map(variable => variable.code);
    for(var i=0; i < javascriptCode.length; i++){
      try{
        eval(javascriptCode[i])
      } catch(exception) {
        output.errors.push({message: `Error at line ${i + 1}: ${exception.message}`, line: i + 1 });
      }
    }
    if(output.errors.length == 0){
      output.result = {}
      variables.forEach(variable => output.result[variable.name] = eval(`window.outputValues['${variable.name}']`))
    }

    return output;
  }
}

module.exports = VariableParser;
