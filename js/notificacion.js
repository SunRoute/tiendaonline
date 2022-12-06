export let renderNotificacion = () => {
 
    document.addEventListener('mensaje', (event => {

        let notificacion = document.querySelector('.notificacion');
        let notificacionMensaje = document.querySelector('.notificacion-mensaje');
        
        notificacionMensaje.innerHTML = event.detail.text;
        notificacion.classList.add(event.detail.type);
        notificacion.classList.add('activo');

        setTimeout(() => {
            notificacion.classList.remove('activo');
            notificacion.classList.remove(event.detail.type);
        }, 5000);
    }));
}