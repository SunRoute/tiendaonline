import {validador} from './validador.js';

export let renderFormulario = () => {

    let botonEnvio = document.querySelector('.boton-envio');
    let formulario = document.getElementById('formulario');

    if (botonEnvio) {

        botonEnvio.addEventListener('click', event => {

            event.preventDefault();
    
            if(!validador(formulario.elements)) {
                return;
                
            } 
                
            document.dispatchEvent(new CustomEvent('mensaje', {
                detail: {
                    text: 'Formulario enviado correctamente',
                    type: 'exito'
                }
            }));
             
        });
    }

}