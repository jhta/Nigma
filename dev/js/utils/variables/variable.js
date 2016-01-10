

class Variable {
  constructor(codeFragment) {
    this.codeFragment = codeFragment;
    this.name = "";
    this.parameters = {};
    this.code = "";
    this.possibleValue = null;
  }
}

module.exports = Variable;