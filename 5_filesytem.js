/**
*	FILESYSTEM
*
*	Documentation for fs: https://nodejs.org/api/fs.html
*
*	Documentation for reading form data: http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/
*/

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer(function(request, response){
	response.writeHead(200);
	if(request.method === 'GET'){
		fs.createReadStream('index.html').pipe(response);		
	}
	else if(request.method === 'POST'){
		var fullBody = '';	    
	    request.on('data', function(chunk) {
	     	fullBody += chunk.toString();
	    });
	    
	    request.on('end', function() {
		    response.write(querystring.parse(fullBody).text);		      
		    response.end();
	    });
	}

});

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});
