//Declaración de variables
var nombreUsuario = "Pablo";
var saldoCuenta = 5350;
var limiteExtraccion = 1000;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var password = 1234;
var contador = 4;

iniciarSesion();

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
cargarNombreEnPantalla();
contarServiciosSinPagar();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	var nuevoLimite = prompt('Ingresar nuevo limite de extraccion: ');
	if(esNumeroPositivo(nuevoLimite)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}
	limiteExtraccion = parseInt(nuevoLimite);
	actualizarLimiteEnPantalla();
	alert('El nuevo limite de extraccion es: ' + limiteExtraccion);
}

function extraerDinero() {
	var extraccion = prompt('Ingresar monto a extraer: ');
	if(esNumeroPositivo(extraccion)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}
	if(haySaldo(extraccion)) {
		if(verLimiteExtraccion(extraccion)) {
			if(esMultiplo100(extraccion)) {
				var saldoAnterior = saldoCuenta;
				restarDinero(extraccion);
				alert('Has retirado: $' + extraccion + '\n' + 'Saldo anterior: $' + saldoAnterior + '\n' + 'Saldo actual: $' + saldoCuenta);
			} else {
				alert('Solo podemos entregar billetes de $100, el monto a extraer debe ser múltiplo de $100');
			}			
		} else {
			alert('No puede extraer $' + extraccion + ' ya que su disponible para extracción es de $' + limiteExtraccion);
		}		
	} else {
		alert('No puede extraer $' + extraccion + ' ya que su saldo es $' + saldoCuenta);		
	}	
}

function depositarDinero() {
	var deposito = prompt('Ingresar monto a depositar: ');
	if(esNumeroPositivo(deposito)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}
	var saldoAnterior = saldoCuenta;
	sumarDinero(deposito);
	alert('Has depositado: $' + deposito + '\n' + 'Saldo anterior: $' + saldoAnterior + '\n' + 'Saldo actual: $' + saldoCuenta);
}

function pagarServicio() {
	var seleccion = prompt('Ingrese el número  que corresponda con el servicio que queres pagar \n 1 - Agua \n 2 - Luz \n 3 - Internet \n 4 - Teléfono');
	switch(seleccion) {
		case '1': haySaldo(agua) ? pagarServ('agua', agua) : alertaSinSaldo(); break;
		case '2': haySaldo(luz) ? pagarServ('luz', luz) : alertaSinSaldo(); break;
		case '3': haySaldo(internet) ? pagarServ('internet', internet) : alertaSinSaldo(); break;
		case '4': haySaldo(telefono) ? pagarServ('telefono', telefono) : alertaSinSaldo(); break;
		default: alert('No existe ningun servicio para su seleccion');
	}
}

function transferirDinero() {
	var monto = prompt('Ingresar el monto a transferir');
	if(esNumeroPositivo(monto)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}

	if(haySaldo(monto)) {
		var nroCuenta = prompt('¿A que número de cuenta desea transferir?');
		if(parseInt(nroCuenta) === cuentaAmiga1 || parseInt(nroCuenta) === cuentaAmiga2) {
			restarDinero(monto);
			alert('Se han transferido $' + monto + '\n' + 'Cuenta destino: ' + nroCuenta);
		} else {
			alert('No puede realizar una transferencia si no es una cuenta amiga');	
			return;
		}		
	} else {
		alertaSinSaldo();	
	}

}

function iniciarSesion() {
	var passIngresado = prompt('Ingrese su clave de indentificacion');
	if(passIngresado == password) {
		alert('Bienvenido ' + nombreUsuario + ', ya podes comenzar a realizar operaciones');
	} else {
		saldoCuenta = 0;
		alert('Codigo incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad');
	}
}

function sumarDinero($importe) {
	if(esNumeroPositivo($importe)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}
	saldoCuenta += parseInt($importe);
	actualizarSaldoEnPantalla();
}

function restarDinero($importe) {
	if(esNumeroPositivo($importe)) {
		alert('No ha ingresado un numero o el numero es negativo');
		return;
	}
	saldoCuenta -= parseInt($importe);
	actualizarSaldoEnPantalla();
}

function esMultiplo100($importe) {
	return $importe%100 === 0 ? true : false;
}

function verLimiteExtraccion($importe) {
	return $importe <= limiteExtraccion ? true : false;
}

function haySaldo($importe) {
	return $importe <= saldoCuenta ? true : false;
}

function alertaSinSaldo() {
	alert('No hay saldo suficiente para pagar ese monto');
}

function esNumeroPositivo($importe) {
	return isNaN(parseInt($importe)) || $importe<0;
}

function pagarServ($servicio, $monto) {	
	var saldoAnterior = saldoCuenta;

	switch($servicio) {
		case 'agua': {
			if(agua) {
				restarDinero($monto); 
				agua = 0;
				contador--;
			} else {
				alert('El servicio Agua ya fue abonado!');
				return;
			}
			break;
		}
		case 'telefono': {
			if(telefono) {
				restarDinero($monto); 
				telefono = 0;
				contador--;
			} else {
				alert('El servicio Telefono ya fue abonado!');
				return;
			}			
			break;
		}
		case 'luz': {
			if(luz) {
				restarDinero($monto); 
				luz = 0;
				contador--;
			} else {
				alert('El servicio Luz ya fue abonado!');
				return;
			}			
			break;
		}
		case 'internet': {
			if(internet) {
				restarDinero($monto); 
				internet = 0;
				contador--;
			} else {
				alert('El servicio Internet ya fue abonado!');
				return;
			}			
			break;
		}
		default: $monto = 0 ; return;
	}
	contarServiciosSinPagar();
	alert('Has pagado el servicio ' + $servicio + '\n' + 'Saldo anterior: ' + saldoAnterior + '\n' + 'Dinero descontado: ' + $monto + '\n' + 'Saldo actual: ' + saldoCuenta );

}

function contarServiciosSinPagar() {
	document.querySelector('#cantServiciosSinPagar').innerHTML = contador;
	if(!contador) {
		document.querySelector('#cantServiciosSinPagar').className = 'cantServiciosSinPagar sinDeuda';
	}
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

