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

        

    });

}






// Estudiar
// export let renderValidador = () => {

    //     let botonEnvio = document.querySelector('.boton-envio');
    //     let inputs = document.querySelectorAll('.formulario-datos-input');
    //     let expresiones {
    //         nombre = /^[a-zA-Z-\s]+$/g;
    //         apellidos = /^[a-zA-Z-\s]+$/g;
    //         telefono = /^\d{9}$/g;
    //         email = /\w+@\w+\.\w+/g;
    //     }
    //     let validarFormulario = (e) => {
    
    //         switch (e.target.dataset.validacion) {
    //             case 'nombre':
    //                 validarCampo(expresiones.nombre, e.target, 'nombre');
    //             break;
    //             case 'apellidos':
    //                 validarCampo(expresiones.apellidos, e.target, 'apellidos');
    //             break;
    //             case 'telefono':
    //                 validarCampo(expresiones.telefono, e.target, 'telefono');
    //             break;
    //             case 'email':
    //                 validarCampo(expresiones.email, e.target, 'email');
    //             break;
    //         }
    //     }
    //     let validarCampo = (expresiones, target, campo) => {
    
    //         if (expresiones.test(target.dataset.validacion.value)) {
    //             document.querySelector(`${campo}`).classList.remove('incorrecto');
    //             document.querySelector(`${campo}`).classList.add('incorrecto');
    //         } else {
    //             document.querySelector(`${campo}`).classList.add('incorrecto');
    //             document.querySelector(`${campo}`).classList.remove('incorrecto');
    //         }
    //     }
    //     inputs.forEach((input) => {
    
    //         input.addEventListener('keyup', validarFormulario);
    //         input.addEventListener('blur', validarFormulario);
    
    //     });
        
    //     botonEnvio.addEventListener('submit', (e) => {
    
    //         e.preventDefault();   
            
    //     });
    // }
