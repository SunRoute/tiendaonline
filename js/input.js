export let renderContadorTexto = () => {

    let inputs = document.querySelector('form').elements;

    for (let input of inputs){

        if(input.maxLength != null){

            input.addEventListener('input', () => {
    
                let contador = input.closest('.formulario-datos').querySelector('.contador');
                contador.textContent = input.value.length;
    
            });
        }
       
    }
}
