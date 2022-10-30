const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let subtotalCost = '';
let shippingCost = '';
let totalCost = '';
let articlesArray = [];
let htmlContentToAppend = '';
let generalSubtotal = document.getElementById("general-subtotal");
let pShippingCost = document.getElementById("shipping-cost");
let pPayMethod = document.getElementById("pay-method-selected");
let creditDiv = document.getElementById("div-credit");
let inputsCredit = creditDiv.getElementsByTagName("input");
let radioCredit = document.getElementById("credit");
let radioTransfer = document.getElementById("transfer");
let inputTransfer = document.getElementById("bank-account-number");

function showArticles() {
    for (let article of articlesArray) {
        subtotalCost = article.count * article.unitCost;
        htmlContentToAppend = `
        <tr class="border-bottom align-middle p-2">
          <td><img src="${article.image}" class="article-image"></td>
          <td>${article.name}</td>
          <td>${article.currency} ${article.unitCost}</td>
          <td><input type="number" value="${article.count}" name="articleCount" class="input-count" id="input-count" min="1" onchange="changeArticleSubtotal(), showCostList()" form="pay-form"></td>
          <td class="w-25 article-subtotal" id="article-subtotal">${article.currency} ${subtotalCost}</td>
          <td><button type="button" class="btn p-1" onclick="removeArticle()"><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>
        `;
    }
    document.getElementById("table-body").innerHTML = htmlContentToAppend;
}

fetch(CART_URL)
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .then(function (data) {
        articlesArray = data.articles;
        // show article content
        showArticles();
        // Show All Costs
        showCostList();
    });

function changeArticleSubtotal() {
    let inputCount = document.getElementById("input-count")

    for (let article of articlesArray) {
        let articleSubTotalP = document.getElementById("article-subtotal");
        subtotalCost = inputCount.value * article.unitCost;
        articleSubTotalP.textContent = `${article.currency} ${subtotalCost}`;
        localStorage.setItem('subtotalCost', subtotalCost);
    }
}

function showCostList() {
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");
    
    subtotalCost = JSON.parse(localStorage.getItem("subtotalCost"));
    // Show Subtotal cost of all products
    generalSubtotal.textContent = `USD ${subtotalCost}`;
    // Show shipping Cost
    if (premium.checked) {
        shippingCost = Math.round(subtotalCost * 0.15);
    } else if (express.checked) {
        shippingCost = Math.round(subtotalCost * 0.07);
    } else if (standard.checked) {
        shippingCost = Math.round(subtotalCost * 0.05);
    }
    pShippingCost.textContent = `USD ${shippingCost}`;
    // Show Total  Cost   
    totalCost = shippingCost + subtotalCost;
    document.getElementById("total-cost").textContent = `USD ${totalCost}`;
}

// Disabled inputs and add may method
document.getElementById("pay-method").addEventListener('change', function () {

    if (radioCredit.checked) {
        inputTransfer.disabled = true;
        for (let input of inputsCredit) {
            input.disabled = false;
        }
        pPayMethod.textContent = 'Tarjeta de crédito';
        pPayMethod.style.color = "black";
    }
    else if (radioTransfer.checked) {
        for (let input of inputsCredit) {
            input.disabled = true;
        }
        inputTransfer.disabled = false;
        pPayMethod.textContent = 'Transferencia bancaria';
        pPayMethod.style.color = "black";
    }
});

//Success alert

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

// form checkput validation
let formCheckout = document.forms['pay-form'];

formCheckout.addEventListener('submit', e => {
    let validityStateStreet = formCheckout.street.validity;
    let validityStateNumberDoor = formCheckout.number.validity;
    let validityStateCorner = formCheckout.corner.validity;
    let validityStateCount = formCheckout.articleCount.validity;
    let valid = true;

    // Street adress
    if (validityStateStreet.valueMissing) {
        formCheckout.street.style.border = "1px solid red";
        document.getElementById("street-error").textContent = "Ingresa una calle";
        valid = false;

    } else {
        formCheckout.street.style.border = "1px solid lightgrey";
        document.getElementById("street-error").textContent = "";
    }
    // Door number
    if (validityStateNumberDoor.valueMissing) {
        formCheckout.number.style.border = "1px solid red";
        document.getElementById("number-error").textContent = "Ingresa un número";
        valid = false;

    } else {
        formCheckout.number.style.border = "1px solid lightgrey";
        document.getElementById("number-error").textContent = "";
    }
    // Corner address
    if (validityStateCorner.valueMissing) {
        formCheckout.corner.style.border = "1px solid red";
        document.getElementById("corner-error").textContent = "Ingresa una esquina";
        valid = false;

    } else {
        formCheckout.corner.style.border = "1px solid lightgrey";
        document.getElementById("corner-error").textContent = "";
    }
    // Article count
    if (validityStateCount.rangeUnderflow) {
        formCheckout.articleCount.style.border = "1px solid red";
        valid = false;

    }
    // Pay method
    if (!radioCredit.checked && !radioTransfer.checked) {
        pPayMethod.style.color = "red";
        valid = false;

    }

    for (let input of inputsCredit) {
        if (radioCredit.checked && input.validity.valueMissing) {
            valid = false;
            document.getElementById("pay-method-data").textContent = "Debe ingresar los datos del pago.";
        }
    }

    if (radioTransfer.checked && inputTransfer.validity.valueMissing) {
        document.getElementById("pay-method-data").textContent = "Debe ingresar los datos del pago.";
        valid = false;

    }

    if (valid == false) {
        e.preventDefault();
    } else {
        showAlertSuccess();
        e.preventDefault();
        formCheckout.reset();
    }
});

//remove article
function removeArticle(){
 document.getElementById("table-body").innerHTML = "";
 //subtotalCost = 0;
 //generalSubtotal.textContent = `USD ${subtotalCost}`;
}