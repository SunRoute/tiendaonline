import {validador} from './validador.js';


let botonEnvio = document.querySelector('.boton-envio');
let formulario = document.getElementById('formulario');
let formularioInputs = formulario.elements;

botonEnvio.addEventListener('click', event => {

    event.preventDefault();

    if(!validador(formularioInputs)){
        return;
    } 

});

if (botonEnvio) {

    botonEnvio.addEventListener('click', () => {
        
        let name = formularioInputs.value;
            
        if(name !=null) {
            // Podemos crear un evento personalizado con dispatchEvent y new CustomEvent que podrá ser escuchado 
            // por otros archivos js y utilizarlo para enviarles datos. 
            // En este caso, el evento se llamará "message" y enviará dos parámetros: "text" y "type".
            document.dispatchEvent(new CustomEvent('mensaje', {
                detail: {
                    text: 'Formulario enviado correctamente',
                    type: 'exito'
                }
            }));
        } else {
            document.dispatchEvent(new CustomEvent('mensaje', {
                detail: {
                    text: 'Por favor, rellene el formulario',
                    type: 'fallo'
                }
            }));
        }
    });
}