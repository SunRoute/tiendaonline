export let renderLogin = () => {
    
    let botonLogin = document.querySelector('.boton-login');

    if(botonLogin) {

        botonLogin.addEventListener('click', (event) => {

            event.preventDefault();

            let formulario = document.getElementById('formulario');
            let formData = new FormData(formulario);
            let formDataJson = Object.fromEntries(formData.entries());

            fetch('http://127.0.0.1:8080/api/auth/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            }).then(response => {
                return response.json();
            }).then(data => {
                if(data.accessToken){
                    sessionStorage.setItem('accessToken', data.accessToken);
                    document.dispatchEvent(new CustomEvent('message', {
                        detail: {
                            text: 'Enviado correctamente',
                            type: 'exito'
                        }
                    }));
                }else{
                    document.dispatchEvent(new CustomEvent('message', {
                        detail: {
                            text: 'Usuario o contraseña incorrecta',
                            type: 'fallo'
                        }
                    }));
                }
            }).catch(error => {
                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        text: 'Se ha producido un error',
                        type: 'fallo'
                    }
                }));
            });
        });
    }
}