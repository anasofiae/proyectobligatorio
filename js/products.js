const CAR_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let productsArray = [];
console.log()

fetch(CAR_URL)
    .then(function (response) {
        console.log()
        return response.json()
    })
    .then(function (data) {
        productsArray = data.products;
        console.log(productsArray);
        let productsList = document.getElementById('products-list');

        let pProducts = document.getElementById('p-products');
        pProducts.innerHTML +=' ' + data.catName;

        let htmlContentToAppend = '';
        for (let products of productsArray) {
            console.log(products);
            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
             <div class="products row">
               <div class="col-3">
                   <img src="${products.image}" class="img-thumbnail">
               </div>
               <div class="col">
                   <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                      <small class="text-muted">${products.soldCount} vendidos </small>
                   </div>
                   <p class="mb-1">${products.description}</p>
               </div>
             </div>
            </div> 
            `;
        }
        productsList.innerHTML += htmlContentToAppend;

    });
