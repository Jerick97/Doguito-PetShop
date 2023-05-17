/*const inputNacimiento = document.querySelector('[date-form-input]');

inputNacimiento.addEventListener('blur', (evento)=>{
	validarNacimiento(evento.target);
})*/

export function valida(input){
	const tipoDeInput = input.dataset.tipo; //obtener el tipo del Input
	if(validadores[tipoDeInput]){
		validadores[tipoDeInput](input);
	}
}

const validadores = {
	nacimiento: input => validarNacimiento(input);
}

function validarNacimiento(input){
	const fechaCliente = new Date(input.value);
	let mensaje = '';

	if(!mayorDeEdad(fechaCliente)){
		mensaje = "Debes tener al menos 18 años de edad";
	}

	input.setCustomValidity(mensaje); //permite personalizar el mensaje de validación
}

function mayorDeEdad(fecha){
	const fechaActual = new Date();
	const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
	return diferenciaFecha <= fechaActual; //si es mayor de edad retorna true
}