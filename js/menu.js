import {API_URL} from "../config/config.js";

class Menu extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.menu = this.getAttribute('menu');
        this.menuItems = [];
    }

    connectedCallback() {

        this.loadData().then( () => this.render());
    }

    async loadData() {

        let url = `${API_URL}/api/admin/menu/display/${this.menu}`;

        let result = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            }
        })

        let data = await result.json();
        this.menuItems = Object.values(data);
    }
    
    render() {
        
        this.shadow.innerHTML =
        `
        <style>
            ul{
                padding:0;
            }
            .icono-menu {
                position: absolute;
                z-index: 1000;
                top: -5rem;
                right: 1rem;
                cursor: pointer;
                width: 5rem;
            }
            #menuToggle {
                -webkit-user-select: none;
                user-select: none;
            }
            #menuToggle input {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: -7px;
            left: -5px;
            cursor: pointer;
            opacity: 0; /* hide this */
            z-index: 2; /* and place it over the hamburger */
            -webkit-touch-callout: none;
            }
            #menuToggle span {
            display: block;
            width: 3.5rem;
            height: 0.5rem;
            margin-bottom: 5px;
            position: relative;
            background: white;
            border-radius: 3px;
            z-index: 1;
            transform-origin: 4px 0px;
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.55s ease;
            }
            
            #menuToggle span:first-child {
            transform-origin: 0% 0%;
            }
            #menuToggle span:nth-last-child(2) {
            transform-origin: 0% 100%;
            }
            #menuToggle input:checked ~ span {
            opacity: 1;
            transform: rotate(45deg) translate(-2px, -1px);
            }
            #menuToggle input:checked ~ span:nth-last-child(2) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
            }
            #menuToggle input:checked ~ span:nth-last-child(1) {
            transform: rotate(-45deg) translate(-8px, -1px);
            }
            #menuToggle input:checked ~ ul {
            transform: none;
            }
            .menu-admin {
                position: absolute;
                background-color: #ffa047;
                z-index: 900;
                width: 100%;
                height: 100%;
                top: -100%;
                transition: top 0.4s;
            }

            .menu-admin.activo {
                top: 0;
                transition: top 0.4s;
            }

            .menu-admin nav {
                display: grid;
                grid-template-columns: repeat(3, minmax(12rem, 20rem));
                justify-content: space-around;
                margin-top: 10%;
                height: 80%;
            }
            .menu-admin-elemento ul li {
                font-family: 'Ubuntu';
                list-style: none;
                cursor: pointer;
                font-size: 1.4rem;
                margin: 1rem 0 ;
            }
            .menu-admin-elemento ul li a {
                text-decoration: none;
                color: #374343;
            }
            .menu-admin-elemento ul li a:hover {
                text-shadow: 0.05rem 0.05rem 0.6rem #f66e13;
                transform: scale(1.01,1.01);
            }
            .menu-admin:first-child {
                cursor: default;
                font-size: 1.5rem;
                font-weight: bold;
                text-shadow: none;
                transform: none;
            }
        </style>

         
        <div class="icono-menu" id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
        </div>
        
        <div class="menu-admin">
            <nav>
               
            </nav>
        </div>
        `;

        let menu = this.shadow.querySelector('nav');

        this.menuItems.forEach(menuItem => {

            let menuElements = document.createElement('div');
            menuElements.classList.add('menu-admin-elemento');
            menu.append(menuElements);

            let listElement = document.createElement('ul');
            menuElements.append(listElement);

            let itemElement = document.createElement('li');
            itemElement.textContent = menuItem.name;
            
            listElement.append(itemElement);

            this.createSubMenu(menuItem, itemElement ); 
        });

        let iconoMenu = this.shadow.querySelector(".icono-menu");
        let verMenu = this.shadow.querySelector(".menu-admin");

        iconoMenu.addEventListener('click', () => {
            
            verMenu.classList.toggle('activo');

        });

        let menuItems = this.shadow.querySelectorAll("a");

        menuItems.forEach(menuItem => {

            menuItem.addEventListener('click', event => {
                
                event.preventDefault();
                
                this.close();

                document.dispatchEvent(new CustomEvent('newUrl', {

                    detail: {
                           url: menuItem.getAttribute("href"),
                           title: menuItem.textContent
                        }

                })); 
            })
        })   
    }

    close(){

        this.shadow.querySelector(`[type="checkbox"]`).checked = false;
        this.shadow.querySelector(".menu-admin").classList.toggle("activo");
    }

    createSubMenu(menuItem, li) {

        if (menuItem.children) {
    
            let subMenu = document.createElement('ul');
            subMenu.classList.add('sub-menu');
            li.append(subMenu);
    
            Object.values(menuItem.children).forEach(subMenuItem => {
    
                let subLi = document.createElement('li');
                let subLink = document.createElement('a');
    
                subLink.setAttribute("href", subMenuItem.customUrl);
                subLink.textContent = subMenuItem.name;
    
                subLi.appendChild(subLink);
                subMenu.appendChild(subLi);
    
                this.createSubMenu(subMenuItem, subLi); 
            });
    
            li.appendChild(subMenu);
        }
    }
}

customElements.define('menu-component', Menu);
