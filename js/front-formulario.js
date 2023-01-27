import {validador} from './validador.js';

export let renderFrontFormulario = () => {

    let botonEnvio= document.querySelector('.boton-envio-front');

    if (botonEnvio) {

        botonEnvio.addEventListener('click', event => {

            event.preventDefault();

            let formulario = document.getElementById('formulario-front');
            let formularioInputs = formulario.elements;
    
            if(!validador(formularioInputs)){
                return;
            };

            // CAPTURA LOS DATOS
            // let formData = new FormData(formulario);
            // LOS CONVIERTE EN UN OBJETO
            // let formDataJson = Object.fromEntries(formData.entries());
            // let url = formulario.action;
            // formulario.action ESTARÍA EN LA ETIQUETA form DE CADA PÁGINA EN CASO DE QUE NO SE TOMARA EL ENDPOINT DE LA URL

            let formData = new FormData(formulario);
            let formDataJson = Object.fromEntries(formData.entries());
            let href = window.location.href;
            let endpointSplit = href.split('/')
            let endpoint = endpointSplit[endpointSplit.length - 1].split('.')[0];
            let url = "http://127.0.0.1:8080/api/front/" + endpoint;
            // EN LUGAR DE LA URL SE PODRÍA AÑADIR formulario.action Y ELIMINAR EL ENDPOINT EN LA URL DE LAS PÁGINAS. NO OBSTANTE, NO TENDRÍA SENTIDO PORQUE HABRÍA QUE PONERLA EN TODAS LAS PÁGINAS CUANDO, EN REALIDAD, SE APLICA IGUAL CON ESTA SOLA LÍNEA.

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
                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        text: 'Formulario enviado correctamente',
                        type: 'exito'
                    }
                }));
            }).catch(error => {
                console.log(error);
                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        text: 'Se ha producido un error',
                        type: 'fallo'
                    }
                }));
            });    
             
        });
    };
}