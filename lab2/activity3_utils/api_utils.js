exports.login_check = function(req){
  var cookie = require('cookie');
  var client;
  //modded from node http module web proxy
  if (req.headers.cookie) {
      return cookie.parse(req.headers.cookie).info.split('+');
  }
  return undefined;
}
