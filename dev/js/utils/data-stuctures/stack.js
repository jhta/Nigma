const Node = require('./node');

class Stack {
  constructor() {
    this.front = null;
    this.size = 0;
  }

  push (value) {
    if(this.isEmpty()){
      var node = new Node(value);
      console.log(node);
      this.front = node;
    } else {
      var node = new Node(value);
      console.log("adding a second", node);
      node.next = this.front;
      this.front = node;
    }
    console.log(this.front, "lol isnot updating");
    this.size++;
  }

  pop() {
    if(this.isEmpty()){
      throw "Cannot pop of an empty stack";
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
      throw "Cannot peek of an empty stack";
    }
  }

}
module.exports = Stack;
