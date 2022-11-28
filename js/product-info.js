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
   /*stars = document.querySelectorAll(".fa-star");
   console.log(stars);
   for (let i = 0; i < 5; i++) {
        if (i < score) {
            stars[i].classList.add("checked");
        }
    }*/
}

function addStars() {  
    for (let i = 0; i < 5; i++) {
        let star = document.createElement('span');
       
        document.getElementsByClassName("div-stars").appendChild(star);
        star.classList.add("fa", "fa-star", "d-inline")

        if (i < 5) {
            star.classList.add("checked");   
        }
    }
}

// Comments
fetch(COMMENTS_URL)
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .then(function (data) {
        comments = data;
        let commentsContentToAppend = '';

        for (let comment of comments) {
            let commentDiv= document.createElement("div");
            commentDiv.setAttribute("class","list-group-item border");
            commentDiv.setAttribute("id","comment");
            
            commentsContentToAppend = `
                  <div>
                    <p class="fw-bold d-inline">${comment.user}</p>
                    <p class="d-inline"> - ${comment.dateTime} - </p>
                    <div class="div-stars"></div>
                 </div>
                  <small>${comment.description}</small>
               `;
                commentDiv.innerHTML = commentsContentToAppend;
                document.getElementById("div-comments").appendChild(commentDiv);        
        }

    });

//add new comment

