var sum = 0;

//test cases here

//calls recursive 'process' function and returns result
function calc(string){
  var json = JSON.parse(string);
  return process(json);
}

//recurses through nested expression, returning result from bottom up
function process(json){
  if("expr" in json){
    json.number = process(json.expr);
  }

  if(json.op == "add"){
    sum = add(sum, json.number);
  } else if(json.op == "subtract"){
    sum = sub(sum, json.number);
  } else if(json.op == "multiply"){
    sum = mult(sum, json.number);
  } else if(json.op == "divide"){
    sum = div(sum, json.number);
  }
  return sum;
}

//operation methods
function add(a, b){
  return a+b;
}

function sub(a, b){
  return a-b;
}
