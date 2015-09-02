//Data Sctructures
const Stack = require('../data-stuctures/stack');
const Variable = require('./variable');

module.exports = {
	evaluate(expression, variables) {
    // Shunting Yard Algorithm by Edgar Dijkstra
    var output = {
      error: false,
      possibleValue: null,
      messages: []
    }
    try {
      var operationStack = new Stack();
      var valuesStack = new Stack();
      for (var i = 0; i < expression.length; i++) {

        const token = expression[i];

        if(token == ' ') continue;
        if(token >= '0' && token <= '9') {
          var chnumber = token;
          i++;
          while(i < expression.length && ((expression[i] >= '0' && expression[i] <= '9') || expression[i] == '.')) {
            chnumber = `${chnumber}${expression[i++]}`;
          }
          i--;
          valuesStack.push(parseFloat(chnumber));
        } else if (token == '$') {
          var variableText = token
          if(++i < expression.length && expression[i].toUpperCase() >= 'A' && expression[i].toUpperCase() <= 'Z') {
            variableText += expression[i];
            var variable = variables[variableText];
            if (variable == null) {
              throw `Variable ${variableText} is not defined`;
            } else {
              valuesStack.push(variable.getPossibleValue(variables));
            }
          } else {
            throw "Invalid character in expression, expecting variable definition"
          }
        } else if (token == '(') {
          operationStack.push(token)
        } else if (token == ')') {
          var leftFound = false;
          while(operationStack.peek() != '(') {
            valuesStack.push(this.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
          }
          operationStack.pop();
        } else if (['+', '-', '*', "/"].some((op) => op == token)) {
          while (!operationStack.isEmpty() && this.hasPrecedence(token, operationStack.peek()))
            valuesStack.push(this.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
          operationStack.push(token);
        } else {
          throw "Invalid character in expression"
        }
      }
      while (!operationStack.isEmpty())
        valuesStack.push(this.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
      output.error = false;
      output.possibleValue = valuesStack.pop();
      if(!valuesStack.isEmpty()) {
        throw "Expression is not well formed"
      }
    } catch(exception) {
      output.error = true
      output.messages = exception
      console.log(exception);
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
        messages: "Expression may contain undefined variables or any of the variables used are not evaluables"
      }
    }
  },

  applyOperation(operation, operand1, operand2) {
    switch(operation) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
    }
  },
  hasPrecedence(op1, op2) {
    if (op2 == '(' || op2 == ')')
      return false;
    if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-'))
      return false;
    else
      return true;
  }
};