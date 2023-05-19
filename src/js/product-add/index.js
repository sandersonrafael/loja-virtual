fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {
        const product = {};
        const sub = document.querySelector('.sub');
        const add = document.querySelector('.add');

        const body = document.querySelector('body');
        const name = document.querySelector('.name');
        const description = document.querySelector('.description')
        const price = document.querySelector('.price');
        const priceNoDiscount = document.querySelector('.price-no-discount');
        const availability = document.querySelector('.availability');
        const addImgs = document.querySelector('#imgadd');
        const collection = document.querySelector('.collection');
        const brand = document.querySelector('.brand');

        const enviar = document.querySelector('#enviar');

        add.onclick = () => addImgs.value < 4 ? addImgs.value++ : addImgs.value;
        sub.onclick = () => addImgs.value > 0 ? addImgs.value-- : addImgs.value;

        product.id = products.length + 1;

        enviar.onclick = () => {
            if (
                !name.value ||
                !description.value ||
                !price.value ||
                !availability.value ||
                !collection.value ||
                !brand.value
            ) return alert('Faltam dados!');
            product.name = name.value;

            const formatDescription = description.value.split('\n');
            for (let i in formatDescription) if (!formatDescription[i]) formatDescription.splice(i, 1);
            product.description = '';
            for (let p of formatDescription) product.description += `<p>${p}</p>`;

            product.price = Number(price.value);

            priceNoDiscount.value && priceNoDiscount.value > price.value ? product['price-no-discount'] = Number(priceNoDiscount.value) : product['price-no-discount'] = null;

            const urlParam = name.value.toLowerCase().replaceAll(' ', '-').replaceAll('.', '').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('ã', 'a').replaceAll('õ', 'o').replaceAll('â', 'a').replaceAll('ê', 'e').replaceAll('ô', 'o').replaceAll('ç', 'c');

            product['main-img'] = `/src/img/products/${urlParam}/main-image.jpg`;

            product['aditional-imgs'] = []
            for (let c = 0; c < addImgs.value; c++) product['aditional-imgs'].push(`/src/img/products/${urlParam}/aditional-image-${c + 1}.jpg`);
            console.log(product['aditional-imgs'])

            product.colors = {};

            product['url-param'] = urlParam;

            product.url = `/products/?url=${urlParam}`;

            product.availability = Number(availability.value);

            product.collection = collection.value;

            product.brand = brand.value;

            body.innerHTML = '';
            body.innerText += ",\n{\n";

            body.innerText += `"id": ${product.id},\n`;

            body.innerText += `"name": "${product.name}",\n`;

            body.innerText += `"description": "${product.description}",\n`;

            body.innerText += `"price": ${product.price},\n`;

            body.innerText += `"price-no-discount": ${product['price-no-discount']},\n`;

            body.innerText += `"main-img": "${product['main-img']}",\n`;

            body.innerText += '"aditional-imgs": ';
            if (addImgs.value > 0) {
                body.innerText += '[\n';
            } else {
                body.innerText += '[],\n';
            }
            for (let c = 0; c < addImgs.value; c++) {
                if (c < addImgs.value - 1) {
                    body.innerText += `"${product['aditional-imgs'][c]}",\n`;
                } else {
                    body.innerText += `"${product['aditional-imgs'][c]}"\n],\n`;
                }
            }

            body.innerText += `"colors": {},\n`;

            body.innerText += `"url-param": "${product['url-param']}",\n`;

            body.innerText += `"url": "${product.url}",\n`;

            body.innerText += `"availability": ${product.availability},\n`;

            body.innerText += `"collection": "${product.collection}",\n`;

            body.innerText += `"brand": "${product.brand}"\n`;

            body.innerText += '}'
        }
    })
    .catch(() => console.log('Falha na conexão...\nVerifique se o servidor está conectado corretamente.'));
