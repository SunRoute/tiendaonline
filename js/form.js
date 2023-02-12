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

        document.addEventListener("showData",( event => {
            this.showElement(event.detail.id);
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
            input[type="file"] {
                font-size: 1.3rem;
                padding: 0;
                background-color: white;
            }
            input[type=file]::file-selector-button {
                font-size: 1.3rem;
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
                padding-bottom: 4rem;
            }
            .panel-etiqueta-contenido {
                display: none;
                // margin: 0 0 2rem 2rem;
            }
            .panel-etiqueta-contenido.activo {
                display: block;
            }
            .panel-etiquetas-anidado {
                margin: 0.5rem;
            }
            .panel-etiquetas-anidado .formulario-datos-contenedor  {
                padding: 2rem;
            }
            .admin-formulario {
                margin: 4rem 0 2rem 2rem;
            }
            .formulario-datos-contenido {
                padding: 3rem 1rem 0;
            }
            .formulario-datos {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
                gap: 2rem;
                position: relative;
                margin-bottom: 1rem;
            }
            .formulario-datos-elementos {

            }
            .formulario-datos-label  {
                font-size: 1.4rem;
                margin: 1rem 0 0.2rem;
            }
            .formulario-datos-input, .formulario-datos-texto {
                box-shadow: 0.2rem 0.2rem 1rem #ffa047; 
            }
            .formulario-datos-range-value {
                font-family: "Ubuntu";
                font-size: 1.5rem;
            }
            .formulario-datos-input input, .formulario-datos-input select, .formulario-datos-texto textarea {
                border-radius: 0.2rem;
                width: 100%;
            }
            .formulario-datos-date input {
                display: flex;
            }
            .formulario-datos-opcion {
                display: grid;
                grid-template-columns: repeat(4, 1fr);    
            }
            .formulario-datos-opcion label {
                font-size: 1rem;    
            }
            .formulario-datos-opcion input {
                width: 0.8rem; 
                margin: -0.3rem 0.3rem 0;
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
                padding: 2rem 2rem 0;
            }
            .boton-admin {
                cursor: pointer;
                border: none;
                background-color: #ffd485;
                border-radius: 0.5rem; 
            }
            .boton-admin svg {
                width: 2rem;
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
        
        let form = this.shadow.querySelector('form');
        let formStructure = await this.setFormStructure();
        let tabContainer = this.shadow.querySelector('.panel-etiquetas');
        let tabContentContainer = this.shadow.querySelector('.panel-etiquetas-contenidos');

        Object.keys(formStructure.tabs).forEach(tab => {


            let tabs = document.createElement('div');
            tabs.classList.add('panel-etiqueta');
            tabs.dataset.etiqueta = `#${tab}`;
            tabContainer.append(tabs);

            tabs.innerHTML +=  `<h4>${formStructure.tabs[tab].label}</h4>`;

            Object.values(formStructure.tabsContent[tab]).forEach(content => {
    
                let tabsContent = document.createElement('div');
                tabsContent.classList.add('panel-etiqueta-contenido');
                tabsContent.setAttribute('id', tab);
                tabContentContainer.append(tabsContent);
    
                let formContentContainer = document.createElement('div');
                formContentContainer.classList.add('formulario-contenedor');
                tabsContent.append(formContentContainer);

                Object.values(formStructure.tabsContent[tab]).forEach(row => {
                    
                    let formContent = document.createElement('div');
                    formContent.classList.add('formulario-datos-contenido');
                    formContentContainer.append(formContent);
                    
                    Object.values(row).forEach( formElements => {

                        let formElementsContainer = document.createElement('div');
                        formElementsContainer.classList.add('formulario-datos');
                        formContent.append(formElementsContainer);

                        Object.values(formElements).forEach( formElement => {
                                                      
                            for (let field in formElement){

                                let formElementContainer = document.createElement('div');
                                formElementContainer.classList.add('formulario-datos-elementos');
                                formElementsContainer.append(formElementContainer);

                                let item = formElement[field];

                                if(item.label) {
                                    
                                    let labelContainer = document.createElement('div');
                                    labelContainer.classList.add('formulario-datos-label');
                                    formElementContainer.append(labelContainer);
                                    
                                    const label = document.createElement('label');
                                    label.innerText = item.label;
                                    label.setAttribute('for', field);
                                    labelContainer.append(label);
                                }

                                if (item.element === 'input') {
        
                                    switch (item.type) {
            
                                        case 'hidden': {
            
                                            const input = document.createElement('input');
                                            input.type = item.type;
                                            input.name = field;
                                            input.value = item.value || '';
            
                                            form.append(input);
            
                                            break;
                                        }
            
                                        case 'checkbox':
                                        case 'radio': {
                    
                                            const inputContainer = document.createElement('div');
                                            inputContainer.classList.add('formulario-datos-opcion');
                            
                                            item.options.forEach(option => {
                                                const input = document.createElement('input');
                                                const inputLabel = document.createElement('label');
                                                inputLabel.innerText = option.label;
                                                input.type = item.type;
                                                input.name = field;
                                                input.value = option.value || '';
                                                input.checked = option.checked || false;
                                                input.disabled = option.disabled || false;
            
                                                inputContainer.append(inputLabel);
                                                inputContainer.append(input);
                                            });
            
                                            formElementContainer.append(inputContainer);
            
                                            break;
                                        }
            
                                        case 'range': {
            
                                            const rangeContainer = document.createElement('div');
                                            
                                            const input = document.createElement('input');
                                            input.id =  field;
                                            input.type = item.type;
                                            input.name = field;
                                            input.min = item.min || '';
                                            input.max = item.max || '';
                                            input.step = item.step || '';
                                            input.value = item.value || '';
                                            rangeContainer.append(input);
            
                                            const rangeValue = document.createElement('span');
                                            rangeValue.classList.add('formulario-datos-range-value');
                                            rangeValue.innerText = item.value;
                                            rangeContainer.append(rangeValue);
            
                                            input.addEventListener('input', () => {
                                                rangeValue.innerText = input.value;
                                            });
            
                                            formElementContainer.append(rangeContainer);
            
                                            break;
                                        }
            
                                        case 'number':
                                        case 'date':
                                        case 'time':
                                        case 'datetime-local':
                                        case 'month':
                                        case 'week': {

                                            const inputDate = document.createElement('div');
                                            inputDate.classList.add('formulario-datos-date');
                                            const input = document.createElement('input');
                                            inputDate.append(input);
                                            
                                            input.id = field;
                                            input.type = item.type;
                                            input.name = field;
                                            input.min = item.min || '';
                                            input.max = item.max || '';
                                            input.step = item.step || '';
                                            input.placeholder = item.placeholder || '';
                                            input.value = item.value || '';
                                            input.readOnly = item.readOnly || false;
                                            input.dataset.validate = item.validate || '';
            
                                            formElementContainer.append(inputDate);
                                        
                                            break;
                                        }
            
                                        case 'file': {

                                            let fileContainer = document.createElement('div');
                                            fileContainer.classList.add('formulario-datos-input');
                                            const input = document.createElement('input');
                                            fileContainer.append(input);
                                            input.id = field;
                                            input.type = item.type;
                                            input.setAttribute("name", field);
                                            input.setAttribute("languageAlias", "es");
                                            input.setAttribute("quantity", item.quantity);
            
                                            // if(!this.shadow.querySelector('image-gallery-component')){
                                            //     const imageGallery = document.createElement('image-gallery-component');
                                            //     this.shadow.append(imageGallery);
                                            // }
            
                                            // const input = document.createElement('upload-image-button-component');
                                            // input.id = field;
                                            // input.setAttribute("name", field);
                                            // input.setAttribute("languageAlias", "es");
                                            // input.setAttribute("quantity", item.quantity);
            
                                            // input.accept = formElement.accept || '';
                                            // input.multiple = formElement.multiple || false;
                                            // input.required = formElement.required || false;
                                            // input.dataset.validate = formElement.validate || '';
            
                                            // formElementContainer.append(input);

                                            formElementContainer.append(fileContainer);
                                            break;
                                        }
            
                                        default: {
                                            
                                            const defaultInput = document.createElement('div');
                                            defaultInput.classList.add('formulario-datos-input');
                                            const input = document.createElement('input');
                                            defaultInput.append(input);
                                            input.id = field;
                                            input.type = item.type;
                                            input.name = field;
                                            input.value = item.value || '';
                                            input.placeholder = item.placeholder || '';
                                            input.dataset.validate = item.validate || '';
                                              
                                            if(item.maxLength){
            
                                                input.maxLength = item.maxLength || '';
                                                const counterContainer = document.createElement('div');
                                                counterContainer.classList.add('formulario-datos-contador');
                                                const counter = document.createElement('span');
                                                counterContainer.append(counter);
            
                                                input.addEventListener('input', () => {
                                                    if(input.value.length > 0){
                                                        counter.textContent = input.value.length + ' / ' + input.maxLength;                            
                                                    }else{
                                                        counter.textContent = '';
                                                    }
                                                });
                                            }
                        
                                            formElementContainer.append(defaultInput);
            
                                            break;
                                        }
                                    }
                                }
                                if (item.element === 'textarea') {

                                    const textareaContainer = document.createElement('div');
                                    textareaContainer.classList.add('formulario-datos-texto');
                                    formElementsContainer.append(textareaContainer);
                                    const textarea = document.createElement('textarea');
                                    textareaContainer.append(textarea);
                                    textarea.id = field;
                                    textarea.name = field;
                                    textarea.disabled = item.disabled || false;
                                    textarea.readOnly = item.readOnly || false;
                                    textarea.value = item.value || '';
                                    textarea.cols = item.cols || '';
                                    textarea.rows = item.rows || '';
                                    textarea.wrap = item.wrap || '';
                                    textarea.placeholder = item.placeholder || '';
                                    textarea.dataset.validate = item.validate || '';
                                   
                                    if(item.maxLength){
            
                                        textarea.maxLength = item.maxLength || '';
                                        const counterContainer = document.createElement('div');
                                        counterContainer.classList.add('formulario-datos-contador');
                                        const counter = document.createElement('span');
                                        counterContainer.append(counter);
    
                                        textarea.addEventListener('textarea', () => {
                                            if(textarea.value.length > 0){
                                                counter.textContent = textarea.value.length + ' / ' + textarea.maxLength;                            
                                            }else{
                                                counter.textContent = '';
                                            }
                                        });
                                    }
            
                                    formElementContainer.append(textareaContainer);
                                }
                                if (item.element === 'select') {
        
                                    const select = document.createElement('select');
                                    select.id = field;
                                    select.name = field;
                                    select.disabled = item.disabled || false;
                                    select.required = item.required || false;
                                    select.multiple = item.multiple || false;
                    
                                    item.options.forEach(option => {
                                        const optionElement = document.createElement('option');
                                        optionElement.value = option.value;
                                        optionElement.innerText = option.label;
                                        select.append(optionElement);
                                    });
                    
                                    formElementContainer.append(select);
                                }
                            };
                        });
                    });
                });
            });
        });

        this.shadow.querySelector('.panel-etiqueta').classList.add("activo");
        this.shadow.querySelector('.panel-etiqueta-contenido').classList.add("activo");
        

        this.renderTabs();
        this.renderAction();
    }

    renderTabs(){

        let activarEtiquetas = this.shadow.querySelectorAll('.panel-etiqueta');

        activarEtiquetas.forEach(activarEtiqueta => {
    
            activarEtiqueta.addEventListener('click', () => {
    
                let mostrarContenido = this.shadow.querySelector(activarEtiqueta.dataset.etiqueta);
    
                if (mostrarContenido) {
    
                    let parentEtiquetas = activarEtiqueta.closest('.etiquetas');
                    let contenidoEtiquetas = parentEtiquetas.querySelectorAll('.panel-etiqueta-contenido');
    
                    contenidoEtiquetas.forEach( contenidoEtiqueta => {
    
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

    renderAction (){

        let sendButton = this.shadow.querySelector('.boton-envio');
        let clearButton = this.shadow.querySelector('.boton-limpiar');

        if (clearButton) {

            clearButton.addEventListener('click', event => {
            
                event.preventDefault();

                this.render();
            });
        }

        if (sendButton) {

            sendButton.addEventListener('click', event => {

                event.preventDefault();

                let form = this.shadow.querySelector('form');
                // let formularioInputs = formulario.elements;

                // console.log(formulario.elements);
                

                // if(!validador(formularioInputs)){
                //     return;
                // };

                let formData = new FormData(form);
                let formDataJson = Object.fromEntries(formData.entries());
                let url = API_URL + this.getAttribute("url");

                console.log(formDataJson);

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataJson)
                }).then(response => {
                    
                    if(response.status == "200"){   

                        document.dispatchEvent(new CustomEvent('message', {
                            detail: {
                                text: 'Formulario enviado correctamente',
                                type: 'exito'
                            }
                        }));

                        document.dispatchEvent(new CustomEvent('newData'));

                        this.render();
                    }

                    return response.json();

                }).catch(error => {
                    console.log(error);
                    document.dispatchEvent(new CustomEvent('message', {
                        detail: {
                            text: 'Se ha producido un error',
                            type: 'fallo'
                        }
                    }));
                });              
            });
        };
    }

    showElement = async id => {

        let url = `${API_URL}${this.getAttribute("url")}/${id}`;

        let result = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            }
        })

        let data = await result.json();

        for (const [key, value] of Object.entries(data)) {

            if(this.shadow.querySelector(`[name="${key}"]`)){
                this.shadow.querySelector(`[name="${key}"]`).value = value;
            }
        }
    }

    setFormStructure = async () => {
        
        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/user':

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
                                    name: {
                                        label: 'Nombre',
                                        element: 'input',
                                        maxLength: '10',
                                        type: 'text',
                                        placeholder: '',
                                        required: true,
                                        validate: 'solo-letras'
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
                            }  
                        }
                    }
                }
            };
            case '/api/admin/all':

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
                                    // id:{
                                    //     element: 'input',
                                    //     type: 'hidden',
                                    // },
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
                                    // id:{
                                    //     element: 'input',
                                    //     type: 'hidden',
                                    // },
                                    image: {
                                        label: 'Imagen',
                                        element: 'input',
                                        type: 'file',
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

customElements.define('form-component', Form);