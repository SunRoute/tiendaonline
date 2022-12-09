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

            let formData = new FormData(formulario);

            let formDataJson = Object.fromEntries(formData.entries());

            // let formUrl = document.querySelector(formulario.dataset.formulario);

            // console.log(formulario.dataset.formulario)

            fetch('http://192.168.1.16:8080/api/admin/taxes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('accessToken')
            },
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