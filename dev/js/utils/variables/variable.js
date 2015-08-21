class Variable {
  constructor(codeFragment) {
    this.codeFragment = codeFragment;
    this.name = "";
    this.parameters = {};
    this.code = "";
  }

  static replaceVariables(codeText) {
    if(codeText.match(/(\$[A-Za-z])/g))
      codeText = codeText.replace(/(\$[A-Za-z])/g, `window.outputValues["$1"]`);
    return codeText;
  }
}

module.exports = Variable;