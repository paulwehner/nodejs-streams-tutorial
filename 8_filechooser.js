/**
*	PROGRESS BAR - File CHOOSER
*/

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
    response.setHeader('Content-Type', 'text/html; charset=UTF-8');
	response.writeHead(200);

	if(request.method === 'GET'){
		fs.createReadStream('filechooser.html').pipe(response);		
	}
	else if(request.method === 'POST'){
		var outputFile = fs.createWriteStream('UPLOADED_FILE');
		var total = request.headers['content-length'];
		var progress = 0;

		response.write('STARTING UPLOAD');
		console.log('\nSTARTING UPLOAD\n');

		request.on('data', function(chunk){
		    fakeNetworkLatency(function() {
		    	outputFile.write(chunk);
				progress += chunk.length;
				var perc = parseInt((progress/total)*100);
				console.log('percent complete: '+perc+'%\n');
				response.write('<p>percent complete: '+perc+'%');
			});
		});

//		request.pipe(outputFile); //could use this instead of manually writing to stream.

		request.on('end', function(){
		    fakeNetworkLatency(function() {
		    	outputFile.end();
				response.end('<p>FILE UPLOADED!');
				console.log('FILE UPLOADED\n');
		    });
		});
	}

});

server.listen(8080, function(){
	console.log('Server is listening on 8080');
});

var delay = 100; //delay of 100 ms per chunk
var count =0;
var fakeNetworkLatency = function(callback){
    setTimeout(function() {
    	callback();
    }, delay*count++);
};