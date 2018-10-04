exports.NewsService = function(){
  //Entry points: Designed with eventual API functionality in mind.
  //Calls the updateXml function with necessary info and the desired functionality
  var utils = require("./ns_utils.js");

  //R1: The ability to write a new news story to the persistent store
  this.createNews = function(title, author, date, pub, content){
    var message = [title, author, date, pub, content];
    utils.updateXml(message, utils.addXML);
  }

  //R2: The ability to update the headline of an existing news story
  this.updateHeadline = function(head, newHead){
    var message = [head, newHead];
    utils.updateXml(message, utils.modTitleXML);
  }

  //R3: The ability to change the content of an existing news story
  this.updateNews = function(title, author, date, pub, content){
    var message = [title, author, date, pub, content];
    utils.updateXml(message, utils.modXML);
  }

  //R4: The ability to delete an existing news story
  this.deleteNews = function(head){
    utils.updateXml(head, utils.deleteXML)
  }

  //R5: The ability to return a collection of NewsStory objects based on a filter
  //more filters available than asked for to allow for A3 reqs
  //filters are applied unless null
  this.getNews = function(title, author, dateStart, dateEnd, pub){
    var message = [title, author, dateStart, dateEnd, pub];
    return utils.readXml(message, utils.getXML);
  }
}
