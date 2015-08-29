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