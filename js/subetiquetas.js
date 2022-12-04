export let renderSubetiquetas = () => {

    let activarEtiquetas = document.querySelectorAll(".panel-subetiqueta");
    let mostrarContenidos = document.querySelectorAll(".panel-subetiquetas-contenido");


    activarEtiquetas.forEach(activarEtiqueta => {

        activarEtiqueta.addEventListener('click', () => {
            
            activarEtiquetas.forEach(activarEtiqueta => {

                activarEtiqueta.classList.remove('activo');

            });

            activarEtiqueta.classList.add('activo');

            mostrarContenidos.forEach(mostrarContenido => {
                
                console.log(activarEtiqueta.dataset.subetiqueta);
                console.log(mostrarContenido.dataset.subetiqueta);


                if(activarEtiqueta.dataset.subetiqueta == mostrarContenido.dataset.subetiqueta) {
                    
                    mostrarContenido.classList.add('activo');
                    
                } else {
                    
                    mostrarContenido.classList.remove('activo');

                }
            });

        });   
    });  

}