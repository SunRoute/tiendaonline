export let renderLogin = () => {
    
    let botonLogin = document.querySelector('.boton-login');

    if(botonLogin) {

        botonLogin.addEventListener('click', (event) => {

            event.preventDefault();

            let formulario = document.getElementById('formulario');
            let formData = new FormData(formulario);
            let formDataJson = Object.fromEntries(formData.entries());

            console.log(formDataJson);

            fetch('http://127.0.0.1:8080/api/auth/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                sessionStorage.setItem('accessToken', data.accessToken);
            }).catch(error => {
                console.log(error);
            });
        });
    }
}