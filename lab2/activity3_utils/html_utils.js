exports.login_page = function(message){
  var output = message + "</br>";
  output += form_input("text", "uname", "uname");
  output += form_input("text", "pass", "pass");
  output += radio_input("guest", "type", "checked");
  output += radio_input("subscriber", "type", "");
  output += radio_input("author", "type", "");
  output += form_input("submit", "ok", "ok");
  output = form_wrap(output, "./login", "POST");
  output = body_wrap(output);
  var head = head_wrap("News Reader");
  output = "<html>" + head + output + "</html>";
  return output;
}

exports.view_news = function(name, account){
  var output = "";
  var output = get_news(name, account)
  output = html_wrap(account, name, "View News", output);
  return output;
}

get_news = function(name, account){
  var xml_utils = require("./xml_utils.js");
  var output = "";
  var articles = xml_utils.parseNews(undefined, undefined, undefined, undefined, account);
  for(var i = 0; i < articles.length; i++){
    output += article_link(articles[i]);
  }
  if(account = "guest"){
    articles = xml_utils.parseNews(undefined, undefined, undefined, undefined, "filter");
    for(var i = 0; i < articles.length; i++){
      output += articles[i].title + "</br>";
    }
  }else if(account == "author"){
    articles = xml_utils.parseNews(undefined, undefined, undefined, undefined, "filter");
    for(var i = 0; i < articles.length; i++){
      if(articles[i].author == name){
        output += article_link(articles[i]);
      }else{
        output += articles[i].title + "</br>";
      }
    }
  }
  return output;
}

exports.article_page = function(name, page, account){
  var xml_utils = require("./xml_utils.js");
  var title = xml_utils.parseURL(page);
  var article = xml_utils.parseNews(title, undefined, undefined, undefined, undefined);
  console.log(article[0] + " title " + title + " page " + page);
  console.log("hello");
  return html_wrap(account, name, "Read News", html_article_wrap(article[0], name), name);
}

exports.edit_article = function(name, page, account){
  var xml_utils = require("./xml_utils.js");
  var title = xml_utils.parseURL(page);
  var article = xml_utils.parseNews(title, undefined, undefined, undefined, undefined);
  return html_wrap(account, name, "Edit News", html_edit_wrap(article[0]), name);
}

exports.create_page = function(name){
  var output = "Create Article</br>";
  output += form_input("text", "title", "", "required");
  output += form_input("date", "date", "", "required");
  output += form_input("text", "author", name, "readonly");
  output += form_input("textarea", "content", "", "required");
  output += "public: ";
  output += radio_input("T", "public", "checked");
  output += radio_input("F", "public", "");
  output += form_input("reset", "cancel", "ok");
  output += form_input("submit", "submit", "ok");
  output = form_wrap(output, "./create_new_article", "POST");
  output = body_wrap(output);
  var head = head_wrap("News Reader");
  output = "<html>" + head + output + "</html>";
  return output;
}

html_wrap = function(role, name, message, html){
  head = head_wrap(role + " " + name + "\'s News Reader") + "</br>" + message + "</br>"
  form = form_wrap(form_input("submit", "logout", "ok"), "./logout", "POST");
  html = head + form + html;
  return "<html>" + html + "</html>";
}

head_wrap = function(html){
  return "<head>" + html + "</head>";
}

body_wrap = function(html){
  return "<body>" + html + "</body>";
}

html_article_wrap = function(article, name){
  var output = head_wrap(article.title) + "</br>";
  output += head_wrap(article.author) + "</br>";
  output += head_wrap(article.date) + "</br>";
  output += body_wrap(article.content) + "</br>";
  output += body_wrap(article.pub) + "</br>";

  var edit = "";
  if(article.author == name){
    edit = link("edit page", article.title + "/edit");
  }
  return edit + output;
}

html_edit_wrap = function(article){
  var output = form_input("text", "title", article.title, "required");
  output += form_input("text", "author", article.author, "readonly");
  output += form_input("date", "date", article.date, "required");
  output += form_input("textarea", "content", article.content, "required");
  output += "public: ";
  if(article.pub == "T"){
    output += radio_input("T", "public", "checked");
    output += radio_input("F", "public", "");
  }else{
    output += radio_input("T", "public", "");
    output += radio_input("F", "public", "checked");
  }
  output += form_input("reset", "cancel", "ok");
  output += form_input("submit", "submit", "ok");
  output = form_wrap(output, "./update_article", "POST");
  output = body_wrap(output);
  output = "<html>" + output + "</html>";
  return output;
}

article_link = function(article){
  return link(article.title, "article/" + article.title);
}

link = function(name, place){
  return "<a href=\"" + place + "\">" + name + "</a></br>";
}

form_wrap = function(html, action, method){
  return "<form action=\"" + action + "\" method=\"" + method + "\">" +
          html + "</form>";
}

form_input = function(type, name, value, attribute){
  if(attribute == undefined){
    attribute = "";
  }
  var label = "<label>" + name + ":</label>";
  return label + "<input type=\"" + type + "\" name=\"" + name + "\" value=\"" + value + "\" " + attribute + " /></br>";
}

radio_input = function(value, name, checked){
  var label = "<label>" + value + ":</label>";
  var button = "<input type=\"radio\" name=\"" + name + "\" value=\"" + value + "\""+ checked + "/>";
  return label + button + "</br>";
}
