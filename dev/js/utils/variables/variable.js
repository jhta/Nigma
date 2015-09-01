//Data Sctructures
const Stack = require('../data-stuctures/stack');

class Variable {
  constructor(codeFragment) {
    this.codeFragment = codeFragment;
    this.name = "";
    this.parameters = {};
    this.code = "";
  }

  validName(currentVariables, name) {
  	return !(currentVariables.indexOf(name) != -1);
  }

  static evaluate(expression, variables) {
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
          while(i < expression.length && ((expression[i] >= '0' && expression[i] <= '9')) || expression[i] == '.') {
            chnumber = `${chnumber}${expression[i]}`;
          }
          i--;
          valuesStack.push(parseFloat(chnumber));
        } else if (token == '(') {
          operationStack.push(token)
        } else if (token == ')') {
          var leftFound = false;
          while(operationStack.peek() != '(') {
            valuesStack.push(Variable.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
          }
          operationStack.pop();
        } else if (['+', '-', '*', "/"].some((op) => op == token)) {
          while (!operationStack.empty() && Variable.hasPrecedence(token, operationStack.peek()))
            valuesStack.push(Variable.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
          operationStack.push(token);
        }
      }
      while (!operationStack.empty())
        valuesStack.push(Variable.applyOperation(operationStack.pop(), valuesStack.pop(), valuesStack.pop()));
      output.error = false;
      output.possibleValue = valuesStack.pop();
    } catch(exception) {
       output.error = true
       output.message = "Expression is not wellformed"
    }
    return output;

  }

  static applyOperation(operation, operand1, operand2) {
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
  }

  static hasPrecedence(op1, op2) {
    if (op2 == '(' || op2 == ')')
      return false;
    if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-'))
      return false;
    else
      return true;
  }

  static replaceVariables(codeText) {
    if(codeText.match(/(\$[A-Za-z])/g))
      codeText = codeText.replace(/(\$[A-Za-z])/g, `window.outputValues["$1"]`);
    return codeText;
  }

  static retrieveEvaluableVariables(variables) {
    var evaluableVariables = {}
    for (var i = variables.length - 1; i >= 0; i--) {
      var variable = variables[i];
      if (variable.identifier == Uniform.identifier() || variable.identifier == Specific.identifier()) {
        evaluableVariables[variable.name] = variable;
      }
    }
    return evaluableVariables;
  }
}

module.exports = Variable;