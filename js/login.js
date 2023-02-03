import {API_URL} from "../config/config.js";

class Login extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        this.render();

    }
    
    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            label{
                font-family: "Ubuntu";
            }
            input, select, textarea {
                border: none;
                padding-left: 0.2rem;
                font-family: "Ubuntu";
                font-size: 1.5rem;
                height: 2rem;
                width: 100%;
            }
            .admin-formulario {
                margin: 8rem 30rem;
            }
            .admin-formulario-datos {
                padding: 3rem 3rem 0;
            }
            .admin-formulario-datos  {
                padding: 2rem;
            }
            .panel-etiquetas {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
            }
            .panel-etiqueta {
                cursor: default;
                text-align: center;
                border: #ffa047 3px solid;
                box-shadow: 0 0 1.2rem 0.1rem #ffa047 inset;
                border-radius: 0.5rem 0.5rem 0 0;
            }
            .panel-etiqueta.activo {
                border-bottom: none;
                box-shadow: none;
            }
            .panel-etiquetas-contenidos {
                border: #ffa047 3px solid;
                border-top: none;
                border-radius: 0 0 0.5rem 0.5rem;
            }
            .panel-etiquetas-contenido {
                display: none;
                // margin: 0 0 2rem 2rem;
            }
            .panel-etiquetas-contenido.activo {
                display: block;
            }
            .formulario-datos {
                position: relative;
                margin-bottom: 3rem;
            }
            .formulario-datos-label  {
                font-size: 1.5rem;
                margin-bottom: 0.2rem;
            }
            .formulario-datos-input, .formulario-datos-texto  {
                box-shadow: 0.2rem 0.2rem 1rem #ffa047; 
            }
            .formulario-datos-input input {
                border-radius: 0.2rem;
            }
            .formulario-datos-input input[type=file]::file-selector-button {
                border: #ffa047 3px solid;
                border-radius: 0.2rem 0 0 0.2rem;
                background-color: #ffd485;
                color: #374343;   
            }
            .formulario-datos-requisito {
                position: absolute;
            }
            .formulario-datos-requisito {
                display: none;
                color: red;
            }
            .formulario-datos-requisito.incorrecto {
                display: block;
            }
            .admin-formulario-accion {
                display: flex;
                margin-left: auto;
                width: max-content;
            }
            .boton-login {
                margin: 0 3rem 2rem;
            }
            .custom-button {
                font-family: "Ubuntu";
                font-size: 1.1rem;
                cursor: pointer;
                border: white 2px solid;
                background-color: #ffa047;
                color: white;
                font-weight: bold;
                border-radius: 0.5rem;
                padding: 0.5rem 2rem;
                box-shadow: 0 0 1.5rem 0.1rem #ff4400 inset;
            }
            .custom-button:hover {
                box-shadow: 0 0 1.3rem 0.1rem #ff4400 inset;
            }
        </style>

        <div class="admin-formulario">
            <form id="formulario">
                <div class="etiquetas etiquetas-login">
                    <div class="panel-etiquetas">
                        <div class="panel-etiqueta activo" data-etiqueta="#contenido">
                            <h4></h4>
                        </div>
                    </div>
                    <div class="panel-etiquetas-contenidos">
                        <div class="panel-etiquetas-contenido activo"  id="contenido">
                            <div class="admin-formulario-contenido">
                                <div class="admin-formulario-datos">
                                    <div class="one-column">
                                        <div class="column">
                                            <div class="formulario-datos">
                                                <div class="formulario-datos-label">
                                                    <label>Email</label>
                                                </div>
                                                <div class="formulario-datos-input">
                                                    <input type="text" name="email" id="email" data-validacion="email">
                                                </div>
                                                <div class="formulario-datos-requisito">
                                                    <span>ejemplo@ejemplo.com</span>
                                                </div>
                                            </div>
                                            <div class="formulario-datos">
                                                <div class="formulario-datos-label">
                                                    <label>Password</label>
                                                </div>
                                                <div class="formulario-datos-input">
                                                    <input type="password" name="password" id="password">
                                                </div>
                                                <div class="formulario-datos-requisito">
                                                    <span>Debe contener mayúsculas, minúsculas y números</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>              
                            </div>
                        </div>
                        <div class="admin-formulario-accion">
                            <button  type="submit" class="custom-button boton-login">Enviar</button>
                        </div>         
                    </div>
                </div>
            </form>
        </div>
        `;

        let botonLogin = this.shadow.querySelector('.boton-login');

        if(botonLogin) {
    
            botonLogin.addEventListener('click', (event) => {
    
                event.preventDefault();
    
                let formulario = this.shadow.getElementById('formulario');
                let formData = new FormData(formulario);
                let formDataJson = Object.fromEntries(formData.entries());
    
                fetch(`${API_URL}/api/auth/user/signin`, {
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
                        location.href = 'admin.html';
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
}

customElements.define('login-component', Login);