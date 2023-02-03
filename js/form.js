import {API_URL} from "../config/config.js";

class Form extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url =  this.getAttribute('url');
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {

        document.addEventListener("newUrl",( event => {
            this.setAttribute('url', event.detail.url);
        }));

        this.render(); 
    }

    attributeChangedCallback(name, oldValue, newValue){

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
            // input[type="file"] {
            //     font-size: 1.3rem;
            //     padding: 0;
            //     background-color: white;
            // }
            // input[type=file]::file-selector-button {
            //     font-size: 1.3rem;
            // }
            .admin-formulario {
                margin: 4rem 0 2rem 2rem;
            }
            .admin-formulario-datos {
                padding: 3rem 3rem 0;
            }
            .admin-formulario-etiquetas-anidado {
                margin: 0.5rem;
            }
            .admin-formulario-etiquetas-anidado .admin-formulario-datos  {
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
            .panel-etiqueta h4 {
                font-family: "Ubuntu";
                font-size: 1.5rem;
            }
            .panel-etiqueta.fijo {
                box-shadow: none;
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
            .formulario-datos-input input, .formulario-datos-input select, .formulario-datos-texto textarea {
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
            .formulario-datos-texto textarea {
                height: 10rem;
                resize: none;
            }
            .editor textarea {
                height: 10rem;
                resize: none;
                border-radius: 0 0 0.5rem 0.5rem;
            }
            .formulario-datos-contador {
                font-size: 1.2rem;
                margin-left: auto;
                width: max-content;
            }
            .admin-formulario-accion {
                display: flex;
                margin-left: auto;
                width: max-content;
            }
            .boton-admin {
                cursor: pointer;
                border: none;
                background-color: #ffd485;
                border-radius: 0.5rem;  
            }
            .boton-admin svg {
                width: 2rem;
                margin: 0.6rem;
            }
            .boton-admin svg path {
                fill: #374343;
            }       
        </style>
        
        <div class="admin-formulario">
            <form id="formulario">
                <div class="etiquetas">
                    <div class="panel-etiquetas">
                        <div class="panel-etiqueta activo" data-etiqueta="#contenido">
                            <h4>Contenido</h4>
                        </div>
                        <div class="panel-etiqueta" data-etiqueta="#imagenes">
                            <h4>Imágenes</h4>
                        </div>
                    </div>
                    <div class="panel-etiquetas-contenidos">
                        <div class="panel-etiquetas-contenido activo" id="contenido">
                            <div class="admin-formulario-contenido">
                                <div class="admin-formulario-datos">
                                    <div class="one-column">
                                        <div class="column">
                                            <div class="formulario-datos">
                                                <div class="formulario-datos-label">
                                                    <label>Nombre</label>
                                                </div>
                                                <div class="formulario-datos-input">
                                                    <input type="text" name="name" id="nombre" data-validacion="solo-letras">
                                                </div>
                                                <div class="formulario-datos-requisito">
                                                    <span>El campo solo admite letras</span>
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
                                        </div>
                                    </div>
                                </div>              
                            </div>
                        </div>
                        <div class="admin-formulario-accion">
                            <button type="" class="boton-admin boton-limpiar">
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                            </svg>
                            </button>
                            <button  type="submit" class="boton-admin boton-envio">
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                            </svg>
                            </button>
                        </div>         
                    </div>
                </div>
            </form>
        </div>
        `;

        let formStructure = this.setFormStructure();
        let formContainer = this.shadow.querySelector('.admin-formulario');

        let form = document.createElement('form');
        form.setAttribute('id', 'formulario');
        formContainer.append(form);
        
        let tabsContainer = document.createElement('div');
        tabsContainer.classList.add('etiquetas');  
        form.append(tabsContainer);
        
        let tabs = document.createElement('div');
        tabs.classList.add('panel-etiquetas');  
        tabsContainer.append(tabs);
        

        

        setFormStructure = async () => {
        
            let url = this.getAttribute('url');

                switch (url) {

                case '/api/admin/users':

                    return {

                        tabs:{
                            main: {
                                label: 'Principal'
                            }
                        },

                    tabsContent: {
                        
                        main: {
                            rows:{
                                row1: {
                                    formElements:{
                                        id:{
                                            element: 'input',
                                            type: 'hidden',
                                        },
                                        name: {
                                            label: 'Nombre',
                                            element: 'input',
                                            maxLength: '10',
                                            type: 'text',
                                            placeholder: '',
                                            required: true,
                                            validate: 'only-letters'
                                        },
                                        email: {
                                            label: 'Email',
                                            element: 'input',
                                            type: 'email',
                                            placeholder: '',
                                            required: true,
                                            validate: 'email'
                                        }
                                    }
                                },
                                row2: {
                                    formElements:{
                                        password: {
                                            label: 'Contraseña',
                                            element: 'input',
                                            type: 'password',
                                            placeholder: '',
                                            required: true
                                        },
                                        repeatPassword: {
                                            label: 'Repita la contraseña',
                                            element: 'input',
                                            type: 'password',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                row3: {
                                    formElements:{
                                        permissions: {
                                            label: 'Permisos',
                                            element: 'input',
                                            type: 'checkbox',
                                            required: true,
                                            options: [
                                                {
                                                    label: 'Crear',
                                                    value: 'create',
                                                    checked: true
                                                },
                                                {
                                                    label: 'Leer',
                                                    value: 'read'
                                                },
                                                {
                                                    label: 'Actualizar',
                                                    value: 'update'
                                                },
                                                {
                                                    label: 'Eliminar',
                                                    value: 'delete'
                                                }
                                            ]
                                        },
                                        gender: {
                                            label: 'Sexo',
                                            element: 'input',
                                            type: 'radio',
                                            required: true,
                                            options: [
                                                {
                                                    label: 'Masculino',
                                                    value: "M",
                                                    checked: true
                                                },
                                                {
                                                    label: 'Femenino',
                                                    value: "F"
                                                }
                                            ],
                                        }
                                    }
                                },
                                row4: {
                                    formElements:{
                                        color: {
                                            label: 'Color',
                                            element: 'input',
                                            type: 'color',
                                            placeholder: ''
                                        },
                                        role: {
                                            label: 'Rol',
                                            element: 'select',
                                            required: true,
                                            options: [
                                                {
                                                    label: 'Administrador',
                                                    value: 'admin'
                                                },
                                                {
                                                    label: 'Usuario',
                                                    value: 'user'
                                                }
                                            ]
                                        }
                                    }
                                },
                                row5: {
                                    formElements:{
                                        age: {
                                            label: 'Edad',
                                            element: 'input',
                                            type: 'number',
                                            placeholder: '',
                                            required: true
                                        },
                                        phone: {
                                            label: 'Teléfono',
                                            element: 'input',
                                            type: 'tel',
                                            placeholder: '',
                                            required: true
                                        },
                                        url: {
                                            label: 'URL',
                                            element: 'input',
                                            type: 'url',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                row6: {
                                    formElements:{
                                        creationDate: {
                                            label: 'Fecha de creación',
                                            element: 'input',
                                            type: 'date',
                                            placeholder: '',
                                            required: true,
                                            validate: 'date'
                                        },
                                        creationTime: {
                                            label: 'Hora de creación',
                                            element: 'input',
                                            type: 'time',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                row7: {
                                    formElements:{
                                        reservationWeek: {
                                            label: 'Semana de reserva',
                                            element: 'input',
                                            type: 'week',
                                            placeholder: '',
                                            required: true
                                        },
                                        reservationMonth: {
                                            label: 'Mes de reserva',
                                            element: 'input',
                                            type: 'month',
                                            placeholder: '',
                                            required: true
                                        },
                                        reservationDateTime: {
                                            label: 'Fecha y hora',
                                            element: 'input',
                                            type: 'datetime-local',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                row8: {
                                    formElements:{
                                        capital: {
                                            label: 'Capital',
                                            element: 'input',
                                            type: 'range',
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                            value: 50,
                                            placeholder: ''
                                        },
                                    }
                                    
                                },
                                row9: {
                                    formElements:{
                                        pdf: {
                                            label: 'Pdf',
                                            element: 'input',
                                            type: 'file',
                                            placeholder: '',
                                            required: true
                                        },
                                        search: {
                                            label: 'Buscar',
                                            element: 'input',
                                            type: 'search',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                row10: {
                                    formElements:{
                                        description: {
                                            label: 'Descripción',
                                            element: 'textarea',
                                            maxLength: 100,
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    
    }
}

customElements.define('form-component', Form);