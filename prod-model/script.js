const aditionalImgs = document.querySelector('.product-aditional-imgs');

aditionalImgs.innerHTML = '<div class="product-aditional-img"><img class="aditional-img" src="img/products/prancha-de-skate-santa-cruz-ryb-color/main-image.jpeg" alt=""></div>';
aditionalImgs.innerHTML += '<div class="product-aditional-img"><img src="img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-1.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-2.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-3.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-4.jpeg" class="aditional-img"></div>';

const aditionalImg = document.querySelectorAll('.product-aditional-img');

if (aditionalImg.length === 1) {
    aditionalImgs.style.display = 'none';
} else if (aditionalImg.length > 1 && aditionalImg.length <= 4) {
    aditionalImgs.style['justify-content'] = 'center';
}
