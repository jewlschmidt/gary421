//utilities

//update the xml with some change
exports.updateXml = function(message, exec){
  var fs = require('fs');
  var xmldom = require('xmldom');
  fd = fs.openSync('./news.xml', 'r');

  //read input; ser421public/NodeIntro/file_read_sync.js
  var input = "";
  do {
    var buf = new Buffer(5);
    buf.fill();
    var bytes = fs.readSync(fd, buf, null, 5);
    input += buf.toString();
  } while (bytes > 0);

  //get an updated xml file; https://www.npmjs.com/package/xmldom
  var doc = new xmldom.DOMParser().parseFromString(input);
  doc = exec(doc, message);

  //write output; ser421public/NodeIntro/file_write_sync.js
  var write = new xmldom.XMLSerializer().serializeToString(doc);
  fd = fs.openSync('./news.xml', 'w');
  fs.writeSync(fd, write, null, null);
  fs.closeSync(fd);
}

//read the xml
exports.readXml = function(message, exec){
  var fs = require('fs');
  var xmldom = require('xmldom');
  fd = fs.openSync('./news.xml', 'r');

  //read input; ser421public/NodeIntro/file_read_sync.js
  var input = "";
  do {
    var buf = new Buffer(5);
    buf.fill();
    var bytes = fs.readSync(fd, buf, null, 5);
    input += buf.toString();
  } while (bytes > 0);

  //get an updated xml file; https://www.npmjs.com/package/xmldom
  var doc = new xmldom.DOMParser().parseFromString(input);
  doc = exec(doc, message);
  fs.closeSync(fd);

  return doc;
}

//utilities for changing xmldom doc

//message must be an array with order [title, author, date, pub, content]
//returns updated xml
exports.addXML = function(doc, message){
  var xmldom = require('xmldom');
  var element = doc.createElement("ARTICLE");

  createChild(doc, element, "TITLE", message[0]);
  createChild(doc, element, "AUTHOR", message[1]);
  createChild(doc, element, "DATE", message[2]);
  createChild(doc, element, "PUB", message[3]);
  createChild(doc, element, "CONTENT", message[4]);

  doc.getElementsByTagName("NEWS")[0].appendChild(element);
  return doc;
}

//message must be an array with order [title, author, date, pub, content]
//returns updated xml
exports.modXML = function(doc, message){
  var articles = doc.getElementsByTagName("ARTICLE");
  var title = message[0];
  for(var i = 0; i < articles.length; i++){
    if(String(articles[i].getElementsByTagName("TITLE")[0].firstChild).valueOf() == title){
      replaceChild(articles[i].getElementsByTagName("AUTHOR")[0], message[1]);
      replaceChild(articles[i].getElementsByTagName("DATE")[0], message[2]);
      replaceChild(articles[i].getElementsByTagName("PUB")[0],  message[3]);
      replaceChild(articles[i].getElementsByTagName("CONTENT")[0], message[4]);
    }
  }
  return doc;
}

//message must be an array with order [head, newHead]
//returns updated xml
exports.modTitleXML = function(doc, message){
  var articles = doc.getElementsByTagName("ARTICLE");
  var title = message[0];
  var temp;
  for(var i = 0; i < articles.length; i++){
    if(String(articles[i].getElementsByTagName("TITLE")[0].firstChild).valueOf() == title){
      replaceChild(articles[i].getElementsByTagName("TITLE")[0], message[1]);
    }
  }
  return doc;
}

//message must be the headline of the article to be deleted
//returns updated xml
exports.deleteXML = function(doc, message){
  var articles = doc.getElementsByTagName("ARTICLE");
  for(var i = 0; i < articles.length; i++){
    if(String(articles[i].getElementsByTagName("TITLE")[0].firstChild).valueOf() == message){
      temp = doc.getElementsByTagName("NEWS")[0];
      temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
    }
  }
  return doc;
}

exports.getXML = function(doc, message){
  var title = message[0];
  var author = message[1];
  var dateStart = message[2];
  var dateEnd = message[3];
  var pub = message[4];
  var temp;

  var articles = doc.getElementsByTagName("ARTICLE");
  for(var i = 0; i < articles.length; i++){
    if(title != undefined){
      if(String(articles[i].getElementsByTagName("TITLE")[0].firstChild).valueOf() != title){
        temp = doc.getElementsByTagName("NEWS")[0];
        temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
        i--;
        continue;
      }
    }
    if(author != undefined){
      if(String(articles[i].getElementsByTagName("AUTHOR")[0].firstChild).valueOf() != author){
        temp = doc.getElementsByTagName("NEWS")[0];
        temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
        i--;
        continue;
      }
    }
    if(dateStart != undefined){
      var ds = Date.parse(ds);
      if(Date.parse(articles[i].getElementsByTagName("DATE")[0].firstChild) < ds){
        temp = doc.getElementsByTagName("NEWS")[0];
        temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
        i--;
        continue;
      }
    }
    if(dateEnd != undefined){
      de = Date.parse(message[3])
      if(Date.parse(articles[i].getElementsByTagName("DATE")[0].firstChild) > de){
        temp = doc.getElementsByTagName("NEWS")[0];
        temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
        i--;
        continue;
      }
    }
    if(pub != undefined){
      if(String(articles[i].getElementsByTagName("PUB")[0].firstChild).valueOf() != pub){
        temp = doc.getElementsByTagName("NEWS")[0];
        temp.removeChild(temp.getElementsByTagName("ARTICLE")[i]);
        i--;
        continue;
      }
    }
  }
  return doc;
}

//utilities for reading/writing xml

exports.readXML = function(){
  var fs = require('fs');
  var xmldom = require('xmldom');
  fd = fs.openSync('./news.xml', 'r');
  var input = "";
  do {
    var buf = new Buffer(5);
    buf.fill();
    var bytes = fs.readSync(fd, buf, null, 5);
    input += buf.toString();
  } while (bytes > 0);
  fs.closeSync(fd);
  var doc = new xmldom.DOMParser().parseFromString(input);
  return doc;
}

//write all the things
exports.writeXML = function(newXML){
  var fs = require('fs');
  var xmldom = require('xmldom');
  var write = new xmldom.XMLSerializer().serializeToString(newXML);
  fd = fs.openSync('./news.xml', 'w');
  var bytes = fs.writeSync(fd, write, null, null);
  fs.closeSync(fd);
}

//helper functions for child modification

//utility for creating and appending child nodes
function createChild(doc, element, name, value){
  var tempElement = doc.createElement(name);
  tempElement.appendChild(doc.createTextNode(value))
  element.appendChild(tempElement);
}

function replaceChild(element, value){
  element.firstChild.data = value;
}
