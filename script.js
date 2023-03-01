contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
 
function start(e) {
	        console.log("inicia arrastre");
			e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
			e.dataTransfer.setData("Data", e.target.id); // Toma el elemento que se va a mover
			e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
			e.target.style.opacity = '0.4'; 
		}

		function end(e){
            console.log("termina arrastre");
			e.target.style.opacity = ''; // Pone la opacidad del elemento a 1 			
			e.dataTransfer.clearData("Data");
		}

		function enter(e) {
			console.log("entrar a area de soldato");
			e.target.style.border = '3px dotted #555'; 
		}

		function leave(e) {
			console.log("salir de area de soltado");			
			e.target.style.border = ''; 
		}

		function over(e) {
			
			console.log("elemento encima");
			
			var id = e.target.id; // Elemento sobre el que se arrastra
			
			// return false para que se pueda soltar
			if (id == 'cuadro1'){
				return false; // Cualquier elemento se puede soltar sobre el div destino 1
			}

			if (id == 'cuadro3')
				return false;
	
			if (id == 'papelera')
				return false; // Cualquier elemento se puede soltar en la papelera

			if (id == 'cuadro2') 
			    return false;
		
			 
				
		}

    
		/**
		* 
		* Mueve el elemento
		*
		**/
		function drop(e){
			var elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
			console.log("en drop ---->*"+elementoArrastrado+"*");	
			console.log("en drop ---->*"+e.target.id+"*");

            // En el cuadro2 el elemento 3 no se puede soltar cualquier otra combinacion si es posible soltarla
		
			if (!((e.target.id=="cuadro2") && (elementoArrastrado == 'arrastrable3') || ((e.target.id=="cuadro2") && (elementoArrastrado == 'arrastrable4')))){
				console.log("elemento soltado");
			
				e.target.appendChild(document.getElementById(elementoArrastrado));
			    e.target.style.border = '';  // Quita el borde
			
				/*Inicia ... programacion utilizando la libreria jquery para obtener las coordenadas exactas
				del cursor y realizar en esa posicion el soltado*/

						tamContX = $('#'+e.target.id).width();
						tamContY = $('#'+e.target.id).height();

						
						console.log("e.target.id="+e.target.id);
						console.log("tamContX="+getComputedStyle(document.getElementById(e.target.id)).width);
						console.log("tamContX="+tamContX+" tamContY="+tamContY);
						
						tamElemX = $('#'+elementoArrastrado).width();
						tamElemY = $('#'+elementoArrastrado).height();
				
						
						posXCont = $('#'+e.target.id).position().left;
						posYCont = $('#'+e.target.id).position().top;

						// Posicion absoluta del raton
						x = e.layerX;
						y = e.layerY;

						// Si parte del elemento que se quiere mover se queda fuera se cambia las coordenadas para que no sea asi
						if (posXCont + tamContX <= x + tamElemX){
							x = posXCont + tamContX - tamElemX;
						}

						if (posYCont + tamContY <= y + tamElemY){
							y = posYCont + tamContY - tamElemY;
						}

						document.getElementById(elementoArrastrado).style.left = x + "px";
						document.getElementById(elementoArrastrado).style.top = y + "px";

	        /*Termina en la linea de arriba ... programacion utilizando la libreria jquery para obtener las coordenadas exactas
			  del cursor y realizar en esa posicion el soltado*/
			            document.getElementById(elementoArrastrado).style.position = "absolute";

						alert("Felicidades")
						console.log("Intento exitoso")
		 }//FIN DEL IF CONDICIONALES
		 else{
			console.log("LO HICISTE MAL PENDEJO");
			alert("LO HICISTE MAL PENDEJO");
		 }
		}

		
		/**
		* 
		* Elimina el elemento que se mueve
		*
		**/
		function eliminar(e){
			var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado
			elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
			e.target.style.border = '';   // Quita el borde
		}

		/**
		* 
		* Clona el elemento que se mueve
		*
		**/
		function clonar(e){
			var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado

			elementoArrastrado.style.opacity = ''; // Dejamos la opacidad a su estado anterior para copiar el elemento igual que era antes

			var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
			elementoClonado.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
			contador += 1;	
			elementoClonado.style.position = "static";	// Se posiciona de forma "normal" (Sino habria que cambiar las coordenadas de la posición)	
			e.target.appendChild(elementoClonado); // Se añade el elemento clonado
			e.target.style.border = '';   // Quita el borde del "cuadro clonador"
		}