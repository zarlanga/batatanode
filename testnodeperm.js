var http = require('http');
var fs = require('fs');
var url = require('url');

var con=0;
var testo = "";
http.createServer(function (req, res) {
  
  var test = url.parse(req.url, true).query.test;
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
    testo += "<script>"
	testo += data;
	
  });
  fs.readFile('testdata1.js', function(err, data) {
    
	testo += data;
	testo += "</script>"
    testo += "</body>";
//	res.write(testo);
	console.log(con++);
    return res.end(testo);
    
  });
  testo="";
  
}).listen(80);