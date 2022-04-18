import { Item } from './Item.js'

class App {

    arrayItems = [];

    //Cazamos los elementos

    inputTitle = document.querySelector('#inputTitle');
    inputPrice = document.querySelector('#inputPrice');
    inputRent = document.querySelector('#inputRent');
    inputSell = document.querySelector('#inputSell');
    btnAdd = document.querySelector('#btnAdd');
    boxTitle = document.querySelector('#boxTitle');
    boxRent = document.querySelector('#boxRent');
    boxSell = document.querySelector('#boxSell');
    boxPrice = document.querySelector('#boxPrice');
    boxIcons = document.querySelector('#boxIcons');
    containerItems = document.querySelector('#containerItems');
    btnSort = document.querySelector('#sort');
    btnUnseen = document.querySelector('#unseen');
    filterType = document.querySelector('#filter');
    btnClearLS = document.querySelector('#clearLS')
    
    editMode = false;
    currentId = 0;



    constructor(){
        this.btnAdd.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick();
        })
        
        
        if(localStorage.getItem('ITEMS')){
            this.arrayItems = JSON.parse(localStorage.getItem('ITEMS'));
            this.readtItems();  
        }

        this.btnClearLS.addEventListener('click', ()=> {
            const confirmClear = confirm('¿Está seguro que desea borrar TODA la información de la aplicaicón?');
            if(!confirmClear){
                return;
            }
            localStorage.clear();
            location.reload();
        });
        
        this.btnSort.addEventListener('click', ()=> {
            this.sortItems();
        })

        this.btnUnseen.addEventListener('click', ()=> {
            this.unSeen(this.item.id);
        })

        this.filterType.addEventListener('change', ()=> {
            this.filter();
        })

        
    }
    

    filter(item){

        if(item.rent.checked === true){            
            this.arrayItems = this.arrayItems.filter( (item) => {
                return item.type === this.filterType.value
                
                // return item.type === this.filterType.value
            })
        }
        this.readtItems();
    }

    unSeen(){
        this.arrayItems = this.arrayItems.filter( (item)=> {
            if(item.iconView === false){
                return
            }
        })
    }

    sortItems(){
        this.arrayItems.sort( (itemA, itemB)=> {
            if(itemA.title > itemB.title){
                return 1;
            } else {
                return -1
            }
        });
        this.readtItems();
    }

    handleClick(){

        if(this.editMode){
            this.updateItem(inputTitle.value, inputPrice.value, inputRent.checked, inputSell.checked);
        }else{
            this.addItem(inputTitle, inputPrice, inputRent, inputSell);
        }
    }
    

    updateLocalS(){
            localStorage.setItem('ITEMS', JSON.stringify(this.arrayItems));
    }

    addItem(inputTitle, inputPrice, inputRent, inputSell){
        const newItem = new Item(inputTitle.value, inputPrice.value, inputRent.checked, inputSell.checked);
            this.arrayItems.push(newItem);
            this.containerItems.className = 'd-block';

            this.updateLocalS();

            this.createItem();
    }

    createItem(){
        this.boxPrice.innerHTML = "";
        this.boxRent.innerHTML = "";
        this.boxSell.innerHTML = "";
        this.boxTitle.innerHTML = "";
        this.boxIcons.innerHTML = "";
        
        this.arrayItems.forEach( (item) => {
            //Creamos elemento Li para el TÍTULO del Item
            const liTitle = document.createElement('li');
            liTitle.dataset.id = item.id;
            liTitle.classList.add('my-2', 'border-item');
            liTitle.append(item.title);
            this.boxTitle.append(liTitle);
            
                       
            //Creamos elemento Li para el input SALE del Item
            const liSell = document.createElement('li');
            liSell.classList.add('list-unstyled', 'my-2', 'border-item');

            if(item.sell){
                this.newItemSell = liSell.innerHTML = '✔'
            } else {
                this.newItemSell = liSell.innerHTML = '✖'
            }
            boxSell.append(liSell);
            
            //Creamos elemento Li para el input RENT del Item
            const liRent = document.createElement('li');
            liRent.classList.add('list-unstyled', 'my-2', 'border-item');

            if(item.rent){
                this.newItemRent = liRent.innerHTML = '✔'
            }else{
                this.newItemRent = liRent.innerHTML = '✖'
            }
            boxRent.append(liRent);
            this.inputRent.checked = "";
            
            //Creamos elemento Li para el input PRICE del Item
            const liPrice = document.createElement('li');
            liPrice.classList.add('list-unstyled', 'my-2', 'border-item');
            liPrice.append(item.price);
            boxPrice.append(liPrice);
            this.inputPrice.checked = "";
            
            
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-center');
            
            //Creamos los ICONOS
            
            
            const iconView = document.createElement('span');
            iconView.dataset.id = item.id;

            if(item.iconView === true){
                this.newViewIcon = iconView.innerHTML = '✅';
            } else {
                this.newViewIcon = iconView.innerHTML = '⬛';
            }
            iconView.classList.add('iconEdit', 'ico', 'border-item', 'mx-2');

            const iconEdit = document.createElement('span');
            iconEdit.classList.add('iconEdit', 'ico', 'border-item', 'mb-2');
            iconEdit.dataset.id = item.id;
            iconEdit.innerHTML = '📝';
            
            const iconDelet = document.createElement('span');
            iconDelet.classList.add('iconDelet', 'ico', 'border-item', 'mb-2');
            iconDelet.dataset.id = item.id;
            iconDelet.innerHTML = '🗑';
            
            li.append(iconView, iconEdit, iconDelet);
            this.boxIcons.append(li);


            //LISTENERS
            iconDelet.addEventListener('click', (e)=> this.deleteItem(e));
            iconEdit.addEventListener('click', ()=> this.editItem(item.id));
            iconView.addEventListener('click', ()=> this.viewItem(item.id));
            


            this.inputTitle.value = "";
            this.inputPrice.value = "";
            this.inputSell.checked = "";
            this.inputRent.checked = "";
            this.inputTitle.focus();
        })
    }
    


    readtItems(){
        this.createItem();
    }


 

    editItem(id){
        const itemUpdate = this.arrayItems.find( (item)=> { 
            return item.id === id})
            console.log(itemUpdate)

            this.inputTitle.value = itemUpdate.title;
            this.inputPrice.value = itemUpdate.price;
            this.inputSell.checked = itemUpdate.sell;
            this.inputRent.checked = itemUpdate.rent;
            this.editMode = true;
            this.currentId = itemUpdate.id;
            this.btnAdd.innerText = "Actualizar";
            this.btnAdd.classList.replace('btn-dark', 'btn-success');
    }

    updateItem(inputTitle, inputPrice, inputRent, inputSell, filterType){
        this.arrayItems = this.arrayItems.map( (item)=> {
            if(item.id === this.currentId){
                return {...item, title: inputTitle, price: inputPrice, rent: inputRent, sell: inputSell, type: filterType}
            }else{
                return item;
            }
        })
        this.currentId = 0;
        this.editMode = false;
        this.btnAdd.innerText = "Añadir";
        this.btnAdd.classList.replace('btn-success', 'btn-dark');
        this.readtItems();
        this.updateLocalS();
    }

    //NO FUNCIONA AÚN
    viewItem(id){
        this.arrayItems = 
        this.arrayItems.map( (item)=> {
            if(item.id === id){
                return {...item, iconView: !this.iconView};
             } else {
                 return item;
             }
         })
         this.updateLocalS();
         console.log(this.arrayItems)
         this.readtItems();
         
    }


    deleteItem(e){
        const confirmDelet = confirm('¿Está seguro que desea eliminar esta propiedad?')
        if(!confirmDelet){
            return
        }
        this.arrayItems = this.arrayItems.filter((item)=> {
            return item.id != e.target.dataset.id;
        });
        this.updateLocalS();
        this.readtItems();
    }

}

const app = new App();
