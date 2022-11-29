export let renderNotificacion = () => {

    // Podemos escuchar un evento personalizado que se ha creado en form.js refiriéndonos a él por el nombre que le dimos,
    // en este caso "message". 
    document.addEventListener("mensaje", (event => {

        let notificacion = document.getElementById("notificacion");
        let notificacionMensaje = document.getElementById("notificacion-mensaje");
        
        // Podemos utilizar los parámetros que se han enviado en el evento, escribiendo event.detail y a continuación el nombre del parámetro.
        notificacionMensaje.innerHTML = event.detail.text;
        notificacion.classList.add(event.detail.type);
        notificacion.classList.add("active");

        setTimeout(() => {
            notificacion.classList.remove("active");
            notificacion.classList.remove(event.detail.type);
        }, 5000);
    }));
}