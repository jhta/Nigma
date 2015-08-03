const uniform =  {
  name: 'uniform',
  identifier: 'U',
  syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(u|U)\[([^\;]+)\;([^\;]+)\;([^\]]+)\]/,
  checkSyntax: function (nigmaCode) {
    var regex = this.syntax;
    var match = nigmaCode.match(regex);
    if(match && [match[3].trim(), match[4].trim(), match[5].trim()].every(function (element) {
      return element != ''
    })){
      return {
        error: false,
        variable: {
          name: match[1].trim(),
          type: 'uniform',
          min: parseInt(match[3].trim()),
          max: parseInt(match[4].trim()),
          step: parseInt(match[5].trim()),
          generateCode: uniform.generateCode
        }
      }
    } else {
      return {
        error: true,
        errorMessage: "The syntax for uniform variable is not correct",
        variable: null
      }
    }
  },
  generateCode: function (variableObj) {
    var vector = []
    for(var i = variableObj.min; i <= variableObj.max; i+= variableObj.min){
      vector.push(i);
    }
    var vectorName = "vector_" + variableObj.name;
    var randomName = "random_" + variableObj.name;

    var code = [
      ["var ", vectorName , "=[", vector, "];"].join(""),
      ["var ", randomName, "=", "Math.floor((Math.random() * ", vector.length ,"))"].join(""),
      ["var ", variableObj.name, "=", vectorName, "[", randomName, "];"].join("")
    ]
    return code;
  }
}
module.exports = uniform;
