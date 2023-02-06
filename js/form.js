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
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.render();
    }

    async render() {
        
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
                    </div>

                    <div class="panel-etiquetas-contenidos">
                        
                    </div>
                </div>
            </form>
        </div>
        `;

        let formStructure = await this.setFormStructure();
        let tabContainer = this.shadow.querySelector('.panel-etiquetas');

        Object.keys(formStructure.tabs).forEach(tab => {

            // console.log(formStructure.tabs[tab].label);

            let tabs = document.createElement('div');
            tabs.classList.add('panel-etiqueta');
            tabs.dataset.etiqueta = `#${tab}`;
            tabContainer.append(tabs);

            tabs.innerHTML +=  `<h4>${formStructure.tabs[tab].label}</h4>`;

            Object.values(formStructure.tabsContent[tab]).forEach(row => {
                
                Object.values(row).forEach( formElements => {

                    // console.log(formElements);

                    Object.values(formElements).forEach( formElement => {

                        console.log(formElement);

                        Object.values(formElement).forEach( value => {

                            console.log(value);  
        
                        });
    
                    });

                });
            })
        });

        this.shadow.querySelector('.panel-etiqueta').classList.add("activo");
        let tabContentContainer = this.shadow.querySelector('.panel-etiquetas-contenidos');
        
        Object.keys(formStructure.tabsContent).forEach(content => {

            // console.log(formStructure.tabsContent[content].rows);

            let tabsContent = document.createElement('div');
            tabsContent.classList.add('panel-etiqueta-contenido');
            tabsContent.setAttribute('id', content);
            tabContentContainer.append(tabsContent);

            let formContentContainer = document.createElement('div');
            formContentContainer.classList.add('admin-formulario-contenido');
            tabsContent.append(formContentContainer);

            let formContent = document.createElement('div');
            formContent.classList.add('admin-formulario-datos');
            formContentContainer.append(formContent);

            let rows = formStructure.tabsContent[content].rows;
            

            let formData = document.createElement('div');
            formData.classList.add('formulario-datos');
            formContent.append(formData);


        });

        this.shadow.querySelector('.panel-etiqueta-contenido').classList.add("activo");


        this.renderTabs();
    }

    renderTabs(){

        let activarEtiquetas = this.shadow.querySelectorAll('.panel-etiqueta');

        activarEtiquetas.forEach(activarEtiqueta => {
    
            activarEtiqueta.addEventListener('click', () => {
    
                let mostrarContenido = this.shadow.querySelector(activarEtiqueta.dataset.etiqueta);
    
                if (mostrarContenido) {
    
                    let parentEtiquetas = activarEtiqueta.closest('.etiquetas');
                    let contenidoEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiquetas-contenido');
    
                    contenidoEtiquetas.forEach(function(contenidoEtiqueta) {
    
                        contenidoEtiqueta.classList.remove('activo');
    
                    });
    
                    mostrarContenido.classList.add('activo');
    
                    let activarEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiqueta');
    
                    activarEtiquetas.forEach( etiqueta => {
    
                        etiqueta.classList.remove('activo');
    
                    });
    
                    activarEtiqueta.classList.add('activo');
    
                    if(mostrarContenido.querySelector('.panel-etiqueta')) {
                        mostrarContenido.querySelector('.panel-etiqueta').classList.add('activo');
                        this.shadow.querySelector(mostrarContenido.querySelector('.panel-etiqueta').dataset.etiqueta).classList.add('activo');
    
                    }
                }
            });   
        });  
    }

    setFormStructure = async () => {
        
        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/user':

            return {

                tabs:{
                    main: {
                        label: 'Principal'
                    },
                    images: {
                        label: 'Imágenes'
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
                    },
                    images: {
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

customElements.define('form-component', Form);