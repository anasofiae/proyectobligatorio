const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let subtotalCost = '';

let articlesArray = [];

function showArticles() {
    let htmlContentToAppend = '';
    for (let article of articlesArray) {
        subtotalCost = article.count * article.unitCost;
        htmlContentToAppend = `
        <tr class="border-bottom align-middle p-2">
          <td><img src="${article.image}" class="article-image"></td>
          <td>${article.name}</td>
          <td>${article.currency} ${article.unitCost}</td>
          <td><input type="number" value="${article.count}" name="articleCount" class="input-count" id="input-count"</td>
          <td class="w-25" id="sub-total">${article.currency} ${subtotalCost}</td>
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

        let inputCount = document.getElementById("input-count");
        // Change subtotal cost
        inputCount.addEventListener('change', e => {

            for (let article of articlesArray) {
                let subTotalTd = document.getElementById("sub-total");
                subtotalCost = e.target.value * article.unitCost;
                subTotalTd.textContent = `${article.currency} ${subtotalCost}`;           
        }});
        
    });

   