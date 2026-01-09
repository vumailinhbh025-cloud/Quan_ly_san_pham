import { Product } from "../models/Product.js"

let arrProduct = [];
document.querySelector('#btnAddProduct').onclick = function () {
    //input: product: object
    let product = new Product();
    let arrInput = document.querySelectorAll('#form_product .form-control, #form_product .form-select');
    for (let input of arrInput) {
        let { id, value, style } = input;
        product[id] = value;
        style.color = '#fff';
    }
    arrProduct.push(product);
    console.log(arrProduct);
    //Gọi hàm từ mảng product tạo ra table product
    loadTableProduct(arrProduct);
}
                                                
window.loadTableProduct = function (arrProd){ 
    let htmlTr = '';
    for(let prod of arrProd){
        htmlTr += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.name}</td>
                <td>${prod.price}</td>
                <td>${prod.img}</td>
                <td>${prod.type}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct('${prod.id}')">Delete</button>
                    <button class="btn btn-primary mx-2" onclick="edit('${prod.id}')">Edit</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tblProduct').innerHTML = htmlTr;
}
