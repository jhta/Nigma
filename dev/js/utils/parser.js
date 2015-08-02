const VariableParser = {
  _TYPES: {
    UNIFORM: {
      name: 'uniform',
      identifier: 'U',
      syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|U)\[([^\;]+)\;([^\;]+)\;([^\]]+)\]/
      checkSyntax: function (nigmaCode) {
        var regex = this.sintax;
        var match = nigmaCode.match(regex);
        if(match){
          return {
            error: false,
            variable: {
              name: match[1],
              type: 'uniform',
              min: match[3],
              max: match[4],
              step: match[5]
            }
          }
        }
      }
    },
    SPECIFIC: {
      name: 'specific',
      identifier: 'E',
      syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(e|E)\{([^\}]+)\}/
    },
    CATEGORICAL: {
      name: 'categorical',
      identifier: 'C',
      syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(c|C)\{([^\}]+)\}/
    }
  },

  _detectVariableType: function(nigmaCode){
    var regex = /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|e|c|U|E|C)(\[|\{)/
    var match = nigmaCode.match(regex)
    if(match){
      var type;
      switch (match[2].toUpperCase()) {
        case this._TYPES.UNIFORM.identifier:
          type =  this._TYPES.UNIFORM
          break;
        case this._TYPES.SPECIFIC.identifier:
          type =  this._TYPES.SPECIFIC
          break;
        case this._TYPES.CATEGORICAL.identifier:
          type =  this._TYPES.CATEGORICAL
          break;
      }
      return {
        error: false,
        errorMessage: null
        variable: {
          name: match[1],
          type: type
        }
      }

    }else{
      return {
        error: true,
        errorMessage: "Variable is not well formated or type could not be determined",
        variable: null
      }
    }
  },
  _checkSyntax: function (nigmaCode) {
    var self = this
    const typeOutput = self._detectVariableType(nigmaCode)
    if(!typeOutput.error){

    } else {
      return {
        error: true,
        errorMessage: typeOutput.errorMessage
      };
    }
  }
  generateCode: function (nigmaCode) {


  }
}

module.exports = VariableParser;
