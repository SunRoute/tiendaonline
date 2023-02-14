// COMPONENTES NATIVOS SE PUEDEN UTILIZAR CONJUNTAMENTE CON COMPONENTES DE CUALQUIER FRAMEWORK O LIBRERÍA (REACT, ANGULAR, VUE...)
class PageTitle extends HTMLElement {
    // LA CLASE DE UN COMPONENTE VA A EXTENDER UN ELEMENTO html. EL NOMBRE DEBE SER DESCRIPTIVO
    constructor() {
        super();
        // LAS DOS PRIMERAS LÍNEAS SIEMPRE ESTARÁN. super ES PARA TRAER TODOS LOS MÉTODOS Y PROPIEDADES DE htmlElement
        this.shadow = this.attachShadow({ mode: 'open' });
        // this.palabra (DECLARACIÓN DE PROPIEDAD) = TIENE COMO VALOR -CREAR EL shadow dom-
        this.title = this.getAttribute('title');
        // CAPTURA EL title (ATRIBUTO) DEL QUE TIENE EL HTML
    }
    // LA CLASE TIENE UN CONSTRUCTOR (QUE ES LO PRIMERO QUE ARRANCA) QUE PUEDE TENER PROPIEDADES Y MÉTODOS

    static get observedAttributes() { return ['title']; }
    // SE OBSERVAN LOS ATRIBUTOS DEL HTML Y SI ESTE CAMBIA, ARRANCARÁ attributeChangedCallback (*SEGUNDA FUNCIÓN)

    connectedCallback() {
        // ESTE MÉTODO SIEMPRE DEBE ESTAR EN UN COMPONENTE. ARRANCA EN CUANTO EL NAVEGADOR RENDERIZA LA PÁGINA (PRIMERA FUNCIÓN). TAMBIÉN EXISTE disconnectedCallback
        document.addEventListener("newUrl",( event =>{ 
            this.setAttribute('title', event.detail.title);
        }));
        // ESTÁ A LA ESCUCHA DE UN EVENTO Y, CUANDO ÉL SE DA, SE RECOGEN LOS DATOS Y SE APLICAN AL ATRIBUTO...
        this.render();
        //...Y ARRANCA EL RENDERIZADO
    }

    attributeChangedCallback(name, oldValue, newValue){
        // (*SEGUNDA FUNCIÓN). LOS 3 PARÁMETROS name: NOMBRE DEL ATRIBUTO, oldValue: NOMBRE ANTERIOR, newValue: NUEVO NOMBRE
        this.render();
        // DESPUÉS DE CAMBIAR EL ATRIBUTO, SE ACTUALIZA (RENDERIZA)
    }
    
    render() {
        
        this.shadow.innerHTML =
        // AL UTILIZAR LA PROPIEDAD this.shadow EN innerHTML, SE CREARÁ LA ESTRUCTURA PARA AÑADIRLA AL HTML.
        `
        <style>
            h2 {
                font-family: 'Ubuntu';
                font-size: 2rem;
                font-weight: 600;
                text-decoration: none;
                color: white;
            }
        </style>
        
        <h2>Administración ${this.title}</h2>
        `;
        // this.title ES EL ATRIBUTO
        // LAS COMILLAS `` PERMITEN ESCRIBIR VARIABLES DENTRO DEL CÓDIGO DE TEXTO
        
    }
}

customElements.define('page-title-component', PageTitle);
// CADA VEZ QUE EN EL HTML SE UTILIZA 'page-title-component', QUE SE CONVIERTE EN UNA ETIQUETA (EL NOMBRE TIENE QUE CONTENER UN GUIÓN MÍNIMO, MINÚSCULA), SE PONE EN MARCHA ESTE CONSTRUCTOR. ES DECIR, ARRANCARÁ PageTitle.
