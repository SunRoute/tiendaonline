import {validador} from './validador.js';

export let renderContactFormulario = () => {

    let botonEnvio= document.querySelector('.boton-envio');

    if (botonEnvio) {

        botonEnvio.addEventListener('click', event => {

            event.preventDefault();

            let formulario = document.getElementById('formulario-front');
            let formularioInputs = formulario.elements;
    
            validador(formularioInputs);

            // CAPTURA LOS DATOS
            let formData = new FormData(formulario);
            // LOS CONVIERTE EN UN OBJETO
            let formDataJson = Object.fromEntries(formData.entries());
            let url = formulario.action;

            // let formData = new FormData(form);
            // let formDataJson = Object.fromEntries(formData.entries());
            // let href = window.location.href;
            // let endpointSplit = href.split('/')
            // let endpoint = endpointSplit[endpointSplit.length - 1].split('.')[0];
            // let url = 'http://127.0.0.1:8080/api/front/' + endpoint;


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // LO CONVIERTE EN CADENA DE TEXTO JSON
                body: JSON.stringify(formDataJson)
            }).then(response => {
                return response.json();
            }).then(data => {
                    
                document.dispatchEvent(new CustomEvent('mensaje', {
                    detail: {
                        text: 'Formulario enviado correctamente',
                        type: 'exito'
                    }
            }));


        }).catch(error => {
            console.log(error);
        });    
             
        });
    };
}