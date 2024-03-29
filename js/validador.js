export let validador = formInputs => {

    let formValidador = true;
   
    let validadores = {
        "solo-letras": /^[a-zA-Z\s]+$/g,
        "solo-numeros": /\d/g,
        "telefono": /^\d{9}$/g,
        "email": /\w+@\w+\.\w+/g,
        "web": /^(http|https):\/\/\w+\.\w+/g,
        "imagen": /^(.+\/)+.+(\.(png|jpg|jpeg|webp))$/g,
        // "imagen": /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/g,
        "password": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
        "fecha": /^\d{4}-\d{2}-\d{2}$/g,
        "hora": /^\d{2}:\d{2}$/g
    }

    for (let i = 0; i < formInputs.length; i++) {

        if (formInputs[i].dataset.validacion) {

            if (formInputs[i].value.match(validadores[formInputs[i].dataset.validacion]) == null) {
                formInputs[i].closest('.formulario-datos').querySelector('.formulario-datos-requisito').classList.add('incorrecto');
                formValidador = false;
            } else {
                formInputs[i].closest('.formulario-datos').querySelector('.formulario-datos-requisito').classList.remove('incorrecto');
            }
        } 
    }

    return formValidador;
};
