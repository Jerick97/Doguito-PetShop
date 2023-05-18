/*const inputNacimiento = document.querySelector('[date-form-input]');

inputNacimiento.addEventListener('blur', (evento)=>{
	validarNacimiento(evento.target);
})*/

export function valida(input){
	const tipoDeInput = input.dataset.tipo; //obtener el tipo del Input

	if(validadores[tipoDeInput]){
		validadores[tipoDeInput](input);
	}

	if(input.validity.valid){
		input.parentElement.classList.remove('input-container--invalid');
		input.parentElement.querySelector(".input-message-error").innerHTML = '';
	}else{
		input.parentElement.classList.add('input-container--invalid');
		input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
	}
}

const tipoDeErrores = [
	'valueMissing',
	'typeMismatch',
	'patternMismatch',
	'customError',
	];

const mensajeDeError = {
	nombre: {
		valueMissing: 'El campo Nombre no puede estar vacio'
	},
	email : {
		valueMissing: 'El campo Correo no puede estar vacio',
		typeMismatch: 'El correo no es válido'
	},
	password: {
		valueMissing: 'El campo Contraseña no puede estar vacio',
		patternMismatch: 'Al menos 8 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales'
	},
	nacimiento: {
		valueMissing: 'El campo Nacimiento no puede estar vacio',
		customError: 'Debes tener al menos 18 años de edad',
	},
	phone: {
		valueMissing: 'El campo Telefono no puede estar vacio',
		patternMismatch: 'El Formato requerido es 9xxxxxxxx , 9 digitos',
	},
	direccion: {
		valueMissing: 'El campo Direccion no puede estar vacio',
		patternMismatch: 'El Direccion debe contener entre 6 a 40 caracteres',
	},
	ciudad: {
		valueMissing: 'El campo Ciudad no puede estar vacio',
		patternMismatch: 'El Ciudad debe contener entre 4 a 30 caracteres',
	},
	estado: {
		valueMissing: 'El campo Estado no puede estar vacio',
		patternMismatch: 'El Estado debe contener entre 4 a 30 caracteres',
	}
}

const validadores = {
	nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput , input){
	let mensaje = '';
	let encontrado = false; //Bandera

	tipoDeErrores.forEach( (error) => {
		if(input.validity[error] && !encontrado){ //Verificar si ya se ha encontrado un mensaje de error. Si es así, puedes omitir la asignación del nuevo mensaje de error.
			/*console.log(tipoDeInput, error);
			console.log(input.validity[error]);
			console.log(mensajeDeError[tipoDeInput][error]);*/
			mensaje = mensajeDeError[tipoDeInput][error];
			encontrado = true;
		}
	})

	return mensaje;
}

function validarNacimiento(input) {
  let mensaje = '';

  if (input.validity.valueMissing) {
    input.setCustomValidity(''); // Restablecer el estado de error
    mensaje = 'El campo Nacimiento no puede estar vacío';
  } else if (!mayorDeEdad(new Date(input.value))) {
    input.setCustomValidity(''); // Restablecer el estado de error
    mensaje = "Debes tener al menos 18 años de edad";
  } else {
    input.setCustomValidity(''); // No hay errores personalizados, restablecer el estado de error
  }

  input.setCustomValidity(mensaje); // Establecer el mensaje de error personalizado
}

function mayorDeEdad(fecha){
	const fechaActual = new Date();
	const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
	return diferenciaFecha <= fechaActual; //si es mayor de edad retorna true
}