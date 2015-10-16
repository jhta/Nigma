//Variable Models
const Uniform = require('./variables/uniform');
const Specific = require('./variables/specific');
const Categorical = require('./variables/categorical');
const Variable = require('./variables/variable');

var VariableParser = {
  _detectType(nigmaCode) {
    var regex = /(\_[a-zA-Z])\s*=\s*(u|e|c|U|E|C)(\[|\{)/
    var match = nigmaCode.match(regex)
    if(match){
      var type;
      switch (match[2].toUpperCase()) {
        case Uniform.identifier():
          type =  Uniform
          break;
        case Specific.identifier():
          type =  Specific
          break;
        case Categorical.identifier():
          type =  Categorical
          break;
      }
      return {
        error: false,
        message: null,
        type: type
      }

    } else {
      return {
        error: true,
        message: "El tipo de la variable no puede ser determinado. Uniforme: $x = U[min; max; step], Especifica: $x = E{exp1, exp2,..., expn}, Categorica: $x = C{'text 1', 'text 2', ... , 'text 3'}",
        type: null
      }
    }
  },

  compile(nigmaCode) {
    var errors =  [], variables =  [];
    for(var j = 0; j < nigmaCode.length; j++){
      var codeFragment = nigmaCode[j];
      var variableType = this._detectType(codeFragment);
      if(variableType.error){
        errors.push(`Error en la linea ${j + 1}: ${variableType.message}`);
        break;
      } else {
        var variable = new variableType.type(codeFragment);
        var variableOuput = variable.generateCode(variables.map(variable => variable.name));
        if (variableOuput.error) {
          errors.push(`Error en la linea ${ j + 1}: ${variableOuput.message}`);
          break;
        } else {
          variables.push(variableOuput.variable);
        }

      }
    }
    return {
      errors: errors,
      variables: variables
    };
  },

  executeCode(variables) {
    var Variables = {}
    var output = {
      errors: [],
      result: null
    };
    var replaceVariables = Uniform.replaceVariables;
    var javascriptCode = variables.map(variable => variable.code);
    for(var i=0; i < javascriptCode.length; i++){
      try{
        var jCode = javascriptCode[i];
        eval(jCode);
      } catch(exception) {
        output.errors.push(`Error en la linea ${i + 1}: ${exception.message}`);
        break;
      }
    }
    if(output.errors.length == 0){
      output.result = {}
    } else {
      window.outputValues = {}
    }

    return output;
  }
}

module.exports = VariableParser;
