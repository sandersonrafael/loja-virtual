// header desktop

const bottomHeader = document.querySelector('.bottom-header');

const menuExpand = document.querySelector('.menu-expand > p, .menu-expand > span');
const spanCategorias = document.querySelector('.span-categorias');
const subMenu = document.querySelector('.sub-menu');

const subMenuExpand1 = document.querySelectorAll('.sub-menu-expand > p')[0];
const spanPecas = document.querySelector('.span-pecas');
const subMenuPecas = document.querySelectorAll('.sub-sub-menu')[0];

const subMenuExpand2 = document.querySelectorAll('.sub-menu-expand > p')[1];
const spanAcessorios = document.querySelector('.span-acessorios');
const subMenuAcessorios = document.querySelectorAll('.sub-sub-menu')[1];

menuExpand.onclick = () => {
    if (spanCategorias.innerHTML === '❯') {
        spanCategorias.innerHTML = '❮';
        subMenu.style.display = 'flex';
    } else {
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
    }
    if (subMenuPecas.style.display !== 'none' || subMenuAcessorios.style.display !== 'none') {
        
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
        
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
    if (hamburguerMenu.innerHTML === '✕') {
        headerBack.style.display = 'block';
    }
};

subMenuExpand1.onclick = () => {
    if (spanPecas.innerHTML === '❯') {
        spanPecas.innerHTML = '❮';
        subMenuPecas.style.display = 'flex';
    } else {
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    }
    if (subMenuPecas.style.display !== 'none') {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
};

subMenuExpand2.onclick = () => {
    if (spanAcessorios.innerHTML === '❯') {
        spanAcessorios.innerHTML = '❮';
        subMenuAcessorios.style.display = 'flex';
    } else {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
    if (subMenuAcessorios.style.display !== 'none') {
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    }
};

bottomHeader.onmouseleave = () => {
    if (hamburguerMenu.innerHTML === '✕') hamburguerMenu.onclick();
    spanCategorias.innerHTML = '❯';
    subMenu.style.display = 'none';
    spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    };
    
    // footer mobile
    
    const footerCustomerExpand = document.querySelector('.footer-customer-area-expand');
    const footerCustomerSubMenu = document.querySelector('.footer-customer-area-sub');
    const footerCustomerSpan = document.querySelector('.footer-customer-area-expand>span');
    
    footerCustomerExpand.onclick = function() {
        if (footerCustomerSubMenu.style.display === '')
        footerCustomerSubMenu.style.display = 'none';
        
        if (footerCustomerSubMenu.style.display === 'none') {
            footerCustomerSubMenu.style.display = 'block';
            footerCustomerSpan.innerHTML = '❮'
        }
        else {
            footerCustomerSubMenu.style.display = 'none'
            footerCustomerSpan.innerHTML = '❯'
        }
    }
    
    const footerPolicyExpand = document.querySelector('.footer-policy-expand');
    const footerPolicySubMenu = document.querySelector('.footer-policy-sub');
    const footerPolicySpan = document.querySelector('.footer-policy-expand>span');
    
    footerPolicyExpand.onclick = function() {
        if (footerPolicySubMenu.style.display === '')
        footerPolicySubMenu.style.display = 'none';
        
        if (footerPolicySubMenu.style.display === 'none') {
        footerPolicySubMenu.style.display = 'block';
        footerPolicySpan.innerHTML = '❮'
    }
    else {
        footerPolicySubMenu.style.display = 'none'
        footerPolicySpan.innerHTML = '❯'
    }
}

// header mobile

const hamburguerMenu = document.querySelector('.header-hamburguer');
const headerNavigation = document.querySelector('.header-navigation');
const searchBar = document.querySelector('.header-search');

const headerBack = document.querySelector('.header-back');

hamburguerMenu.onclick = () => {
    if (hamburguerMenu.innerHTML === '☰') { 
        footerCustomerSpan.style['z-index'] = '-1';
        footerPolicySpan.style['z-index'] = '-1';
        hamburguerMenu.innerHTML = '✕';
        headerNavigation.style.display = 'flex';
        hamburguerMenu.style.position = 'fixed';
        searchBar.style.display = 'none';
    } else { 
        footerPolicySpan.style['z-index'] = '0';
        footerCustomerSpan.style['z-index'] = '0';
        hamburguerMenu.innerHTML = '☰';
        headerNavigation.style.display = 'none';
        hamburguerMenu.style.position = 'static';
        searchBar.style.display = 'flex';
        
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
        headerBack.style.display = 'none';
    }
};

headerBack.onclick = () => {
    if (spanPecas.innerHTML === '❮' || spanAcessorios.innerHTML === '❮') {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    } else if (spanCategorias.innerHTML === '❮') {
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        headerBack.style.display = 'none';
    }
};

// header cart number of products

const attHeaderCart = () => {
    const onCartQuantity = document.querySelector('.header-cart span span');
    const cartProducts = localStorage.getItem('cart-products');
    const sumQuantity = () => JSON.parse(cartProducts).reduce((sum, product) => sum += product.quantity, 0);
    onCartQuantity.innerHTML = cartProducts ? sumQuantity() : 0;
    onCartQuantity.style.color = cartProducts ? '#DE560B' : '';
};
attHeaderCart();

// cookies

cookieExpires = (days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date.toUTCString();
};

// cookie consent bar

const cookieConsentBar = document.querySelector('.cookie-consent-bar');
const cookieAcept = document.querySelector('.cookie-acept');

if (document.cookie.indexOf('aceptCookies') === -1) {
    setTimeout(() => cookieConsentBar.style.display = 'flex', 1200);
};

cookieAcept.onclick = () => {
    cookieConsentBar.style.display = 'none';
    document.cookie = "aceptCookies=" + "true" + "; expires=" + cookieExpires(1) + "; path=/";
};

// user is loggedIn? 

const checkUserIsLoggedIn = () => {
    const loginButton = document.querySelector('.user-options > li > a');
    const users = localStorage.getItem('localAccounts') || '[]';
    const arrayUsers = JSON.parse(users);
    for (let user of arrayUsers)
        if (user.loggedIn === true)
            loginButton.innerHTML = '<img class="user-img" src="/src/img/user/login-white.png" alt="Usuário">Usuário';
}
checkUserIsLoggedIn();


// get suggestions

if (document.querySelector('.products-suggestion')) fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        // get products indexes randomly

        const randomIndexesNoRepeat = (indexesQuantity, max, min = 0) => {
            if (max - min < indexesQuantity) return 'Intervalo menor que a quantidade de índices solitada';

            const random = () => Math.round(Math.random() * (max - min) + min);
            const randomIndexesArray = [];

            const pushIndexes = () => {
                if (randomIndexesArray.length === indexesQuantity) return;

                const tryIndex = random();
                const testValue = randomIndexesArray.reduce((booleanValue, actualValue) => {
                    return booleanValue = booleanValue && tryIndex !== actualValue;
                }, true);

                if (testValue) {
                    randomIndexesArray.push(tryIndex);
                    pushIndexes();
                } else pushIndexes();
            }
            pushIndexes();

            return randomIndexesArray;
        };

        // write suggestions htmls

        const getSuggestions = (productsArray, suggestionElement, name, url) => {
            const wishlist = localStorage.getItem('wishlistProducts') || '[]';
            const getItens = () => {
                const randomProducts = randomIndexesNoRepeat(3, productsArray.length - 1)
                    .map((randomIndex) => productsArray[randomIndex]);

                let itens = '';

                for (let i in randomProducts) {
                    itens += 
                        '<div class="suggestion-item">' +
                            `<a href="${randomProducts[i].url}"><img src="${randomProducts[i]['main-img']}" alt="${randomProducts[i].name}"></a>` +
                            `<h2><a href="${randomProducts[i].url}">${randomProducts[i].name}</a></h2>` +
                            '<p>' +
                                `<strong>${randomProducts[i].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>` +
                                `<small>${randomProducts[i]['price-no-discount'] && randomProducts[i]['price-no-discount'] > randomProducts[i].price ? ' ' + randomProducts[i]['price-no-discount'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</small>` +
                            '</p>' +
                            `<button data-urlparam="${randomProducts[i]['url-param']}">` +
                                `<img src="/src/img/buttons/heart-${wishlist.indexOf(randomProducts[i]['url-param']) !== -1 ? 'orange' : 'white'}.png">` +
                            '</button>' +
                        '</div>';
                }
                return itens;
            };
            suggestionElement.innerHTML = 
                `<h1>Confira Nossos ${name}</h1>` +
                '<div class="suggestion-contents">' +
                    getItens() +
                    '<div class="suggestion-item">' +
                        `<a href="${url}">Ver Todos os ${name}...</a>` +
                    '</div>' +
                '</div>';
        };

        // get on sale suggestion

        const onSaleElement = document.querySelector('.on-sale-suggestion');
        if (onSaleElement) {
            const onSaleProducts = products.filter(product => product['price-no-discount'] && product['price-no-discount'] > product.price);
            const onSaleCollectionName = 'Produtos em Promoção';
            const onSaleUrl = '/on-sale/';
            getSuggestions(onSaleProducts, onSaleElement, onSaleCollectionName, onSaleUrl);
        };

        // get skates suggestion

        const skatesElement = document.querySelector('.skates-suggestion');
        if (skatesElement) {
            const skatesProducts = products.filter(product => product.collection === 'skates');
            const skatesCollectionName = 'Skates';
            const skatesUrl = '/collections/?collection=skates';
            getSuggestions(skatesProducts, skatesElement, skatesCollectionName, skatesUrl);
        };

        // set wishlist buttons and heart images

        const heartButtons = document.querySelectorAll('.suggestion-item > button');
        const heartImgs = document.querySelectorAll('.suggestion-item > button > img');

        for (let i in heartButtons) heartButtons[i].onclick = () => {
            const productUrlParam = heartButtons[i].dataset.urlparam;
            const arrayWishlist = JSON.parse(localStorage.getItem('wishlistProducts') || '[]');
            const indexOfProduct = arrayWishlist.indexOf(productUrlParam);

            if (indexOfProduct === -1) {
                heartImgs[i].src = '/src/img/buttons/heart-orange.png';
                arrayWishlist.push(productUrlParam);
                return localStorage.setItem('wishlistProducts', JSON.stringify(arrayWishlist));
            } else if (arrayWishlist.length === 1) {
                heartImgs[i].src = '/src/img/buttons/heart-white.png';
                return localStorage.removeItem('wishlistProducts');
            } else {
                heartImgs[i].src = '/src/img/buttons/heart-white.png';
                arrayWishlist.splice(arrayWishlist.indexOf(productUrlParam), 1);
                return localStorage.setItem('wishlistProducts', JSON.stringify(arrayWishlist));
            };
        }
    })
    .catch(err => console.log('Falha na conexão... Necessário habilitar o JavaScript para acessar o conteúdo completo do site.'));
