fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const urlParam = new URL(window.location.href).searchParams.get('collection');
        const collection = products.filter(product => product.collection === urlParam);
        console.log(collection)

        console.log(urlParam);
        if (urlParam === 'all') for (let product of products) collection.push(product);
        if (!collection.length) window.location.href = '/pages/404/';

        // load all products in collection with all selected filters

        const collectionProducts = document.querySelector('.collection-products');
        let collectionProduct = [];

        const loadProducts = () => {
            collectionProducts.innerHTML = '';

            for (let product of collection) {
                const productPrice = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                const productPriceNoDiscount = product['price-no-discount'] ? product['price-no-discount'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : '';
                collectionProducts.innerHTML += `<div class="collection-product"><a class="product-url" href="${product.url}"><img class="product-img" src="${product['main-img']}" alt="${product.name}"></a><div class="product-infos"><p class="product-name">${product.name}</p><span class="product-price"><strong class="product-real-price">${productPrice}</strong><small class="product-price-no-discount">${productPriceNoDiscount}</small></span></div></div>`;
            }

            collectionProduct = document.querySelectorAll('.collection-product');
        }
        loadProducts();
    })
    .catch(err => console.log('Falha na conexão...\nVerifique se a base de dados está conectada corretamente.', err))