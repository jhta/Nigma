const specific = {
  name: 'specific',
  identifier: 'E',
  syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(e|E)\{([^\}]+)\}/,
  checkSyntax: function (nigmaCode) {
    var regex = this.syntax;
    console.log(regex);
    var match = nigmaCode.match(regex);
    if(match){
      var elements = match[3].split(',');
      var elementsFilled = true;
      for(var i = 0;i < elements.length; i++){
        elements[i] = elements[i].trim();
        if(elements[i] == ''){
          elementsFilled = false;
          break;
        }
      }
      if(elementsFilled){
        return {
          error: false,
          variable: {
            name: match[1],
            type: 'specific',
            elements: elements
          }
        }
      } else {
        return {
          error: true,
          errorMessage: "The syntax for specific variable is not correct",
          variable: null
        }
      }
    } else {
      return {
        error: true,
        errorMessage: "The syntax for specific variable is not correct",
        variable: null
      }
    }
  }
}
module.exports = specific;
