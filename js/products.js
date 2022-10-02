const PRODUCT_API_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;

let productsArray = [];
const ASC_BY_PRICE = "ascPrice";
const DESC_BY_PRICE = "descPrice";
const REL_ORDER = "rel";
let currentSortOrder = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Sort

function sortProducts(order, array) {
    let result = [];
    if (order === ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            return a.cost - b.cost
        });
    } else if (order === DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            return b.cost - a.cost
        });
    } else if (order === REL_ORDER) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            return bCount - aCount
        });
    }

    return result;
}

// set item local-storage
function setProductId(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

//Function that shows the products 
function showProducts() {
    let htmlContentToAppend = '';
    for (let products of productsArray) {
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(products.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(products.cost) <= maxPrice))) {

            htmlContentToAppend += `
        <div onclick="setProductId(${products.id})"  class="list-group-item list-group-item-action cursor-active div-products">
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
    }
    document.getElementById('products-list').innerHTML = htmlContentToAppend;
}

// Order the products
function showNewOrder(sortOrder, productsList) {
    currentSortOrder = sortOrder;

    if (productsList != undefined) {
        productsArray = productsList;
    }

    productsArray = sortProducts(currentSortOrder, productsArray);

    //Muestro las categorías ordenadas
    showProducts();
}

// fetch
fetch(PRODUCT_API_URL)
    .then(function (response) {
        console.log()
        return response.json()
    })
    .then(function (data) {
        productsArray = data.products;
        // Show name Category
        document.getElementById('p-products').innerHTML += ' ' + data.catName;
        // Show Products list
        showProducts();
    });

// Sort events
document.getElementById("sortAscPrice").addEventListener("click", function () {
    showNewOrder(ASC_BY_PRICE);
});

document.getElementById("sortDescPrice").addEventListener("click", function () {
    showNewOrder(DESC_BY_PRICE);
});

document.getElementById("sortRel").addEventListener("click", function () {
    showNewOrder(REL_ORDER);
});

// filter price

document.getElementById("filterPrice").addEventListener("click", function () {
    minPrice = document.getElementById("filterPriceMin").value;
    maxPrice = document.getElementById("filterPriceMax").value;

    if ((minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    }
    else {
        minPrice = undefined;
    }

    if ((maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    }
    else {
        maxPrice = undefined;
    }
    showProducts();
});

// Clean filters

document.getElementById("clearFilterPrice").addEventListener("click", function () {
    document.getElementById("filterPriceMin").value = "";
    document.getElementById("filterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts();;
});

//Search
document.getElementById("search").addEventListener("keyup", e => {


    if (e.target.matches("#search")){
                     
                document.querySelectorAll(".div-products").forEach(product =>{

                    product.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                      ?product.classList.remove("filtro")
                      :product.classList.add("filtro")
                })
            }

})
