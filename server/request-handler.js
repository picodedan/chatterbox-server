/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var body = [];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //console.log(body);
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // setup method type filerting of requests
  //if not correct URL
  if (request.url.includes('/classes/messages')) {
    //respond with 404! 

    //if GET
    if (request.method === 'GET') {
      //return data previously stored
      response.writeHead(200, headers);
      response.end(JSON.stringify({
        results: body
      }));
    //if POST
    } else if (request.method === 'POST') {
       //return success and store data
      request.on('data', (chunk) => {
        body.push(JSON.parse(chunk));
      });
      response.writeHead(201, headers);
      response.end();
    } else if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
   


  // The outgoing status.
  //var statusCode = 200;

  // See the note below about CORS headers.
  

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(200, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //response.write(JSON.stringify(body));
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client
};
    
  


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


//export handle reques
module.exports.requestHandler = requestHandler;
module.exports.body = body;
