// executar código para obter análise dos dados do json

fetch('http://127.0.0.1:5500/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const collections = [
            'skates',
            'pranchas',
            'rodas',
            'lixas',
            'trucks',
            'rolamentos',
            'capacetes',
            'cotoveleiras',
            'joelheiras',
            'kits',
            'bags',
            'manutencao',
            'diversos'
        ];

        console.log('\nQuantidade de produtos:', products.length);
        console.log(
            '\nProdutos em promoção:',
            products.filter(product => product['price-no-discount'] > product.price).length
        );
        console.log('\nQuantidade de coleções:', collections.length, '\n\nProdutos por coleção:\n');

        for (let collection of collections)  {
            const quantidade = products.filter(product => product.collection === collection).length;
            console.log(collection.slice(0, 1).toUpperCase() + collection.slice(1), ':', quantidade);
        };

        console.log('\nTodas Urls:\n');
        for (let product of products) console.log(product.url);

        console.log('\nTodas Urls Rodas:\n');
        for (let product of products) if (product.collection === 'rodas') console.log(product.url);

        console.log('\nTodas Urls Rolamentos:\n');
        for (let product of products) if (product.collection === 'rolamentos') console.log(product.url);

        console.log('\nTodas marcas de rodas:\n');
        for (let product of products) if (product.collection === 'rodas') console.log(product.brand);

        console.log('\nTodas marcas de skates:\n');
        for (let product of products) if (product.collection === 'skates') console.log(product.brand);

        console.log('\nTodas Urls Skates:\n');
        for (let product of products) if (product.collection === 'skates') console.log(product.url);

        console.log('\nTodas marcas de Pranchas:\n');
        for (let product of products) if (product.collection === 'pranchas') console.log(product.brand);

        console.log('\nTodas Urls Pranchas:\n');
        for (let product of products) if (product.collection === 'pranchas') console.log(product.url);
    })
    .catch((err) => console.log('\nFalha na conexão...\nVerifique se o servidor local está correto e conectado.'));
