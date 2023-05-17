import {valida} from './validaciones.js';

const inputs = document.querySelectorAll('input'); //nos retorna un arreglo de todos los input

inputs.forEach( input => {
	input.addEventListener('blur', (input) =>{ //le agregar a los input, el evento que se activa al perder el focus
		valida(input.target);
	})
})