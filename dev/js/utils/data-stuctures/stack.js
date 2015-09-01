const Node = require('./node');

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push (value) {
    if(this.isEmpty()){
      this.top = new Node(value);
    } else {
      var node = new Node(value);
      this.top.next = node;
      this.top = node;
    }
    this.size++;
  }

  pop() {
    if(this.isEmpty()){
      throw "Cannot pop of an empty stack";
    } else {
      var value = this.top.value;
      if(this.size == 1){
        this.top = null;
      } else {
        this.top = this.top.previous
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
      return this.top.value;
    } else {
      throw "Cannot peek of an empty stack";
    }
  }

}
module.exports = Stack;
