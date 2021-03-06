/**
*	STREAMS
*
*	Streams allow data to flow through them. The two most common types of Streams are
*	readable and writeable.
*
*	In http server, the 'request' is a readable stream and 'response' is a writeable 
* 	stream. We read data from the 'request' and write data to the 'response'.
*
*	Readable streams inherit from EventEmitter. This means the request object can
*	communicate with other objects by firing events.
*
*	Request specifically fires 'readable' and 'end' events.
*
*	Documentation for Streams: https://nodejs.org/api/stream.html
*
*	Notice it has 'Stability: 2 = Unstable'.
*/

var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200);
	request.on('readable', function(){
		var chunk = request.read();
		while(chunk !== null){
			console.log('data');
			response.write(chunk);
			chunk += request.read();
		};
	});
	request.on('end', function(){
		response.end();
	});
});

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});

