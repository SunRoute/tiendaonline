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

            // CAPTURA LOS DATOS
            let formData = new FormData(formulario);
            // LOS CONVIERTE EN UN OBJETO
            let formDataJson = Object.fromEntries(formData.entries());

            
            // ..ESTO ERA UN INTENTO DE AÑADIR AL FINAL DE LA DIRECCIÓN UNA VARIABLE (/taxes)
            // let formUrl = document.querySelector(formulario.dataset.formulario);
            // console.log(formulario.dataset.formulario)
            // ..


            fetch('http://192.168.1.16:8080/api/admin/taxes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('accessToken')
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