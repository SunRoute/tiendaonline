export let renderBotonMasMenos = () => {

    let masBoton = document.querySelectorAll('.mas-boton');

    masBoton.forEach( masBoton => {

        masBoton.addEventListener("click", () => {
            
            let cantidad = masBoton.closest('.articulo-mas-menos').querySelector('.cantidad');
            cantidad.value++;
            
        });
    });

    let menosBoton = document.querySelectorAll('.menos-boton');

    menosBoton.forEach( menosBoton => {

        menosBoton.addEventListener("click", () => {
            
            let cantidad = menosBoton.closest('.articulo-mas-menos').querySelector('.cantidad');

            if (cantidad.value < 1) {

                cantidad.value = 0;

            }else{

                cantidad.value--;
                
            }
            
        });
    });

    // let soloNumeros = document.getElementsByClassName('cantidad');
    
    // soloNumeros.forEach(soloNumeros => {
    
    //     soloNumeros.addEventListener('keypress', () => {

    //     return isNumberKey(Event);

    //     }, false );
    
    // });

}