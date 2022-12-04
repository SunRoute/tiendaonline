export let renderMenuAdmin = () => {

    let iconoMenu = document.querySelector(".icono-menu");
    let verMenu = document.querySelector(".menu-admin");

    iconoMenu.addEventListener('click', () => {
            
        verMenu.classList.toggle('activo');

    });

}