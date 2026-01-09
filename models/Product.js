export class Product { 
    id = 0;
    name = '';
    price = 0;
    img = '';
    type = '';
    
    //constructor: hàm khởi tạo
    constructor(_id = 0, _name = '', _price = 0, _img = '') {
        this.id = _id;
        this.name = _name;
        this.price = _price;
        this.img = _img;
    }

}