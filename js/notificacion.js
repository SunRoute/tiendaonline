export let renderNotificacion = () => {

    // Podemos escuchar un evento personalizado que se ha creado en form.js refiriéndonos a él por el nombre que le dimos,
    // en este caso "message". 
    document.addEventListener('mensaje', (event => {

        let notificacion = document.querySelector('.notificacion');
        let notificacionMensaje = document.querySelector('.notificacion-mensaje');
        
        // Podemos utilizar los parámetros que se han enviado en el evento, escribiendo event.detail y a continuación el nombre del parámetro.
        notificacionMensaje.innerHTML = event.detail.text;
        notificacion.classList.add(event.detail.type);
        notificacion.classList.add('activo');

        setTimeout(() => {
            notificacion.classList.remove('activo');
            notificacion.classList.remove(event.detail.type);
        }, 5000);
    }));
}