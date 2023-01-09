import {validador} from './validador.js';

export let renderFormulario = () => {

    let botonEnvio= document.querySelector('.boton-envio');

    if (botonEnvio) {

        botonEnvio.addEventListener('click', event => {

            event.preventDefault();

            let formulario = document.getElementById('formulario');
            let formularioInputs = formulario.elements;
    
            validador(formularioInputs);

            // CAPTURA LOS DATOS
            let formData = new FormData(formulario);
            // LOS CONVIERTE EN UN OBJETO
            let formDataJson = Object.fromEntries(formData.entries());
            let url = formulario.action;

            
            // ..ESTO ERA UN INTENTO DE AÑADIR AL FINAL DE LA DIRECCIÓN UNA VARIABLE (/taxes)
            // let formUrl = document.querySelector(formulario.dataset.formulario);
            // console.log(formulario.dataset.formulario)
            // ..


            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
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