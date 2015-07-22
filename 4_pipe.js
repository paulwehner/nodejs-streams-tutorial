/**
*	PIPE
*
*	'.pipe()' streams the output of a readable stream as input into a writeable stream.
*
*	It is similar to the command line: cat 'last.json' | prettyjson
*
*	Documentation for pipe: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
*	
*	Using pipe can protect your application from breaking changes to the Streams API vs
*	interacting with streams directly.
*/

var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200);
	request.pipe(response);
});

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});

