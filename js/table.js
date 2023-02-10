import {API_URL} from "../config/config.js";

class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url =  this.getAttribute('url');
        this.data = [];
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {
        
        document.addEventListener("newUrl",( event => {
            this.setAttribute('url', event.detail.url);
        }));

        document.addEventListener("newData",( event => {
            this.loadData().then( () => this.render());
        }));   
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.loadData().then( () => this.render());
    }

    async loadData() {

        let url = `${API_URL}${this.getAttribute("url")}`;

        let result = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            }
        })

        let data = await result.json();
        this.data = data.rows;
    }

    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            .registros {
                font-family: 'Ubuntu';
                padding: 4rem 2rem;
            }
            .registro {
                display: grid;
                grid-template-columns: 12fr 1fr;
                border: #ffa047 3px solid;
                border-left: none ;
                border-right: none;
                padding: 1.7rem 1rem;
                margin-bottom: 1rem;
            }
            .action-buttons {
                display: flex;
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
            span {
                font-weight: 600;
            }
        </style>
        
        <div class="registros">
        </div>
        `;
        
        let tableStructure = this.setTableStructure();
        let table = this.shadow.querySelector('.registros');

        this.data.forEach(element => {

            // console.log(element);
            let records = document.createElement('div');
            records.classList.add('registro');
            table.append(records);

            let dataText = document.createElement('div');
            dataText.classList.add('registro-dato');
            
            for (const [key, value] of Object.entries(element)) {

                if (Object.keys(tableStructure.headers).includes(key)) {
                    
                    dataText.innerHTML +=  `<p><span>${tableStructure.headers[key].label}:</span> ${value}</p>`
                }
            }

            records.append(dataText);   
            
            // let details = document.createElement('div');
            // details.classList.add('registro-dato');
            // records.append(details);

            // Object.values(element).forEach(detail => {
            //     console.log(detail)
            //     let detailText = document.createElement('p');
            //     detailText.innerHTML = detail;
            //     details.append(detailText);
            // });


            let actionButtons = document.createElement('div');
            actionButtons.classList.add('action-buttons');
        
            for (const [key, value] of Object.entries(tableStructure.buttons)) {
                if(value){
                    let button = document.createElement('button');
                    button.classList.add('boton-admin', `${key}-button`);
                    button.setAttribute('id', element.id);

                    if(key == "edit"){

                        button.innerHTML =
                            `
                            <svg  viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                            `;
                    }

                    else if(key == "delete"){

                        button.innerHTML =
                            `
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                            `;               
                        }

                    actionButtons.append(button);
                }
            }
            records.append(actionButtons);
        });   

        this.renderAction();
    }

    renderAction() {

        let editButtons = this.shadow.querySelectorAll('.edit-button');
        let deleteButtons = this.shadow.querySelectorAll('.delete-button');

        editButtons.forEach( editButton => {

            editButton.addEventListener('click', event => {                
                document.dispatchEvent(new CustomEvent('showData', {
                    detail: {
                        id: editButton.id
                    }
                }));
            })
        });  
        deleteButtons.forEach( deleteButton => {

            deleteButton.addEventListener('click', event => {                
                document.dispatchEvent(new CustomEvent('showDeleteModal', {
                    detail: {
                        id: deleteButton.id
                    }
                }));
            })
        });  
    }

    setTableStructure() {

        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/user':

                return {
                    headers:{
                        name: {
                            label: 'Nombre',
                        },
                        email: {
                            label: 'Email',
                        }
                    },
                    buttons: {
                        edit: true,
                        delete: true
                    }
                };

            case '/api/admin/tax':

                return {
                    headers:{
                        type: {
                            label: 'Tipo',
                        }
                    },
                    buttons: {
                        edit: true,
                        delete: true
                    }
                };
        }
    }
}

customElements.define('table-component', Table);


