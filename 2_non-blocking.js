/**
*	NON-BLOCKING
*
*	NodeJS was built from the ground-up to be non-blocking. This is especially important
*	for todays web and mobile applications which increasingly expect real-time interaction.
*
*	To see this in action, what do you think will happen when two subsequent requests hit our
*	server? Will it responsd to the first request, wait 5 seconds, and then respond to the second?
*	Or will it respond to the second request immediately, while its still processing the first?
*/

var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200);
	response.write('Hello World');
	setTimeout(function(){
		response.write('\nI made you wait 5 seconds.');
		response.end();
	}, 5000);
	response.end();
}););

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});