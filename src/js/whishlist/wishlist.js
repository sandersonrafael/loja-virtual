const loadWishlist = () => fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const wishlist = localStorage.getItem('wishlistProducts');
        const wishlistContainer = document.querySelector('.container');

        if (!wishlist) {
            return wishlistContainer.innerHTML =
                '<h1>Lista de Desejos</h1>' +
                '<div class="wishlist-no-results">' +
                    '<p>Parece que ainda não há nenhum produto na sua lista de desejos...</p>' +
                    '<p>Temos uma imensa variedade de produtos para os mais diversos gostos e estilos.</p>' +
                    '<a href="/collections/?collection=all">Ver produtos...</a>' +
                '</div>';
        }

        const clearWishlist = document.querySelector('.clear-wishlist > button');
        clearWishlist.onclick = () => {
            localStorage.removeItem('wishlistProducts');
            return loadWishlist();
        }

        const arrayWishlist = JSON.parse(wishlist);
        const wishlistProductsSection = document.querySelector('.wishlist-products');
        const wishlistProducts = [];

        for (let item of arrayWishlist) wishlistProducts.push(products.find(product => product['url-param'] === item));

        // copiado do search

        const wishlistPages = document.querySelector('.wishlist-pages');
        let numberOfPages = Math.ceil(wishlistProducts.length / 12);
        let pageButtons = [];
        let actualPage = 1;

        const loadProducts = () => {
            wishlistProductsSection.innerHTML = '';

            const lastPage = actualPage <= Math.floor(wishlistProducts.length / 12) ? (actualPage * 12) : ((actualPage - 1) * 12) + wishlistProducts.length % 12;

            for (let i = (actualPage - 1) * 12; i < lastPage; i++) {
                const productPrice = wishlistProducts[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const productPriceNoDiscount = wishlistProducts[i]['price-no-discount'] ? wishlistProducts[i]['price-no-discount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
                wishlistProductsSection.innerHTML += 
                    '<div class="wishlist-product">' + 
                    `<a class="product-url" href="${wishlistProducts[i].url}">` +
                        `<img class="product-img" src="${wishlistProducts[i]['main-img']}" alt="${wishlistProducts[i].name}">`+ 
                    '</a>' + 
                    '<div class="product-infos">' +
                        `<a class="product-name" href="${wishlistProducts[i].url}">${wishlistProducts[i].name}</a>` + 
                        '<span class="product-price">' + 
                            `<strong class="product-real-price">${productPrice}</strong>` +
                            `<small class="product-price-no-discount">${productPriceNoDiscount}</small>`+ 
                            '</span>' +
                        '</div>' +
                        `<button data-urlparam="${wishlistProducts[i]['url-param']}">` +
                        '<img src="/src/img/buttons/heart-orange.png">' +
                        '</button>' +
                    '</div>';
            }
            const wishlistProductsWishlistButtons = document.querySelectorAll('.wishlist-product > button');

            for (let button of wishlistProductsWishlistButtons) button.onclick = function() {
                const urlParam = this.dataset.urlparam;
                const index = arrayWishlist.indexOf(urlParam);
                arrayWishlist.splice(index, 1);

                localStorage.setItem('wishlistProducts', JSON.stringify(arrayWishlist));
                if (arrayWishlist.length === 0) localStorage.removeItem('wishlistProducts');

                return loadWishlist();
            }
        }
        loadProducts();

        const setPagination = () => {
            wishlistPages.innerHTML = '';
            numberOfPages = Math.ceil(wishlistProducts.length / 12);
            if (wishlistProducts.length > 12) {
                for (let page = 1; page <= numberOfPages; page++) wishlistPages.innerHTML += `<button>${page}</button>`;
            }

            pageButtons = document.querySelectorAll('.wishlist-pages > button');
            for (let pageButton of pageButtons) {
                if (Number(pageButton.innerHTML) === 1) {
                    pageButton.style.color = '#DE560B';
                    pageButton.style['text-decoration'] = 'none';
                }

                pageButton.onclick = function () {
                    actualPage = Number(this.innerHTML);
                    for (let pageButton of pageButtons) {
                        pageButton.style.color = 'black';
                        pageButton.style['text-decoration'] = 'underline';
                    }
                    this.style.color = '#DE560B';
                    this.style['text-decoration'] = 'none';
                    loadProducts();
                    window.scrollTo({ top: 150, behavior: "smooth" });
                }
            }
        }
        setPagination();
    })
    .catch();
loadWishlist();