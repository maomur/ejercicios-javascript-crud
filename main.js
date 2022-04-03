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



    constructor(){
        this.btnAdd.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick();
        })
    }


    handleClick(){
        const newItem = new Item(inputTitle.value, inputPrice.value, inputRent.checked, inputSell.checked);
        this.arrayItems.push(newItem);
        this.createItem();
        this.containerItems.className = 'd-block';

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
            liTitle.classList.add();
            liTitle.dataset.id = item.id;
            liTitle.append(item.title);
            this.boxTitle.append(liTitle);
            
                       
            //Creamos elemento Li para el input SALE del Item
            const liSell = document.createElement('li');
            liSell.classList.add('list-unstyled', 'my-1');

            if(item.sell){
                this.newItemSell = liSell.innerHTML = '✔'
            } else {
                this.newItemSell = liSell.innerHTML = '✖'
            }
            boxSell.append(liSell);
            
            //Creamos elemento Li para el input RENT del Item
            const liRent = document.createElement('li');
            liRent.classList.add('list-unstyled', 'my-1');

            if(item.rent){
                this.newItemRent = liRent.innerHTML = '✔'
            }else{
                this.newItemRent = liRent.innerHTML = '✖'
            }
            boxRent.append(liRent);
            this.inputRent.checked = "";
            
            //Creamos elemento Li para el input PRICE del Item
            const liPrice = document.createElement('li');
            liPrice.classList.add('list-unstyled', 'my-1');
            liPrice.append(item.price);
            boxPrice.append(liPrice);
            this.inputPrice.checked = "";
            
            
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-center');
            
            //Creamos los ICONOS
            
            
            const iconView = document.createElement('span');
            iconView.classList.add('iconView', 'mx-1', 'ico', 'mb-1');
            iconView.dataset.id = item.id;

            if(item.iconView){
                this.newIconView = iconView.innerHTML = '❤'
            } else {
                this.newIconView = iconView.innerHTML = '🤍'
            }
            iconView.innerHTML = '👁‍🗨';
            
            const iconEdit = document.createElement('span');
            iconEdit.classList.add('iconEdit', 'ico');
            iconEdit.dataset.id = item.id;
            iconEdit.innerHTML = '📝';
            
            const iconDelet = document.createElement('span');
            iconDelet.classList.add('iconDelet', 'ico');
            iconDelet.dataset.id = item.id;
            iconDelet.innerHTML = '🗑';
            
            li.append(iconView, iconEdit, iconDelet);
            this.boxIcons.append(li);

            //LISTENERS
            iconDelet.addEventListener('click', (e)=> this.deleteItem(e));
            iconEdit.addEventListener('click', ()=> this.editItem());
            iconView.addEventListener('click', (e)=> this.viewItem(e));
            


            this.inputPrice.value = "";
            this.inputTitle.value = "";
            this.inputSell.checked = "";
            this.inputRent.checked = "";
            this.inputTitle.focus();
        })
    }
    


    readtItems(){
        this.createItem();
    }


 

    editItem(){
        console.log('editItem OK')
    }


    updateItem(){
        console.log('update ok')
    }

    //NO FUNCIONA AÚN
    viewItem(e){
        this.arrayItems = 
        this.arrayItems.map( (item)=> {
            if(item.id === e.target.dataset.id){
                return {...item, iconView: !item.iconView}
            } else{
                return item
            }
        })
        this.readtItems();
        console.log(this.arrayItems)
    }


    deleteItem(e){
        const confirmDelet = confirm('¿Está seguro que desea eliminar esta propiedad?')
        if(!confirmDelet){
            return
        }
        this.arrayItems = this.arrayItems.filter((item)=> {
            return item.id != e.target.dataset.id;
        });
        this.readtItems();
    }

}

const app = new App();
