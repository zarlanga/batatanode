exports.createFromTemplate= (ob) => {
	//crear un objeto default y llamarlo abajo
	var pres = "aca va la presentacion ";
	if (!ob.id) ob = {"id":"default", 
					"nombre": "defaulte defaultez", 
					"presentacion":"default default default", 
					"items":[{"urlfoto":"mas default.jpg",
							 "testo":"default default default"
							},{"urlfoto":"default.jpg",
							 "testo":"adivina que? siiiii, default"
							}]		
					};
	for (let i = 0; i<4; i++) ob.presentacion += ob.presentacion ;
	
	//ob= {nombre:"sasa", logo:"images/test.jpg", presentacion: pres, imgback:"images/backtest.jpg"}; 
	//console.log(ob.imgback);
	
//	var testo1 = `<div class="contitem"> <div class="item"> ${i} </div><div class="itemtxt"> texto texto texto texto texto texto texto texto texto texto </div></div>`

	var testo = `<!DOCTYPE html>
<html>
<head>
	<title> Batateishon </title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style> 
	body {
		text-align:center;
	}
	#portadaimg {
		width:20vw;
		height: 20vw;
		background-color:purple;
		font-size:2em;
		margin:5vw 0 10vw;
		padding:2vw;
		border-radius:20px;
		display:inline-block;
		color:white;
		
	}
	#portadatxt {
		width:80vw;
		
		background-color:#148F77;
		opacity:0.8;
		display:inline-block;
		padding:10px;
		border-radius:15px;
	}
	
	#backgimg {
		position:fixed;
		top:0;
		left:0;
		background-color:cyan;
		width:100vw;
		height:100vh;
		z-index:-4;
		border: 4px solid red;
	}
	
	input {
		margin:2vh 0 0;
	}
	
	#container {
		border-radius:30px;
		width:90vw;
		margin:2vw 0 0 ;
		display:inline-block;
		background-color: white;
		
	}
	.contitem {
		border-radius:15px;
		display:inline-block;
		margin:5vh;
		padding:5vh;
		width:30vw;
		heigth:70vh;
		background-color:green;
		text-align:center;
	}
	.item {
		padding:3vh;
		width:25vw;
		height:25vw;
		background-color:silver;
		display:inline-block;
	}
	.itemtxt{
		margin-top:2vw;
		width:30vw;
		
		
	}
	form{
		padding:3vw;
		width:80vw;
		margin:2vw;
		border-radius:5px;
		background-color:#6EDAC5;
		display:inline-block;
	}
	[type=textarea] {
	text-align:center;
		width:80%;
		height:400px;
		background-color:#0cc;
	}
	#nombre{
		margin-bottom:10px;
		font-size:2.3em;
	}
	</style>
	
</head>
<body>
<header><img id="portadaimg" src="${ob.logo ? ob.logo : "images/logo.jpg" }" alt="una foto"></img> 
	<br>
	${ob.id == "default" ? '<button id="crear usuario" onclick="crearUsuario()"> CREAR USUARIO</button><br><br>' : ""}

<div id="nombre">${ob.nombre}</div>
<div id="portadatxt">${ob.presentacion ? ob.presentacion : "_.-.-.-.-.klñkj"}</div>
<img id="backgimg" src="${ob.imgback ? ob.imgback : ""} " ></img>
<br>
<!-- <input type="number" onchange="mozaicos(this.value)"></input> aca metemos el boton de crear publicacion?-->

<div id="container"> </div>


</header>

<form>
<input type="text" placeholder="Direccion de Email"/>
<input type="textarea" placeholder="aca que te puedan mandar un mail y que sea lo que dios quiera"></input>
<br>
<input type="submit"></input>
</form>


<script>
	//???????????????????????????????????? ob.items era objeto en vez de array, parsear como se pueda devuelve un array pero sin corchetes asique se los puse a mano wtfwtfwtf? creo que java no me va a hacer feliz
	var items = [${parsearcomosepueda(ob.items)}]; //items = ob.items.map( (e) => JSON.stringify(e)); 
	function mozaicos(n) {
		var testo1 = "";
		for(let i = 0; i<n;i++){
				//aca los bichos internos
			testo1 += "<div class='contitem'> <div class='item'>\" + (items[i].urlfoto ? items[i].urlfoto : ('items' + i )) + \"</div><div class='itemtxt'>\" + (items[i].testo ?  items[i].testo : \"texto texto texto texto texto texto texto texto texto texto\") + \" </div></div>";
			//console.log(testo1);
			document.getElementById("container").innerHTML = testo1;
		}
	}
	
	function crearUsuario(){
		var str = prompt("elija ID, solo letras y numeros");
		if (str.search(/[^a-zA-Z0-9]/) != -1) console.log("invalido");
			else console.log("valido");
		
	}
	
	mozaicos(items.length);
	
	
</script>
</body>	
</html>`;

return testo;
}


function parsearcomosepueda(arr) {
	//console.log("arr" + arr);
	var t = [];
	for (var e of arr){
		t.push( JSON.stringify(e));
	}
	return t;
}