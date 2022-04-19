export class Item {

    constructor(title, price, rent, sell, type){
        this.title = title;
        this.price = price;
        this.rent = rent;
        this.sell = sell;
        this.iconView = false;
        this.type = type;
        this.id = Math.ceil(Math.random() * 1000);
    }
    changeSeen(){
         this.iconView = !this.iconView;
     }
}   
