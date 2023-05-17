fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const urlParam = new URL(window.location.href).searchParams.get('collection');
        const collection = products.filter(product => product.collection === urlParam);
        const collectionName = document.querySelector('.collection-name > strong');

        if (urlParam === 'all') {
            for (let product of products) collection.push(product);
            collectionName.innerHTML = 'Todos os Produtos';
        } else collectionName.innerHTML = urlParam.slice(0, 1).toLocaleUpperCase() + urlParam.slice(1);
        if (!collection.length) window.location.href = '/pages/404/';


        // load all products in collection with all selected filters

        const collectionProducts = document.querySelector('.collection-products');
        const collectionPages = document.querySelector('.collection-pages');

        let numberOfPages = Math.ceil(collection.length / 12);
        let pageButtons = [];
        let actualPage = 1;

        const loadProducts = () => {
            collectionProducts.innerHTML = '';

            const lastPage = actualPage <= Math.floor(collection.length / 12) ? (actualPage * 12) : ((actualPage - 1) * 12) + collection.length % 12;

            for (let i = (actualPage - 1) * 12; i < lastPage; i++) {
                const productPrice = collection[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const productPriceNoDiscount = collection[i]['price-no-discount'] ? collection[i]['price-no-discount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
                collectionProducts.innerHTML += `<div class="collection-product"><a class="product-url" href="${collection[i].url}"><img class="product-img" src="${collection[i]['main-img']}" alt="${collection[i].name}"></a><div class="product-infos"><p class="product-name">${collection[i].name}</p><span class="product-price"><strong class="product-real-price">${productPrice}</strong><small class="product-price-no-discount">${productPriceNoDiscount}</small></span></div></div>`;
            }
        }
        loadProducts();

        function setPagination() {
            collectionPages.innerHTML = '';
            numberOfPages = Math.ceil(collection.length / 12);
            if (collection.length > 12) {
                for (let page = 1; page <= numberOfPages; page++) collectionPages.innerHTML += `<button>${page}</button>`;
            }

            pageButtons = document.querySelectorAll('.collection-pages > button');
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
                    window.scrollTo({ top: 216, behavior: "smooth" });
                }
            }
        }
        setPagination();

        const filterProducts = () => {
            /* para limpar filtros: 
            collection.slice(limpar todos produtos) 
            for (let product of produtcs) collection.push(product); */
        }
        filterProducts();

        const sort = document.querySelector('.sort-products-by');
        sort.onchange = () => {
            if (sort.value === 'olders') {
                collection.sort((a, b) => a.id - b.id);
                loadProducts();
            }
            if (sort.value === 'latests') {
                collection.sort((a, b) => b.id - a.id);
                loadProducts();
            }
            if (sort.value === 'a-to-z') {
                collection.sort((a, b) => a.name.localeCompare(b.name));
                loadProducts();
            }
            if (sort.value === 'z-to-a') {
                collection.sort((a, b) => b.name.localeCompare(a.name));
                loadProducts();
            }
            if (sort.value === 'ascending') {
                collection.sort((a, b) => a.price - b.price);
                loadProducts();
            }
            if (sort.value === 'descending') {
                collection.sort((a, b) => b.price - a.price);
                loadProducts();
            }
            if (pageButtons.length > 0) pageButtons[0].onclick();
        }
    })
    .catch(err => console.log(err, 'Falha na conexão...\nVerifique se a base de dados está conectada corretamente.'))