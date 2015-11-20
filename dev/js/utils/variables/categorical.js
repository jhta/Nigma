var Specific = require('./specific');
class Categorical extends Specific {

 

  static identifier() {
    return 'C';
  }

  identifier() {
    return 'C';
  }
  
  static createSkeleton() {
    return "_C = C{'texto 1', 'texto 2'}";
  }

}

module.exports = Categorical;
