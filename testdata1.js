//
//document.getElementById("testscript").onload
function salebatata() {
			var txt = document.getElementById("inputt").value;
			console.log(txt);
			if(txt.search(/[^a-zA-Z0-9 ?¿.,!¡]+/i) == -1) {
			//if(txt.search(/"|'|>\</) == -1) {
				window.open('/?test='+ txt , '_self');
			} else {
				alert("solo letras puntos, comas y signos de exclamacion y pregunta, ahh, y ahi le pongo numeros");
			}
	}
	
if (window.location.href.indexOf("?") != -1) window.location.assign("/");

window.onload = function() {
	console.log("2");
		for (let i = pepe.length-1; i>=0; i--){
			document.getElementById("kk").innerHTML +=`<h3 class="mensajito"> ${i}) ${pepe[i]} </h3><br>`;
		}
	};

				
