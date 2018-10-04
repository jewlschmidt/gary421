# Activity 1

HTTP/2, or HyperText Transfer Protocol 2, is a revision to the original HTTP, and was developed by the HTTP working group httpbis of the Internet Engineering Task force. The group wanted to allow continued support of HTTP1.1 while allowing for decreased latency, increased negotiation capabilities, and better support for newer common application of HTTP. Data is able to be sent in multiple packets by the server without having to wait for additional requests from the client.  HTTP/2 is used by 30.2% of all websites.

HTTPS, HyperText Transfer Protocol Secure, is an extension to HTTP aimed at increased security. Initially, data was encrypted using SSL, or Secure Sockets Layer, but it is now more commonly encrypted using TLS (Transport Layer Security). Original uses for HTTPS included web payments and transfer of sensitive information, but use has grown to protect page authenticity and keep user identity and browsing private. HTTPS is used by 40.7% of all websites.  

HTTP Strict Transport Security is a mechanism that allows websites to require clients to use only secure HTTPS connections to protect against malicious user or information theft. It specifies a period of time during which a user is allowed to interact with the web service in a secure fashion. Even when using Strict Transport Security, websites can choose to allow clients to interact in a non-secure fashion. HTTPS is used on 8.2% of all websites.   

From: https://w3techs.com/technologies/details/ce-cookies/all/all
https://w3techs.com/technologies/details/ce-compression/all/all

47.4% of websites use cookies, and 76.4% of websites use compression. I arrived at these answers through research.

# NewsService.js (Activity 2)

There are 4 files involved in Activity 2: `NewsService.js`, `news.xml`, `ns_utils.js`, and `test.js`.  
`NewsService.js` acts as a controller, and uses the methods in `ns_utils.js` for functionality.
Activity 2 can be tested by modifying the sample test cases in `test.js` and printing them to the console.

`createNews(title, author, date, pub, content)`: creates a new XML representation based on passed-in fields, and returns undefined.  

`updateHeadline(head, newHead)`: updates the headline of an article within the XML store, or does nothing at all of the article does not exist. It will return undefined.    

`updateNews(title, author, date, pub, content)`: updates the information in an article in the xml store or does nothing at all if the article does not exist. It will return undefined.    

`deleteNews(head)`: deletes an article within the xml store or does nothing at all if the article does not exist, then returns undefined.  

`getNews(title, author, dateStart, dateEnd, pub)`:   
searches for and returns a domxml `doc` object representative of the news articles that meet the given filters.

# activity3.js
There are 4 files involved in Activity 3: `activity3.js` and the three files within the `activity3_utils` folder (`api_utils.js`, `html_utils.js`, and `xml_utils.js`).

`activity3.js` holds routing logic to determine location and cookie status (with the help of `api_utils.js`), and controls request and response handling.

`html_utils.js` holds multiple html templates and builder methods to create pages.

`xml_utils.js` holds methods for parsing and manipulating xml.

Vising localhost:3000 with cookies and redirects enabled will bring up the login page.
