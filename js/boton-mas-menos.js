export let renderBotonMasMenos = () => {

    let masBotones = document.querySelectorAll('.mas-boton');

    masBotones.forEach( masBoton => {

        masBoton.addEventListener("click", () => {

            masBoton.value = (parseInt(age.value) + 1);
            
        });
    })

}