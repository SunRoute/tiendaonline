// export let renderEtiquetas = () => {

//     let activarEtiquetas = document.querySelectorAll(".panel-etiqueta");
//     let mostrarContenidos = document.querySelectorAll(".panel-etiquetas-contenido");


//     activarEtiquetas.forEach(activarEtiqueta => {

//         activarEtiqueta.addEventListener('click', () => {
            
//             activarEtiquetas.forEach(activarEtiqueta => {

//                 activarEtiqueta.classList.remove('activo');

//             });

//             activarEtiqueta.classList.add('activo');

//             mostrarContenidos.forEach(mostrarContenido => {


//                 if(activarEtiqueta.dataset.etiqueta == mostrarContenido.dataset.etiqueta) {
                    
//                     mostrarContenido.classList.add('activo');
                    
//                 } else {
                    
//                     mostrarContenido.classList.remove('activo');
//                 }
//             });
//         });   
//     });  
// }


export let renderEtiquetas = () => {

    let activarEtiquetas = document.querySelectorAll('.panel-etiqueta');

    activarEtiquetas.forEach(activarEtiqueta => {

        activarEtiqueta.addEventListener('click', () => {

            let mostrarContenido = document.querySelector(this.dataset.target);

            if (mostrarContenido) {

                let parentEtiquetas = this.closest('.etiquetas');
                let contenidoEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiquetas-contenido');

                contenidoEtiquetas.forEach(contenidoEtiqueta => {

                    contenidoEtiqueta.classList.remove('activo');

                });

                mostrarContenido.classList.add('activo');

                let activarEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiqueta');

                activarEtiquetas.forEach(etiqueta => {

                    etiqueta.classList.remove('activo');

                });

                this.classList.add('activo');

                if(mostrarContenido.querySelector('.panel-etiqueta')) {
                    mostrarContenido.querySelector('.panel-etiqueta').classList.add('activo');
                    document.querySelector(mostrarContenido.querySelector('.panel-etiqueta').dataset.target).classList.add('activo');

                }
            }
        });   
    });  
}





// export let renderEtiqueta = () => {

//     let activarEtiquetas = document.querySelectorAll(".panel-etiqueta");
//     let mostrarContenido = document.querySelectorAll(".panel-etiquetas-contenido");
//     let classNombre = 'activo';

    
//     function cambiaEtiqueta() {
//         function removeActiveContent(elementId) {
//             let etiquetaEncontrada = elementId.classList.contains(classNombre);
//             elementId.classList.remove(classNombre);
//             document
//                 .getElementById(elementId.dataset.etiqueta)
//                 .classList.remove(classNombre);
//             return etiquetaEncontrada;
//         }

//         (function desactiva(node) {
//             let currentSibling = node.previousElementSibling;

//             while (currentSibling != null) {
//                 if (removeActiveContent(currentSibling)) {
//                     return;
//                 }
//                 currentSibling = currentSibling.previousElementSibling;
//             }
//             currentSibling = node.nextElementSibling;
//             while (currentSibling != null) {
//                 if (removeActiveContent(currentSibling)) {
//                     return;
//                 }
//                 currentSibling = currentSibling.nextElementSibling;
//             }
//         })(this);

//         // activa la pestaña y contenido actuales

//         if(elementId.dataset.etiqueta == mostrarContenido.dataset.etiqueta) {

//             this.classList.add(classNombre);
//             document.getElementById(this.dataset.etiqueta).classList.add(classNombre);

//         }
//     }

    // establece los controladores para los tabs
//     activarEtiquetas.forEach(etiqueta => {

//         etiqueta.addEventListener('click', cambiaEtiqueta);

//     });
// };

