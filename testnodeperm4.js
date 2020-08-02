
var http = require('http');
var fs = require('fs');
var url = require('url');
var th = require('./scripts/templatehandler.js')
var con=0;
//var testo = "";

const count1 = (str) => {
	str +="";
  const re = /\n/g
  //return ((str || '').match(re) || []).length
  return str.match(re) ? str.match(re).length : 0;
}

http.createServer(function (req, res) {
	var ur = url.parse(req.url, true);
	
	var ntot;
	
	/*var pathscomunes = ["/","/testdata.js","/testdata1.js","/styles/style.css","/favicon.ico","/pepito.html"];
	
		if (pathscomunes.indexOf(req.url) == -1 ) */
	
	var ipcli = req.connection.remoteAddress;
	
	//console.log("averesto " + req.method + "\n");
	


		
//	if (req.method == 'POST')
	req.on('data', (data) => {
		
			//console.dir(data);
			//console.log("<<<<<<" + data.toString().substring(6,data.length));//
			console.log("data" + ` ${req.method}, ${data} , ${ipcli}, ${Date()} \n `)
			res.writeHead(200, {'Content-Type': 'text/html'});
			//res.end(***PONERACA);
				
			fs.appendFile('ondata.txt', ` ${req.method}, ${data} ,  ${ipcli}, ${Date()} \n ` , function(err){
				if(err) throw err;	
				
			});
	});
	
	fs.readFile('log.txt',  (err, data) => {
		//console.log("cuenta:"+count1(data));
		ntot = count1(data);
	});
	
	
	
	if (ur.query.test  ) {
		if  (ur.query.test.search(/[^a-zA-Z0-9 ?¿.,!¡]+/i) == -1){
		//if  (ur.query.test.search(/"|'/) == -1){
			
			var up = "pepe.push(\"" + ur.query.test + "\");\n";
			console.log(up);
			fs.appendFile('testdata.js', up, function (err) {
			if (err) throw err;
			console.log('Updated!');
			});
		} else {
			console.log("caracteres invalidos");
		}
	}
		
		
	setTimeout(function(){
		
		var palog = `${ntot}, ${con++}, ${ur.pathname}, ${ipcli}, ${Date()} \n ` 
		console.log(palog);
		fs.appendFile('log.txt', palog, function(err){
			if(err) throw err;
			//console.log("loguiado");
			});
		
		switch(ur.pathname){
		
		case "/":
			fs.readFile('testperm1.html', function(err, data) {
				
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				
				res.end(data);
			});
			break;
		
		case "/pepito.html":
			fs.readFile('batateishon.html', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
			break;
			
		case "/styles/style.css":
		
			fs.readFile('styles/style.css', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.end(data);
			});
			break;
			
		case "/testdata.js":
			fs.readFile('testdata.js', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/javascript'});
				res.write(data);
				res.end();
			});
			break;
			
		case "/testdata1.js":
			fs.readFile('testdata1.js', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/javascript'});
				res.end(data);
			});
			break;
		
		case "/testform.html":
			fs.readFile('testform.html', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
			break;
		
		
		case "/template.html":
			res.writeHead(200, {'Content-Type': 'text/html'});
			console.log("%%%%%user:" + ur.query.user);
			fs.appendFile('usersbuscados.txt', ` ${ur.query.user},  ${ipcli}, ${Date()} \n ` , function(err){
				if(err) throw err;	
				
			});
			fs.readFile('db1.json', function(err, data) {
				var encontrado = false;
				var arr = JSON.parse(data).datos;
				for (var e of arr) {
					//console.log(`${e.id} // ${e.id == ur.query.user}`)
					if (e.id == ur.query.user) {
						//console.log("\\\itemdelarray" + e);
						res.end(th.createFromTemplate(e));
						encontrado = true;
					}
				}
				
				if (!encontrado) res.end(th.createFromTemplate({}));
				
			});
				
			
		break;
		
		
		case "/favicon.ico":
		break;
		
		case "/images/logo.jpg":
			fs.readFile('images/logo.jpg', function(err, data) {
				if (err) console.log(err);
				console.log("entroimagen");
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.end(data);
			});

		break;
		
			
		default:
		
			var l = ur.pathname.length;
			if (ur.pathname.substring(l-3,l) =="jpg") loadImage(res, ur.pathname);
			else {
				res.end("acanuainadamasqueelvacioexistencial");
				fs.appendFile('urlsraras.txt', ` ${req.url} , ${Date()} \n ` , function(err){
					if(err) throw err;	
					console.log(">>>>>>>>>urlbizarra: " + req.url)
				});
			}
		break;
			/*
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
			*/
		}
	},100)
  
}).listen(80);


function loadImage(res, path){
	if(path.substring(1,7)== "images")
		fs.readFile(path.substring(1,path.length), function(err, data) {
				if (err) console.log(err);
				//console.log("entroimagen");
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.end(data);
		});
	else console.log("asino");
}

// function createFromTemplate(ob)


