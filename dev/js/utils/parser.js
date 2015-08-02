const VariableParser = {
  _TYPES: {
    UNIFORM: {
      name: 'uniform',
      identifier: 'U'
    },
    SPECIFIC: {
      name: 'specific',
      identifier: 'E'
    },
    CATEGORICAL: {
      name: 'categorical',
      identifier: 'C'
    }
  },

  detect: function(variableString){
    var regex = /([a-zA-Z\_\-]+[A-Za-z\_\-\$]*)*\s*=\s*(u|e|c|U|E|C)(\[|\{)/
    var match = variableString.match(regex)
    if(match){
      var type;
      switch (match[2].toUpperCase()) {
        case this._TYPES.UNIFORM.identifier:
          type =  this._TYPES.UNIFORM.name
          break;
        case this._TYPES.SPECIFIC.identifier:
          type =  this._TYPES.SPECIFIC.name
          break;
        case this._TYPES.CATEGORICAL.identifier:
          type =  this._TYPES.CATEGORICAL.name
          break;
      }
      return {
        error: false,
        variable: {
          name: match[1],
          type: type
        }
      }

    }else{
      return {
        error: true,
        errorMessage: "Variable is not well formated or type could not be determined",
        type: null
      }
    }
  }
}

module.exports = VariableParser;
