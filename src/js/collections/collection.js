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
        if (!collection.length) return window.location.href = '/404/';

        document.title = collectionName.innerText + ' | SK8 Lifestyle';

        // load all products in collection with all selected filters

        const collectionProducts = document.querySelector('.collection-products');
        const collectionPages = document.querySelector('.collection-pages');

        let numberOfPages = Math.ceil(collection.length / 12);
        let pageButtons = [];
        let actualPage = 1;

        const loadProducts = () => {
            const wishlist = localStorage.getItem('wishlistProducts') || '[]';
            collectionProducts.innerHTML = '';

            const lastPage = actualPage <= Math.floor(collection.length / 12) ? (actualPage * 12) : ((actualPage - 1) * 12) + collection.length % 12;

            for (let i = (actualPage - 1) * 12; i < lastPage; i++) {
                const productPrice = collection[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const productPriceNoDiscount = collection[i]['price-no-discount'] ? collection[i]['price-no-discount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
                collectionProducts.innerHTML += 
                    '<div class="collection-product">' +
                        `<a class="product-url" href="${collection[i].url}">` +
                            `<img class="product-img" src="${collection[i]['main-img']}" alt="${collection[i].name}">` +
                        '</a>' +
                        '<div class="product-infos">' +
                            `<a class="product-name" href="${collection[i].url}">${collection[i].name}</a>` +
                            '<span class="product-price">' +
                                `<strong class="product-real-price">${productPrice}</strong>` +
                                `<small class="product-price-no-discount">${productPriceNoDiscount}</small>` +
                            '</span>' +
                        '</div>' +
                        `<button data-urlparam="${collection[i]['url-param']}">` +
                            `<img src="/src/img/buttons/heart-${wishlist.indexOf(collection[i]['url-param']) !== -1 ? 'orange' : 'white'}.png">` +
                        '</button>' +
                    '</div>';
            }

            const heartButtons = document.querySelectorAll('.collection-product button');
            for (let button of heartButtons) button.onclick = function () {
                const productUrlParam = this.dataset.urlparam;
                const arrayWishlist = JSON.parse(wishlist);

                if (arrayWishlist.indexOf(productUrlParam) === -1) {
                    arrayWishlist.push(productUrlParam);
                    localStorage.setItem('wishlistProducts', JSON.stringify(arrayWishlist));
                    return loadProducts();
                }

                if (arrayWishlist.length === 1) {
                    localStorage.removeItem('wishlistProducts');
                } else {
                    for (let i in arrayWishlist) if (arrayWishlist[i] === productUrlParam) arrayWishlist.splice(i, 1);
                    localStorage.setItem('wishlistProducts', JSON.stringify(arrayWishlist));
                }
                return loadProducts();
            };
        }
        loadProducts();

        const setPagination = () => {
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

        // filter products

        const filterPrice = document.querySelectorAll('.filter-price input');
        const filterOffer = document.querySelectorAll('.filter-offer input');
        const filterBrand = document.querySelector('.filter-brand select');
        const filterCollectionDiv = document.querySelector('.filter-collection');
        const filterCollection = document.querySelector('.filter-collection select');
        const filterButton = document.querySelector('.collection-filters button');
        const collectionsList = [];
        const brands = [];

        for (let product of collection) if (brands.indexOf(product.brand) === -1) brands.push(product.brand);
        for (let brand of brands) filterBrand.innerHTML += `<option value="${brand}">${brand}</option>`;

        if (urlParam === 'all') {
            filterCollectionDiv.style.display = 'block';
            for (let product of collection) if (collectionsList.indexOf(product.collection) === -1) collectionsList.push(product.collection);
            for (let collection of collectionsList) filterCollection.innerHTML += `<option value="${collection}">${collection[0].toUpperCase() + collection.slice(1)}</option>`
        }

        filterButton.onclick = () => {
            const minPrice = filterPrice[0].value || 0;
            const maxPrice = filterPrice[1].value || Infinity;
            collection.splice(0);
            const filteredCollection = [];

            for (let product of products) if (urlParam === 'all' || product.collection === urlParam) filteredCollection.push(product);

            for (let i in filteredCollection) {
                if (filteredCollection[i].price < minPrice || filteredCollection[i].price > maxPrice) delete filteredCollection[i];
                else if (filterOffer[1].checked && !filteredCollection[i]['price-no-discount']) delete filteredCollection[i];
                else if (filterOffer[2].checked && filteredCollection[i]['price-no-discount']) delete filteredCollection[i];
                else if (filterBrand.value !== filteredCollection[i].brand && filterBrand.value) delete filteredCollection[i];
                else if (filterCollection.value !== filteredCollection[i].collection && filterCollection.value) delete filteredCollection[i];
            }
            for (let value of filteredCollection) if (value) collection.push(value);

            actualPage = 1;
            loadProducts();
            setPagination();
            filtersTitle.onclick();
            window.scrollTo({ top: 216, behavior: "smooth" });

            if (collection.length === 0) collectionPages.innerHTML = '<div style="margin-top: 40px; font-size: 18px; text-align: center;"><p>Sua pesquisa não retornou nenhum resultado.</p><p>Redefina sua busca e tente novamente...</p></div>';
        }

        // filter mobile

        const filtersTitle = document.querySelector('.filters-title');
        const filtersTitleSpan = document.querySelector('.filters-title > span');
        const filters = document.querySelector('.filters');

        filtersTitle.onclick = () => {
            if (window.innerWidth <= 800) {
                filters.style.display === 'flex' ? filters.style.display = 'none' : filters.style.display = 'flex';
                filterButton.style.display === 'block' ? filterButton.style.display = 'none' : filterButton.style.display = 'block';
                filtersTitleSpan.innerHTML === '❯' ? filtersTitleSpan.innerHTML = '❮' : filtersTitleSpan.innerHTML = '❯';
            }
        }

        // sort products

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
    .catch(err => console.log('Falha na conexão...\nVerifique se a base de dados está conectada corretamente.'));