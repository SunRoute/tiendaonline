export let renderSubetiquetas = () => {

    let activarSubetiquetas = document.querySelectorAll(".panel-etiqueta");
    let mostrarSubcontenidos = document.querySelectorAll(".panel-etiquetas-contenido");


    activarSubetiquetas.forEach(activarSubetiqueta => {

        activarSubetiqueta.addEventListener('click', () => {
            
            activarEtiquetas.forEach(activarEtiqueta => {

                activarEtiqueta.classList.remove('activo');

            });

            activarEtiqueta.classList.add('activo');

            mostrarContenidos.forEach(mostrarContenido => {
                
                console.log(activarEtiqueta.dataset.etiqueta);
                console.log(mostrarContenido.dataset.etiqueta);


                if(activarEtiqueta.dataset.etiqueta == mostrarContenido.dataset.etiqueta) {
                    
                    mostrarContenido.classList.add('activo');
                    
                } else {
                    
                    mostrarContenido.classList.remove('activo');

                }
            });

        });   
    });  

}