fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const urlParam = new URL(window.location.href).searchParams.get('search');
        const searchResult = products.filter(product => product.name.toLowerCase().indexOf(urlParam.toLowerCase()) !== -1);

        // search result = 0

        if (searchResult.length === 0) return document.querySelector('.container').innerHTML =
        '<h1>Nenhum produto encontrado</h1><p>Verifique se digitou o nome do produto corretamente e busque novamente.</p><form action="/search/" class="search-again"><input type="text" name="search" class="search-again-input" placeholder="Qual produto você deseja?"><button class="search-again-button"><img src="/src/img/buttons/search.png" alt="Pesquisar"></button></form>';

        // load all products that matches with search

        const searchProducts = document.querySelector('.search-products');
        const searchPages = document.querySelector('.search-pages');
        let numberOfPages = Math.ceil(searchResult.length / 12);
        let pageButtons = [];
        let actualPage = 1;

        const loadProducts = () => {
            searchProducts.innerHTML = '';

            const lastPage = actualPage <= Math.floor(searchResult.length / 12) ? (actualPage * 12) : ((actualPage - 1) * 12) + searchResult.length % 12;

            for (let i = (actualPage - 1) * 12; i < lastPage; i++) {
                const productPrice = searchResult[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const productPriceNoDiscount = searchResult[i]['price-no-discount'] ? searchResult[i]['price-no-discount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
                searchProducts.innerHTML += `<div class="search-product"><a class="product-url" href="${searchResult[i].url}"><img class="product-img" src="${searchResult[i]['main-img']}" alt="${searchResult[i].name}"></a><div class="product-infos"><p class="product-name">${searchResult[i].name}</p><span class="product-price"><strong class="product-real-price">${productPrice}</strong><small class="product-price-no-discount">${productPriceNoDiscount}</small></span></div></div>`;
            }
        }
        loadProducts();

        const setPagination = () => {
            searchPages.innerHTML = '';
            numberOfPages = Math.ceil(searchResult.length / 12);
            if (searchResult.length > 12) {
                for (let page = 1; page <= numberOfPages; page++) searchPages.innerHTML += `<button>${page}</button>`;
            }

            pageButtons = document.querySelectorAll('.search-pages > button');
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
                searchResult.sort((a, b) => a.id - b.id);
                loadProducts();
            }
            if (sort.value === 'latests') {
                searchResult.sort((a, b) => b.id - a.id);
                loadProducts();
            }
            if (sort.value === 'a-to-z') {
                searchResult.sort((a, b) => a.name.localeCompare(b.name));
                loadProducts();
            }
            if (sort.value === 'z-to-a') {
                searchResult.sort((a, b) => b.name.localeCompare(a.name));
                loadProducts();
            }
            if (sort.value === 'ascending') {
                searchResult.sort((a, b) => a.price - b.price);
                loadProducts();
            }
            if (sort.value === 'descending') {
                searchResult.sort((a, b) => b.price - a.price);
                loadProducts();
            }
            if (pageButtons.length > 0) pageButtons[0].onclick();
        }
    })
    .catch(err => console.log(err, 'Falha na conexão...\nVerifique se a base de dados está conectada corretamente.'));