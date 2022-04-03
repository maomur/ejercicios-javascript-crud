export class Item {

    constructor(title, price, rent, sell, iconView){
        this.title = title;
        this.price = price;
        this.rent = rent;
        this.sell = sell;
        this.iconView = iconView;
        this.id = Math.ceil(Math.random() * 1000);
    }

}