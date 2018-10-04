// Example from Mixu's NodeJS eBook Ch. 10
// http://book.mixu.net/node/ch10.html
var http = require('http');
// create the secure echo server
http.createServer(function(req, res) {
    if (req.method == "GET") {
      getRequest(req, res);
    }else if (req.method == "POST"){
      postRequest(req, res);
    }
}).listen(3000, '0.0.0.0');

function getRequest(req, res){
  var html = require("./activity3_utils/html_utils.js");
  var api = require("./activity3_utils/api_utils.js");
  var url = require('url');
  var jsonData;
  //logic here
  var path = url.parse(req.url, true, false).pathname;
  var splitPath = path.split("/");
  var check = api.login_check(req);
  if(check){
    if(splitPath[1] == "view_news"){
        var resObj = html.view_news(check[0], check[1]);
        res.writeHead(200);
        res.end(resObj);
    }else if(splitPath[1] == "article"){
      if(splitPath[3] == "edit"){
        resObj = html.edit_article(check[0], splitPath[2], check[1])
      }else{
        resObj = html.article_page(check[0], splitPath[2], check[1]);
      }
      res.writeHead(200);
      res.end(resObj);
    }else if(splitPath[1] == "login"){
      var resObj = html.login_page("");
      res.writeHead(200);
      res.end(resObj);
    }
  }

  if(splitPath[1] == ""){
    var resObj = html.login_page("");
    console.log(req.headers);
    res.writeHead(200);
    res.end(resObj);
  }else if(["logout", "update_article", "create_new_article"] == splitPath[1]){
    res.writeHead(401);
    res.end();
  }else{
    res.writeHead(404);
    res.end();
  }
}

function postRequest(req, res){
  var jsonData;
  var xml_utils = require('./activity3_utils/xml_utils.js');
  var html = require('./activity3_utils/html_utils.js');
  var api = require("./activity3_utils/api_utils.js");
  var url = require('url');
  req.on('data', function (chunk) {
    jsonData = JSON.parse(xml_utils.parseChunk(String(chunk)));
  });
  //insert logic here
  //default login mechanism
  req.on('end', function () {
    var reqObj = jsonData;
    var referer = req.headers.referer.split('/');
    var url = req.url.split("/");
    if(referer[referer.length-1] == "create_story"){
      res.writeHead(301, {Location: req.headers.origin + "/article/" + xml_utils.create_story(reqObj)});
      res.end();
    }else if(req.url == "/login"){
      if(reqObj.uname == reqObj.pass){
        res.setHeader('Set-Cookie', "info=" + reqObj.uname + "+" + reqObj.type);
        res.writeHead(301, { 'Content-Type': 'text/html; charset=utf-8', 'Location': req.headers.origin + '/view_news'});
        res.end();
      }else{
        var resObj = html.login_page("Login Failed");
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(resObj);
      }
    }else if(url[url.length-1] == "update_article"){
      res.writeHead(301, {Location: req.headers.origin + "/article/" + xml_utils.update_story(reqObj)});
      res.end();
    }else if(url[url.length-1] == "logout"){
      res.setHeader("Set-Cookie", "expires=Thu, 01 Jan 1970 00:00:00 GMT");
      res.writeHead(301, { 'Content-Type': 'text/html; charset=utf-8', 'Location': req.headers.origin});
      res.end();
    }else{
      res.writeHead(404);
      res.end();
    }
  });
}
