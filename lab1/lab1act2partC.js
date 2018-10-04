var calculator = new PreCalc(0);

//test cases here

function PreCalc(init){

  var sum = 0;
  var calcStack = [init];

  //calls recursive process function and returns result
  this.calc = function(string){
    var json = JSON.parse(string);
    return process(json);
  }

  //recurses through nested functions and performs operations from bottom up
  function process(json){
    if("expr" in json){
      json.number = process(json.expr);
    }

    if(json.op == "add"){
      sum = add(sum, json.number);
    } else if(json.op == "subtract"){
      sum = sub(sum, json.number);
    } else if(json.op == "pop"){
      return pop();
    } else if(json.op == "push"){
      return push(json.number);
    } else if(json.op == "print"){
      return print();
    }
    return sum;
  }

  //process functions
  function add(a, b){
    return calcStack[calcStack.length-1]+b;
  }

  function sub(a, b){
    return calcStack[calcStack.length-1]-b;
  }

  function pop(){
    if(calcStack.length > 0)
      return calcStack.pop();
    return "Empty Array";
  }

  function push(a){
    calcStack.push(a);
    return a;
  }

  //splits and reverses string representation
  function print(){
    return calcStack.toString().split(",").reverse().join();
  }
}
