class DeleteModal extends HTMLElement {

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

        document.addEventListener("showDeleteModal",( event => {
            this.setAttribute("id", event.detail.id);
            this.showModal();
        }));   
        
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            .modal-eliminar-contenedor {
                display: none;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0,0,0,.3);
                // filter: blur(15px);
            }
            .modal-eliminar-contenedor.activo {
                display: block;
            }
            .modal-eliminar {
                font-family: 
                top: 20vh;
                left: 40%;.
                position: absolute;
                background-color:white;
                border: #ffa047 3px solid;
                border-radius: 0.5rem;
                width: 20%;
                height: 12%;
            }

        </style>
        <div class="modal-eliminar-contenedor">
            <div class="modal-eliminar">
                <p class="modal-eliminar-mensaje">¿Seguro?</p>
                <button class="custom-button">SÍ</button>
                <button class="custom-button">NO</button>
            </div>
        </div>
        `;

        this.renderButtons();
    }

    async renderButtons(){


    }

    async showModal(){

        this.shadow.querySelector(".modal-eliminar-contenedor").classList.add("activo");

    }
}

customElements.define('delete-modal-component', DeleteModal);