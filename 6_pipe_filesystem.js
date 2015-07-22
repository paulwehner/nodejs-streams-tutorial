/**
*	PIPE - Write to disk
*/

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	var outputFile = fs.createWriteStream('output');
	request.pipe(outputFile);
	request.on('end', function(){
		response.end('Uploaded File');
	});
});

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});

