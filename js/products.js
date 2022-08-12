const AUTOS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let autosArray = [];
console.log()

fetch(AUTOS_URL)
    .then(function (response) {
        console.log()
        return response.json()
    })
    .then(function (data) {
        autosArray = data.products;
        console.log(autosArray);
        let listaProductos = document.getElementById('lista-productos');

        let htmlContentToAppend = '';
        for (let products of autosArray) {
            console.log(products);
            htmlContentToAppend += `
            <div class="products">
            <img src="${products.image}" class="products-img">
            <h2>${products.name + products.currency + products.cost}</h2>
            <p>${products.description}</p>
            <p>${products.soldCount}
            </div>
            `;
        }
        listaProductos.innerHTML += htmlContentToAppend;

    });
