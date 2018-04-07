
var Calculadora=(function(){
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
	sign = Elementos("#sign"),
	tecla = Elementos(".tecla"),
	NewNum = "",
	OldNum = "",
	Reslutado,
	tRes,
	tmRes,
	Opr;

	//Efecto de presionado
	var EfectoDown = function()
	{
		this.style.padding="4px";
	};
	
	var EfectoUp = function()
	{
		this.style.padding="0px";
	};
	//capturar el Numero al hacer clic en el
	var CargaNum = function()
	{
		if(NewNum.length>=0 && NewNum.length<=8)
		{
			if(NewNum.length==0)
			{
				if(this.getAttribute("id")>0 || this.getAttribute("id")=='.')
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
				}
			}
			else
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
			}
		}
	};

	//Mover el Numero cuando se Presione el Operador
	var moveNum = function()
	{
	    OldNum = NewNum;
	    NewNum = "";
	    Opr = this.getAttribute("id");
		igual.setAttribute("id", "");
	};

	//Cambio de Signo
	var negativo = function() {

		Reslutado = NewNum * -1;

		display.innerHTML = Reslutado;
		igual.setAttribute("data-res", Reslutado);

		NewNum = Reslutado;
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
				display.innerHTML = Reslutado;
				OldNum = 0;
				NewNum = 0;
			}
			else
			{
				//Reslutado = "Err";
				Reslutado = "Err Div / 0";
				display.innerHTML = Reslutado;
				OldNum = 0;
				NewNum = 0;
			}
		}
		else
		{
			if(Reslutado>99999999)
			{
				Reslutado = "Err-Max";
				display.innerHTML = Reslutado;
				OldNum = 0;
				NewNum = 0;
			}
			else
			{
				tRes=Reslutado.toString();
				if(tRes.length<=8)
				{
					display.innerHTML = Reslutado;
					igual.setAttribute("data-res", Reslutado);
					OldNum = 0;
					NewNum = Reslutado;
				}
				else
				{
					tmRes='';
					for (i = 0; i < 8; i++)
					{
						tmRes = tmRes + tRes.charAt(i);
					}
					Reslutado=parseFloat(tmRes);
					display.innerHTML = Reslutado;
					igual.setAttribute("data-res", Reslutado);
					OldNum = 0;
					NewNum = Reslutado;
				}
			}
		}
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

 	//evento al hacer clics
 	for (var i = 0, l = tecla.length; i < l; i++)
	{
		tecla[i].onmousedown = EfectoDown;
		tecla[i].onmousemove = EfectoUp;
	}
 	// Evento Click a los Operadores
	for (var i = 0, l = operador.length; i < l; i++)
	{
		operador[i].onclick = moveNum;
	}

	//Signo Negativo
	sign.onclick = negativo;

	// Evento al Boton =
	igual.onclick = displayNum;

	//Elementos del Boton de Borrado
	Elementos("#on").onclick = BorradoGral;

}());