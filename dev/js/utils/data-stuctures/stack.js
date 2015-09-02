const Node = require('./node');

class Stack {
  constructor() {
    this.front = null;
    this.size = 0;
  }

  push (value) {
    if(this.isEmpty()){
      var node = new Node(value);
      this.front = node;
    } else {
      var node = new Node(value);
      node.next = this.front;
      this.front = node;
    }
    this.size++;
  }

  pop() {
    if(this.isEmpty()){
      throw "Expression is not well formed";
    } else {
      var value = this.front.value;
      if(this.size == 1){
        this.front = null;
      } else {
        this.front = this.front.next;
      }
      this.size--;
      return value;
    }
  }

  isEmpty() {
    return this.size == 0;
  }

  peek () {
    if(!this.isEmpty()){
      return this.front.value;
    } else {
      throw "Expression is not well formed";
    }
  }

}
module.exports = Stack;
