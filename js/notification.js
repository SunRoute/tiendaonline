class Notification extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['text', 'type' ]; }

    connectedCallback() {

        document.addEventListener('message', (event => {

            let notificacion = this.shadow.querySelector('.notificacion');
            let notificacionMensaje = this.shadow.querySelector('.notificacion-mensaje');
            
            notificacionMensaje.innerHTML = event.detail.text;
            notificacion.classList.add(event.detail.type);
            notificacion.classList.add('activo');
    
            setTimeout(() => {
                notificacion.classList.remove('activo');
                notificacion.classList.remove(event.detail.type);
            }, 5000);
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
            .notificacion {
                font-family: 'Ubuntu';
                position: absolute;
                display: none;
                top: 0;
                right: 2rem;
            }
            .notificacion.activo {
                display: block;
            }
            .notificacion.exito {
                color: green;
            }
            .notificacion.fallo {
                color: red;
            }
            .notificacion p {
                font-size: 1.5rem;
                font-weight: bold;
            }  
        </style>
        
        <div class="notificacion">
            <p class="notificacion-mensaje"></p>
        </div>
        `;
        
    }

}

customElements.define('notification-component', Notification);