const productImage = document.querySelector('.main-img');
const productTitle = document.querySelector('.product-title');
const productPrice = document.querySelector('.product-price');
const productDescription = document.querySelector('.product-description');

fetch('/src/db/products.json')
    .then(response => response.json())
    .then(json => {
        const produto = json[0];

        productImage.src = produto['main-img'];
        productTitle.innerHTML = produto['title'];
        productPrice.innerHTML = produto['price'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        productDescription.style['text-align'] = 'justify'
        productDescription.innerHTML = produto['description'];
    })