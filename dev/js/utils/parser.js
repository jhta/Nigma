//Variable Models
const Uniform = require('./variables/uniform');
const Specific = require('./variables/specific');
const Categorical = require('./variables/categorical');
const Variable = require('./variables/variable');
const ExpressionEvaluator = require('./variables/expression-evaluator');

var VariableParser = {
  _detectType(nigmaCode) {
    var regex = /(\$[a-zA-Z])\s*=\s*(u|e|c|U|E|C)(\[|\{)/
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
        message: "Variable is not well formated or type could not be determined. Uniform: $x = U[min; max; step], Specific: $x = E{exp1, exp2,..., expn}, Categorical: $x = C{'text 1', 'text 2', ... , 'text 3'}",
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
        errors.push({
          message: `Error at line ${j + 1}: ${variableType.message}`,
          line: j + 1
        });
        break;
      } else {
        var variable = new variableType.type(codeFragment);
        var variableOuput = variable.generateCode(variables.map(variable => variable.name));
        if (variableOuput.error) {
          errors.push({
            message: `Error at line ${ j + 1}: ${variableOuput.message}`,
            line: j + 1
          });
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
    window.outputValues = {}
    var output = {
      errors: [],
      result: null
    };
    var replaceVariables = Uniform.replaceVariables;
    var javascriptCode = variables.map(variable => variable.code);
    for(var i=0; i < javascriptCode.length; i++){
      try{
        var jCode = replaceVariables(javascriptCode[i]);
        eval(jCode);
      } catch(exception) {
        output.errors.push({message: `Error at line ${i + 1}: ${exception.message}`, line: i + 1 });
        break;
      }
    }
    if(output.errors.length == 0){
      output.result = {}
      variables.forEach(variable => output.result[variable.name] = eval(replaceVariables(variable.name)))
    } else {
      window.outputValues = {}
    }

    return output;
  },

  isEvaluable(expression, variables) {
    console.log({
      expression: expression,
      variables: variables
    });
    var evaluableVariables = Variable.retrieveEvaluableVariables(variables);
    var match = expression.match(/\$[A-Za-z]/g) || [];
    console.log(match);
    var compoundOfEvaluable = match.every((varName) => evaluableVariables[varName] != null);
    if (compoundOfEvaluable) {
      var output = ExpressionEvaluator.evaluate(expression, evaluableVariables);
      console.log(output);
    } else {
      return {
        error: true,
        message: "lala"
      }
    }
  },






}

module.exports = VariableParser;
