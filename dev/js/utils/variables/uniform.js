const Variable = require('./variable');

class Uniform extends Variable {

  
  static identifier() {
    return 'U';
  }

  identifier() {
    return 'U';
  }


  static createSkeleton() {
    return "_U = U[min, max, paso]";
  }

}

module.exports = Uniform;
