fetch('/src/db/pages.json')
    .then(res => res.json())
    .then(pages => {

        const body = document.querySelector('body');
        const pageTitle = document.querySelector('.page-title');
        const sectionQnt = document.querySelectorAll('.section-qnt > button');
        const totalSections = document.querySelector('.total-sections');
        const send = document.querySelector('.page-add > button')
        let topics = document.querySelectorAll('.total-sections > div');

        sectionQnt[0].onclick = () => {
            if (topics.length > 1) topics[topics.length - 1]
            .remove();
            topics = document.querySelectorAll('.total-sections > div');
        }

        sectionQnt[1].onclick = () => {
            totalSections.innerHTML += `<div><h2>${topics.length + 1}º Tópico - Título</h2><input type="text"><h2>${topics.length + 1}º Tópico - Corpo</h2><textarea></textarea></div>`
            topics = document.querySelectorAll('.total-sections > div');
        }

        send.onclick = () => {
            const topicTitles = document.querySelectorAll('.total-sections > div > input[type=text]');
            const topicContents = document.querySelectorAll('.total-sections > div > textarea');
            const allContents = [];
            const control = [];
            topics = document.querySelectorAll('.total-sections > div');

            if (!pageTitle.value) return alert('Nenhum espaço pode estar em branco!');
            for (let i = 0; i < topics.length; i++) {
                if (!topicTitles[i].value || !topicContents[i].value) return alert('Nenhum espaço pode estar em branco!');
            }

            for (let c = 0; c < topics.length; c++) {
                control[c] = topicContents[c].value.split('\n');
                if (control[c].length > 0) allContents[c] = [];
                for (let i in control[c]) if (control[c][i]) allContents[c].push(control[c][i]);
            }

            body.innerText = `,\n{\n"id": ${pages.length + 1},\n"page-title": `;
            body.innerText += ` "${pageTitle.value}",\n"page-content": "`;

            for (let i in allContents) {
                body.innerText += `<h2>${topicTitles[i].value}</h2>`;
                for (let content of allContents[i]) body.innerText += `<p>${content}</p>`;
            }

            const urlParam = pageTitle.value.toLowerCase().replaceAll(' ', '-').replaceAll('.', '').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('ã', 'a').replaceAll('õ', 'o').replaceAll('â', 'a').replaceAll('ê', 'e').replaceAll('ô', 'o').replaceAll('ç', 'c');

            body.innerText += `",\n"url-param": "${urlParam}",\n"url": "/pages/?page=${urlParam}"\n}`
        }
    })
    .catch(err => console.log('Falha na conexão...'))