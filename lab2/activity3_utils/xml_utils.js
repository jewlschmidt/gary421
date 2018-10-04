exports.parseChunk = function(chunk){
  var output = "{";
  var ar = chunk.split("&");

  for(var i = 0; i < ar.length; i++){
    output += "\"" + ar[i].substring(0, ar[i].indexOf('=')) + "\"";
    output += ":\"" + ar[i].substring(ar[i].indexOf('=') + 1, ar[i].length) + "\"";
    output += ',';
  }

  output = output.slice(0, output.length-1) + "}";
  return output;
}

exports.create_story = function(json){
  var serv = require("../NewsService.js")
  var ns = new serv.NewsService();
  ns.createNews(json.title.replace(/\+/g, " "), json.author.replace(/\+/g, " "), json.date, json.public, json.content.replace(/\+/g, " "));
  return json.title.replace(/\+/g, "%20");
}

exports.update_story = function(json){
  var serv = require("../NewsService.js")
  var ns = new serv.NewsService();
  ns.updateNews(json.title.replace(/\+/g, " "), json.author.replace(/\+/g, " "), json.date, json.public, json.content.replace(/\+/g, " "));
  return json.title.content.replace(/\+/g, "%20");
}

exports.parseURL = function(page){
  var ar = page.split("%20");
  var output = ar[0];
  for(var i = 1; i < ar.length; i++){
    output += " " + ar[i];
  }
  return output;
}

exports.parseNews = function(title, author, dateStart, dateEnd, account){
  var serv = require("../NewsService.js")
  var ns = new serv.NewsService();
  var pub = "T";
  if(account == "subscriber"){
    pub = undefined;
  }else if(account == "filter"){
    pub = "F";
  }
  articles = ns.getNews(title, author, dateStart, dateEnd, pub).getElementsByTagName("ARTICLE");
  var output = []
  for(var i = 0; i < articles.length; i++){
    output.push(parseArticle(articles[i]));
  }
  return output;
}

parseArticle = function(node){
  var output = {
    title: node.getElementsByTagName("TITLE")[0].firstChild.data,
    author: node.getElementsByTagName("AUTHOR")[0].firstChild.data,
    date: node.getElementsByTagName("DATE")[0].firstChild.data,
    content: node.getElementsByTagName("CONTENT")[0].firstChild.data,
    pub: node.getElementsByTagName("PUB")[0].firstChild.data
  };
  return output;
}
