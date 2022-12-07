export let renderEtiquetas = () => {

    let activarEtiquetas = document.querySelectorAll('.panel-etiqueta');

    activarEtiquetas.forEach(activarEtiqueta => {

        activarEtiqueta.addEventListener('click', function() {

            let mostrarContenido = document.querySelector(this.dataset.etiqueta);


            if (mostrarContenido) {

                let parentEtiquetas = this.closest('.etiquetas');
                let contenidoEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiquetas-contenido');

                contenidoEtiquetas.forEach(function(contenidoEtiqueta) {

                    contenidoEtiqueta.classList.remove('activo');

                });

                mostrarContenido.classList.add('activo');

                let activarEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiqueta');

                activarEtiquetas.forEach(function(etiqueta) {

                    etiqueta.classList.remove('activo');

                });

                this.classList.add('activo');

                if(mostrarContenido.querySelector('.panel-etiqueta')) {
                    mostrarContenido.querySelector('.panel-etiqueta').classList.add('activo');
                    document.querySelector(mostrarContenido.querySelector('.panel-etiqueta').dataset.etiqueta).classList.add('activo');

                }
            }
        });   
    });  
}
