const cartGeneral = document.querySelector('.cart-general');
const cartProductsDiv = document.querySelector('.cart-products');
const cartProducts = localStorage.getItem('cart-products');
const clearCart = () => {
    cartGeneral.style['flex-direction'] = 'column';
    cartGeneral.innerHTML =
        '<p>Parece que ainda não há nenhum produto no seu carrinho...</p>' +
        '<p>Temos uma imensa variedade de produtos para os mais diversos gostos e estilos.</p>' +
        '<a href="/collections/?collection=all">Ver produtos...</a>'
}

!cartProducts ?
    clearCart() :
    fetch('/src/db/products.json')
        .then(res => res.json())
        .then(products => {

            const attCart = () => {
                const addedProducts = [];
                const cartProducts = localStorage.getItem('cart-products');
                if (!cartProducts) return;
                const jsonCartProducts = JSON.parse(cartProducts);

                for (let cartProduct of jsonCartProducts) addedProducts.push(products.find(product => product.name === cartProduct.name));

                cartProductsDiv.innerHTML = '';

                addedProducts.forEach((product, i) => {
                    cartProductsDiv.innerHTML +=
                        '<div class="cart-product">' +
                            `<a href="${product.url}"><img src="${product['main-img']}" alt="${product.name}"></a>` +
                            '<div class="cart-product-infos">' +
                                `<p class="cart-product-name"><strong class="cart-product-name-strong">${product.name}</strong></p>` +
                                `<p class="cart-product-total"><strong class="product-price">${(product.price * jsonCartProducts[i].quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong><small>${product['price-no-discount'] ? (product['price-no-discount'] * jsonCartProducts[i].quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</small></p>` +
                                '<div class="cart-product-quantity">' +
                                    '<button class="product-quantity-sub">-</button>' +
                                    `<span class="product-quantity-actual">${jsonCartProducts[i].quantity}</span>` +
                                    '<button class="product-quantity-add">+</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                });
            }
            attCart();

            const attLocalStorage = () => {
                const newStorage = []
                const productNames = document.querySelectorAll('.cart-product-name-strong');
                const productQuantities = document.querySelectorAll('.product-quantity-actual');
                for (let i = 0; i < productQuantities.length; i++) {
                    if (Number(productQuantities[i].innerHTML) > 0)
                        newStorage.push({ name: productNames[i].innerHTML, quantity: Number(productQuantities[i].innerHTML) });
                }
                console.log(newStorage.length, 'Feito!')
                if (newStorage.length > 0) return localStorage.setItem('cart-products', JSON.stringify(newStorage));
                localStorage.removeItem('cart-products');
                clearCart();
            }

            const changeQuantity = () => {
                const quantitySub = document.querySelectorAll('.product-quantity-sub');
                const quantityAdd = document.querySelectorAll('.product-quantity-add');
                const quantityActual = document.querySelectorAll('.product-quantity-actual');

                for (let i in quantitySub) {
                    quantitySub[i].onclick = () => {
                        quantityActual[i].innerHTML = Number(quantityActual[i].innerHTML) - 1;
                        attLocalStorage();
                        attCart();
                        changeQuantity();
                    }
                    quantityAdd[i].onclick = () => {
                        quantityActual[i].innerHTML = Number(quantityActual[i].innerHTML) + 1;
                        attLocalStorage();
                        attCart();
                        changeQuantity();
                    }
                }
            }
            changeQuantity();
        })
        .catch(err => console.log(err, 'Falha na conexão...'));