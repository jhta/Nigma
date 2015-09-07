//Data Sctructures
const Stack = require('../data-stuctures/stack');
const Variable = require('./variable');
const math = require('mathjs');
module.exports = {
	evaluate(expression, variables) {
    var output = {
      error: false,
      possibleValue: null,
      messages: []
    }
    try {
      var scope = {};
      for(var key  in variables) {
        if(variables.hasOwnProperty(key)){

          var variable = variables[key];
          //scope[variable.name] = variable.getPossibleValue(variables);
          scope[variable.name] = 1;
        }
      }

      var evalValue = math.eval(expression, scope)
      if(isNaN(evalValue)){
        throw new Error("Expression is not evaluable");
      } else {
        output.possibleValue = evalValue;
      }
    } catch(exception) {
      output.error = true;
      if(exception.message != "Expression is not evaluable")
        output.messages.push("Expression is not well formated");
      else
        output.messages.push(exception.message);
    }
    return output;

  },

  isEvaluable(expression, variables) {
    var evaluableVariables = Variable.retrieveEvaluableVariables(variables);
    var match = expression.match(/\_[A-Za-z]/g) || [];
    var compoundOfEvaluable = match.every((varName) => evaluableVariables[varName] != null);
    if (compoundOfEvaluable) {
      var output = this.evaluate(expression, evaluableVariables);
      return output;
    } else {
      return {
        error: true,
        messages: ["Expression may contain undefined variables or any of the variables used are not evaluable"]
      }
    }
  }
};