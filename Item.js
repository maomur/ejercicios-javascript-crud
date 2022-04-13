export class Item {

    constructor(title, price, rent, sell){
        this.title = title;
        this.price = price;
        this.rent = rent;
        this.sell = sell;
        this.iconView = true;
        this.id = Math.ceil(Math.random() * 1000);
    }
}