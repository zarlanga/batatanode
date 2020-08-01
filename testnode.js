var http = require('http');

var testo = "<script> for(var i = 0; i<5;i++) document.write('hello world' + i + '<br>')</script>";

var testo1 = "hello world!!";
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(testo);
}).listen(8080);