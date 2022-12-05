export let renderEtiquetas = () => {

    let activarEtiquetas = document.querySelectorAll(".panel-etiqueta");
    let mostrarContenidos = document.querySelectorAll(".panel-etiquetas-contenido");


    activarEtiquetas.forEach(activarEtiqueta => {

        activarEtiqueta.addEventListener('click', () => {
            
            activarEtiquetas.forEach(activarEtiqueta => {

                activarEtiqueta.classList.remove('activo');

            });

            activarEtiqueta.classList.add('activo');

            mostrarContenidos.forEach(mostrarContenido => {


                if(activarEtiqueta.dataset.etiqueta == mostrarContenido.dataset.etiqueta) {
                    
                    mostrarContenido.classList.add('activo');
                    
                } else {
                    
                    mostrarContenido.classList.remove('activo');

                }
            });

        });   
    });  

}

