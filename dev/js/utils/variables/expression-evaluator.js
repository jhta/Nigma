//Data Sctructures
const Stack = require('../data-stuctures/stack');
const Variable = require('./variable');

module.exports = {
	evaluate(expression, variables) {
    // Shunting Yard Algorithm by Edgar Dijkstra
    var output = {
      error: false,
      possibleValue: null
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
            var variableValue = variable.getPossibleValue(variables);
            console.log("Variable encontrada", variable, "Con valor", variableValue);
            valuesStack.push(variableValue);
          } else {
            throw "Invalid character"
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
          throw "Invalid character"
        }
      }
      while (!operationStack.isEmpty())
        valuesStack.push(this.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
      output.error = false;
      output.possibleValue = valuesStack.pop();
    } catch(exception) {
      output.error = true
      output.message = "Expression is not wellformed"
      console.log(exception.stack);
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
    var compoundOfEvaluable = match.every((varName) => evaluableVariables[varName] != null);
    if (compoundOfEvaluable) {
      var output = this.evaluate(expression, evaluableVariables);
      console.log(output);
    } else {
      return {
        error: true,
        message: "lala"
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