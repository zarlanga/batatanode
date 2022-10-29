
var http = require('http');
var fs = require('fs');
var url = require('url');

var con=0;
var testo = "";
http.createServer(function (req, res) {
	var ur = url.parse(req.url, true);
	console.log(ur.pathname);
	res.writeHead(200, {
        'Content-Type': 'text/html'
    });
	if (ur.pathname == "/pepito.html"){
		
		
		
		fs.readFile('testperm1.html', function(err, data) {
		//testo = data;
		res.writeHead(200, {'Content-Type': 'text/html'});
    	
		res.end(data);
    	});
		
		
		console.log(con++);
		testo="";  
		
	} else if (ur.pathname == "/styles/style.css"){
		fs.readFile('styles/style.css', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/css'});
		//res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.end(data);
		});
	}else {
		var test = ur.query.test;
		if (test) {
			var up = "pepe.push(\"" + test + "\");\n";
			console.log(up);
			fs.appendFile('testdata.js', up, function (err) {
			if (err) throw err;
			console.log('Updated!');
			});
		}

		fs.readFile('testperm.html', function(err, data) {
			testo += data;
		});
		
		fs.readFile('testdata.js', function(err, data) {
			if (err) throw err;
			testo += "<script>"
			testo += data;
			testo += "\n</script>\n";

		});
		
		setTimeout(function(){
			fs.readFile('testdata1.js', function(err, data) {
				testo += "<script>"
				testo += data;
				testo += "</script>"
				testo += "</body>";
				//	res.write(testo);
				console.log(con++);
			});
		},100);
		
		
		setTimeout(function(){ return res.end(testo);}, 200)
		testo="";
	}
  
}).listen(80);