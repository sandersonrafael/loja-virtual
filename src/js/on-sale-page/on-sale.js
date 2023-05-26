fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const onSaleResults = products.filter(product => product['price-no-discount'] && product['price-no-discount'] > product.price);

        // no products on sale

        if (onSaleResults.length === 0) return document.querySelector('.container').innerHTML =
            '<h1>Nenhum produto em promoção atualmente!</h1>' +
            '<p>Navegue em nossa loja e busque o que você deseja!</p>' +
            '<a href="/collections/?collection=all">Ver produtos</a>';

        // load all on sale products

        const onSaleProducts = document.querySelector('.on-sale-products');
        const onSalePages = document.querySelector('.on-sale-pages');
        let numberOfPages = Math.ceil(onSaleResults.length / 12);
        let pageButtons = [];
        let actualPage = 1;

        const loadProducts = () => {
            onSaleProducts.innerHTML = '';

            const lastPage = actualPage <= Math.floor(onSaleResults.length / 12) ? (actualPage * 12) : ((actualPage - 1) * 12) + onSaleResults.length % 12;

            for (let i = (actualPage - 1) * 12; i < lastPage; i++) {
                const productPrice = onSaleResults[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const productPriceNoDiscount = onSaleResults[i]['price-no-discount'] ? onSaleResults[i]['price-no-discount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
                onSaleProducts.innerHTML += `<div class="on-sale-product"><a class="product-url" href="${onSaleResults[i].url}"><img class="product-img" src="${onSaleResults[i]['main-img']}" alt="${onSaleResults[i].name}"></a><div class="product-infos"><p class="product-name">${onSaleResults[i].name}</p><span class="product-price"><strong class="product-real-price">${productPrice}</strong><small class="product-price-no-discount">${productPriceNoDiscount}</small></span></div></div>`;
            }
        }
        loadProducts();

        const setPagination = () => {
            onSalePages.innerHTML = '';
            numberOfPages = Math.ceil(onSaleResults.length / 12);
            if (onSaleResults.length > 12) {
                for (let page = 1; page <= numberOfPages; page++) onSalePages.innerHTML += `<button>${page}</button>`;
            }

            pageButtons = document.querySelectorAll('.on-sale-pages > button');
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

        // sort products

        const sort = document.querySelector('.sort-products-by');
        sort.onchange = () => {
            if (sort.value === 'olders') {
                onSaleResults.sort((a, b) => a.id - b.id);
                loadProducts();
            }
            if (sort.value === 'latests') {
                onSaleResults.sort((a, b) => b.id - a.id);
                loadProducts();
            }
            if (sort.value === 'a-to-z') {
                onSaleResults.sort((a, b) => a.name.localeCompare(b.name));
                loadProducts();
            }
            if (sort.value === 'z-to-a') {
                onSaleResults.sort((a, b) => b.name.localeCompare(a.name));
                loadProducts();
            }
            if (sort.value === 'ascending') {
                onSaleResults.sort((a, b) => a.price - b.price);
                loadProducts();
            }
            if (sort.value === 'descending') {
                onSaleResults.sort((a, b) => b.price - a.price);
                loadProducts();
            }
            if (pageButtons.length > 0) pageButtons[0].onclick();
        }
    })
    .catch(err => console.log('Falha na conexão...\nVerifique se a base de dados está conectada corretamente.'));