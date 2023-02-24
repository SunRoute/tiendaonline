import {API_URL} from "../config/config.js";

class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url =  this.getAttribute('url');
        this.data = [];
        this.total = null;
        this.lastPage = null;
        this.currentPage = null;
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {
        
        document.addEventListener("newUrl",( event => {
            this.setAttribute('url', event.detail.url);
        }));

        document.addEventListener("newData",( event => {
            this.loadData().then( () => this.render());
        }));

        document.addEventListener("deletedData",( event => {
            this.loadData().then( () => this.render());
        }));

        
           
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.loadData().then( () => this.render());
    }

    async loadData(pagination) {

        let url = pagination ? `${API_URL}${this.getAttribute("url")}?page=${pagination}`:`${API_URL}${this.getAttribute("url")}`;

        let result = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            }
        })

        let data = await result.json();
        this.data = data.rows;
        console.log(data.meta);

        this.total = data.meta.total;
        this.lastPage = data.meta.pages;
        this.currentPage = data.meta.currentPage;
    }

    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            .registros {
                font-family: 'Ubuntu';
                padding: 4rem 2rem 0.5rem;
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
            .table-pagination {
                margin: 0 2rem;
            }
            .table-pagination .table-pagination-info {
                color: #374343;
                display: flex;
                font-family: 'Ubuntu', sans-serif;
                justify-content: space-between;
            }
            .table-pagination .table-pagination-buttons p {
                color: #374343;
                font-family: 'Ubuntu', sans-serif;
                margin: 1.1rem 0;
            }
            .table-pagination-info p{
                margin: 0;
            }
            .table-pagination .table-pagination-button {
                cursor: pointer;
                margin-right: 1rem;
            }
       
            .table-pagination .table-pagination-button:hover {
                color: #ffa047;
            }
            .table-pagination .table-pagination-button.inactive {
                color: hsl(0, 0%, 69%);
            }

        </style>
        
        <div class="registros">
        </div>

        <div class="table-pagination">
            <div class="table-pagination-info">
                <div class="table-pagination-total"><p><span id="total-page">${this.total}</span> registros</p></div>
                <div class="table-pagination-pages"><p>Página <span id="current-page">${this.currentPage}</span> de <span id="last-page">${this.lastPage}</span></p></div>
            </div>
            <div class="table-pagination-buttons">
                <p>
                    <span class="table-pagination-button" id="firstPageUrl">Primera</span>
                    <span class="table-pagination-button" id="previousPageUrl">Anterior</span>
                    <span class="table-pagination-button" id="nextPageUrl">Siguiente</span>
                    <span class="table-pagination-button" id="lastPageUrl">Última</span>
                </p>
            </div>
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

        this.renderPagination();
    }

    renderPagination() {

        let firstPageButton = this.shadow.querySelector('#firstPageUrl');
        let previousPageButton = this.shadow.querySelector('#previousPageUrl');
        let nextPageButton = this.shadow.querySelector('#nextPageUrl');
        let lastPageButton = this.shadow.querySelector('#lastPageUrl');
        
        firstPageButton.addEventListener('click', event => {
            this.loadData().then( () => this.render());
        });

        previousPageButton.addEventListener('click', event => {

            if (this.currentPage > 1) {
                let previousPage = parseInt(this.currentPage) - 1;
                this.loadData(previousPage).then( () => this.render());
            }
        });

        nextPageButton.addEventListener('click', event => {

            if (this.currentPage < this.lastPage) {
                let nextPage = parseInt(this.currentPage) + 1;
                this.loadData(nextPage).then( () => this.render());
            } 
        });

        lastPageButton.addEventListener('click', event => {
            this.loadData(this.lastPage).then( () => this.render()); 
        });
    }

    setTableStructure() {

        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/business':

            return {
                headers:{
                    tradingName: {
                        label: 'Nombre',
                    },
                    cif: {
                        label: 'CIF',
                    },
                    phone: {
                        label: 'Teléfono',
                    },
                    email: {
                        label: 'Email',
                    },
                    adress: {
                        label: 'Dirección',
                    },
                    city: {
                        label: 'Ciudad',
                    },
                    postalCode: {
                        label: 'Código postal',
                    },
                    timetable: {
                        label: 'Horario de apertura',
                    },
                    openingDays: {
                        label: 'Días de apertura',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

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

            case '/api/admin/customer':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    surname: {
                        label: 'Apellidos',
                    },
                    phone: {
                        label: 'Teléfono',
                    },
                    email: {
                        label: 'Email',
                    },
                    cif: {
                        label: 'CIF',
                    },
                    adress: {
                        label: 'Dirección',
                    },
                    city: {
                        label: 'Ciudad',
                    },
                    postalCode: {
                        label: 'Código postal',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };
            
            case '/api/admin/contact':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    surname: {
                        label: 'Apellidos',
                    },
                    phone: {
                        label: 'Teléfono',
                    },
                    email: {
                        label: 'Email',
                    },
                    message: {
                        label: 'Mensaje',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

            case '/api/admin/menu':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    customUrl: {
                        label: 'URL',
                    },
                    order: {
                        label: 'Posición',
                    },
                    parentId: {
                        label: 'Menú al que pertenece',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

            case '/api/admin/language':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    alias: {
                        label: 'Alias',
                    },
                    visible: {
                        label: 'Visible',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

            case '/api/admin/product-category':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    visible: {
                        label: 'Visible',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

            case '/api/admin/product':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    price: {
                        label: 'Price',
                    },
                    featured: {
                        label: 'Destacado',
                    },
                    visible: {
                        label: 'Visible',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };
            
            case '/api/admin/faq-category':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    descripcion: {
                        label: 'Descripción',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };
            
            case '/api/admin/faq':

            return {
                headers:{
                    question: {
                        label: 'Pregunta',
                    },
                    answer: {
                        label: 'Respuesta',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };
            
            case '/api/admin/payment-method':

            return {
                headers:{
                    name: {
                        label: 'Nombre',
                    },
                    visible: {
                        label: 'Visible',
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
                    },
                    valid: {
                        label: 'Válido',
                    }
                },
                buttons: {
                    edit: true,
                    delete: true
                }
            };

            case '/api/admin/book':

            return {
                headers:{
                    title: {
                        label: 'Título',
                    },
                    author: {
                        label: 'Autor',
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


