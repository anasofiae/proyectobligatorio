const URL_PRODUCT_INFO = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;

// Set product ID
function setProductId(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

// add class active 
function addClassActive() {
    let firstimg = document.querySelector(".carousel-item");
    firstimg.classList.add("active");
}

// Products info
fetch(URL_PRODUCT_INFO)
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .then(function (data) {
        let product = data;
        console.log(data);
        /* shows products info content*/
        let htmlContentToAppend = `
        <h1 class="py-3 border-bottom">${product.name}</h1>
        <h5 class="fw-bold mt-3">Precio</h5>
        <p>${product.currency} ${product.cost}</p>
        <h5 class="fw-bold">Descripción</h5>
        <p>${product.description}</p>
        <h5 class="fw-bold">Categoría</h5>
        <p>${product.category}</p>
        <h5 class="fw-bold">Cantidad de vendidos</h5>
        <p>${product.soldCount}</p> 
        `;
        document.getElementById("product-info").innerHTML += htmlContentToAppend;

        /* shows products image*/
        for (let image of product.images) {
            let imageContentToAppend = `
            <div class="carousel-item">
              <img src="${image}" class="d-block w-100" alt="produt-image">
            </div>`;
            document.getElementById("div-images").innerHTML += imageContentToAppend;
            addClassActive()
        }
        /* shows products related*/
        for (let productRelated of product.relatedProducts) {
            let relatedContentToAppend = `
            <div onclick="setProductId(${productRelated.id})" class="list-group-item border cursor-active">
              <img src="${productRelated.image}" class="img-thumbnail">
              <p class="text-center">${productRelated.name}</p>
            </div> `;
            document.getElementById("related-products").innerHTML += relatedContentToAppend;
        }
    });


// comment section    
let comments = [];
let stars = [];

function paintStar(score) {
    let star1 = document.getElementById("star1");
    let star2 = document.getElementById("star2");
    let star3 = document.getElementById("star3");
    let star4 = document.getElementById("star4");
    let star5 = document.getElementById("star5");
    stars = [star1, star2, star3, star4, star5];
    console.log(stars);

    for (let i = 0; i < 5; i++) {
        if (i < score) {
            stars[i].classList.add("checked");
        }
    }
}

fetch(COMMENTS_URL)
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .then(function (data) {
        comments = data;
        let commentsContentToAppend = '';

        for (let comment of comments) {
            commentsContentToAppend += `
                <div class="list-group-item border" id="comment">
                  <div>
                    <p class="fw-bold d-inline">${comment.user}</p>
                    <p class="d-inline"> - ${comment.dateTime} - </p>
                    <span class="fa fa-star d-inline" id="star1"></span>
                    <span class="fa fa-star d-inline" id="star2"></span>
                    <span class="fa fa-star d-inline" id="star3"></span>
                    <span class="fa fa-star d-inline" id="star4"></span>
                    <span class="fa fa-star d-inline" id="star5"></span>
                    <p class="d-inline"> - ${comment.score}</p>
                 </div>
                  <small>${comment.description}</small>
                </div>`;
            document.getElementById("div-comments").innerHTML = commentsContentToAppend;
        }

    });

//add new comment

