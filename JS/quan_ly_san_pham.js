import { Product } from "../models/Product.js" 

let arrProduct = []
document.querySelector("#btnAddProduct").onclick = function (){
    let product = new Product();
    let arrInput = document.querySelectorAll("#form_product .form-control, #form_product .form-select")
    for (let input of arrInput){
        let {id, value} = input;
        product[id] =value; 
    }
    arrProduct.push(product);
    console.log(arrProduct)
    //Goi ham tao bang
    loadTableProduct(arrProduct);
    //Luu du lieu vao localstorage
    saveProducts();
}

window.loadTableProduct = function(arrProd){
    let htmlTr = "";
    for (let prod of arrProd){
        htmlTr += `
        <tr>
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.price}</td>
            <td>${prod.img}</td>
            <td>${prod.type}</td>
            <td>
            <button class="btn btn-danger" onclick ="deleteProduct('${prod.id}')">Delete</button>
            <button class="btn btn-primary" onclick ="edit('${prod.id}')">Edit</button>
            </td>
        </tr>`
    }
    document.querySelector("#tblProduct").innerHTML = htmlTr;
}

// Xoa san pham
window.deleteProduct = function (idProductClick){
    let indexDel = arrProduct.findIndex((prod) => prod.id == idProductClick);
    if(indexDel != -1){
        arrProduct.splice(indexDel,1)
    }
    loadTableProduct(arrProduct)
}

/** -------------------------------------------*/
//Luu du lieu vao localstorage
window.saveProducts = function(){
    let sProduct= JSON.stringify(arrProduct);
    localStorage.setItem("arrProduct", sProduct);
}

//Lay du lieu tu localstorage de hien thi len giao dien
window.getProducts = function(){
    if(localStorage.getItem("arrProduct")){
        let sProduct = localStorage.getItem("arrProduct");
        arrProduct = JSON.parse(sProduct); 
        loadTableProduct(arrProduct)
    }
}

//Goi ham khi trang duoc tai lai
getProducts()

/** -------------------------------------------*/

//edit du lieu
window.edit = function(idEdit){
    let prodEdit = arrProduct.find((prod) => prod.id == idEdit);
    if(prodEdit){
        let arrInput = document.querySelectorAll("#form_product .form-control, #form_product .form-select");
        for(let input of arrInput){
            input.value = prodEdit[input.id]
        }
    }
    document.querySelector("#id").disabled = true; 
}

document.querySelector('#btnUpdate').onclick = (e)=>{
    //Lấy toàn bộ dữ liệu trên giao diện đưa vào object
    //input: object sau khi người dùng sửa
    let prodUpdate = new Product();
    let arrInput = document.querySelectorAll('#form_product .form-control, #form_product .form-select');
    for(let input of arrInput){
        let {id,value} = input;
        prodUpdate[id] = value;
    }
    console.log('prod',prodUpdate);
    //phần tử có id giống id trên giao diện được thay đổi dữ liệu tương ứng
    let prodArray = arrProduct.find(item => item.id == prodUpdate.id); //Tìm product trong mảng xem product nào chứa id giống id trên giao diện -> lấy ra
    if(prodArray){
        // prodArray.id = prodUpdate.id;
        prodArray.name = prodUpdate.name;
        prodArray.price = prodUpdate.price;
        prodArray.type = prodUpdate.type;
        prodArray.img = prodUpdate.img;
    }
    //Sau khi cập nhật dữ liệu trong mảng thì từ mảng tạo ra lại giao diện
    loadTableProduct(arrProduct);
    saveProducts();
    document.querySelector("#id").disabled= false;
}
//trigger đến nút btnClear (kêu nút clear click đi )
    document.querySelector('#btnClear').click();


// Search san pham
document.querySelector('#frmSearch').onsubmit = (e) => {
    e.preventDefault();
    let keyword = document.querySelector("#keyword").value; 
    keyword = ToSlug(keyword);
    let arrProductSearch = arrProduct.filter((prodItem) => ToSlug(prodItem.name).search(keyword) !=-1); 
    loadTableProduct(arrProductSearch)
}

window.ToSlug = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')                    // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')     // bỏ dấu
    .replace(/[^a-z0-9\s]/g, '')         // giữ chữ, số, khoảng trắng
    .trim()
    .replace(/\s+/g, '-');               // khoảng trắng -> dấu gạch
}