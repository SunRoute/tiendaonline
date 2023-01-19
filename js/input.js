export let renderContadorTexto = () => {

    let inputs = document.querySelector('form').elements;

    for (let input of inputs){

        if(input.maxLength !== undefined && input.maxLength !== -1) {
            
            input.addEventListener('input', () => {
                console.log(typeof input.maxLength);

                input.closest('.formulario-datos').querySelector('.contador').textContent = input.value.length;
            });
        }
    }
}
