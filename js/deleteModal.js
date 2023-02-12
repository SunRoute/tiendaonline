import {API_URL} from "../config/config.js";

class DeleteModal extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url =  this.getAttribute('url');
        this.id = this.getAttribute('id');
    }

    static get observedAttributes() { return ['url', 'id']; }

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
        console.log(this.id);
    }

    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            .modal-eliminar-contenedor {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 5000;
            }
            .modal-eliminar-contenedor.activo {
                display: block;
            }
            .modal-eliminar-transparencia {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0,0,0,.7);
                // filter: blur(15px);
                
            }
            .modal-eliminar {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-family: ubuntu;
                color: white;
                font-size: 1.4rem;
                position: absolute;
                background-color: #ffa047;
                border: white 3px solid;
                border-radius: 0.5rem;
                padding: 2rem;
            }
            .custom-button {
                cursor: pointer;
                border: white 2px solid;
                background-color: #ffa047;
                color: white;
                font-size: 1rem;
                font-weight: bold;
                margin: 0 1.5rem;
                border-radius: 0.5rem;
                padding: 0.5rem 2rem;
                box-shadow: 0 0 1.5rem 0.1rem #ff4400 inset;
            }
            .custom-button:hover {
                box-shadow: 0 0 1.3rem 0.1rem #ff4400 inset;
            }
        </style>
        <div class="modal-eliminar-contenedor">
            <div class="modal-eliminar-transparencia">
                <div class="modal-eliminar">
                    <div class="modal-eliminar-mensaje">
                        <p class="modal-eliminar-mensaje">¿Está seguro de que quiere eliminar el registro?</p>
                    </div>
                    <div class="modal-eliminar-accion">
                        <button class="custom-button boton-confirmacion">SÍ</button>
                        <button class="custom-button boton-retroceder">NO</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.renderButtons();
    }

    async renderButtons(){

        let deleteConfirmationButton = this.shadow.querySelector('.boton-confirmacion');
        let backOutButton = this.shadow.querySelector('.boton-retroceder');

        if (backOutButton) {

            backOutButton.addEventListener('click', event => {
            
                this.id = this.removeAttribute('id');
                
            });
        }
        if (deleteConfirmationButton) {

            deleteConfirmationButton.addEventListener('click', event => {   
                
            });
        }
        

    }

    async showModal(){

        this.shadow.querySelector(".modal-eliminar-contenedor").classList.add("activo");

    }
}

customElements.define('delete-modal-component', DeleteModal);