(function(){
  	
	//Funcion para Acceso a elementos
  	var Elementos = function(elemento)
  	{
    	if (elemento.charAt(0) === "#")
    	{
     		return document.querySelector(elemento);
    	}
    	else
    	{
    		return document.querySelectorAll(elemento);
    	}
  	};

  	//Variables del Proceso
	var display = Elementos("#display"),
	igual = Elementos("#igual"),
	numero = Elementos(".numero"),
	operador = Elementos(".operador"),
	NewNum = "",
	OldNum = "",
	Reslutado,
	Opr;

	//capturar el Numero al hacer clic en el
	var CargaNum = function()
	{
		if (Reslutado)
		{
			NewNum = this.getAttribute("id");
			Reslutado = "";
		}
		else
		{
			NewNum += this.getAttribute("id");
		}

		display.innerHTML = NewNum;
	};

	//Mover el Numero cuando se Presione el Operador
	var moveNum = function()
	{
	    OldNum = NewNum;
	    NewNum = "";
	    Opr = this.getAttribute("data-op");
		igual.setAttribute("id", "");
	};

	//Cuando se de clic en el boton igual
	var displayNum = function() {
		OldNum = parseFloat(OldNum);
		NewNum = parseFloat(NewNum);

		switch (Opr) {
			case "mas":
			Reslutado = OldNum + NewNum;
			break;

			case "res":
			Reslutado = OldNum - NewNum;
			break;

			case "por":
			Reslutado = OldNum * NewNum;
			break;

			case "div":
			Reslutado = OldNum / NewNum;
			break;

			default:
			Reslutado = NewNum;
		}

		if (!isFinite(Reslutado))
		{
			if (isNaN(Reslutado))
			{
				Reslutado = "Err";
			}
			else
			{
				//Reslutado = "Err";
				Reslutado = "Err Div / 0";
			}
		}

		display.innerHTML = Reslutado;
		igual.setAttribute("data-res", Reslutado);

		OldNum = 0;
		NewNum = Reslutado;
	};

	//Para limpiar el Display
  	var BorradoGral = function() {
    	OldNum = "";
    	NewNum = "";
    	display.innerHTML = "0";
    	igual.setAttribute("data-res", Reslutado);
  	};

  	// Evento Click a los Numeros
  	for (var i = 0, l = numero.length; i < l; i++)
  	{
		numero[i].onclick = CargaNum;
 	}

 	// Evento Click a los Operadores
	for (var i = 0, l = operador.length; i < l; i++)
	{
		operador[i].onclick = moveNum;
	}

	// Evento al Boton =
	igual.onclick = displayNum;

	//Elementos del Boton de Borrado
	Elementos("#on").onclick = BorradoGral;

}());