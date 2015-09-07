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
      variables.forEach((variable) => scope[variable.name] = variable.getPossibleValue());
      var evalValue = math.eval(expression, scope)
      if(isNaN(evalValue)){
        throw "Expression is not evaluable";
      }
    } catch(exception) {
      output.error = true
      output.messages.push(exception);
    }
    return output;

  },

  isEvaluable(expression, variables) {
    var evaluableVariables = Variable.retrieveEvaluableVariables(variables);
    var match = expression.match(/\$[A-Za-z]/g) || [];
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