export let renderContadorTexto = () => {

    let areaTextos = document.querySelectorAll('textarea');

    areaTextos.forEach(areaTexto => {

        let contador = areaTexto.closest('.formulario-datos').querySelector('.contador');

        areaTexto.addEventListener('input', () => {

            contador.textContent = areaTexto.value.length;

        });
    });
}
export let renderValidador = () => {

    let botonEnvio = document.querySelector('.boton-envio');

    botonEnvio.addEventListener('click', () => {

        

    });



}
