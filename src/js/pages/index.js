fetch('/src/db/pages.json')
    .then(res => res.json())
    .then(pages => {
        const urlParam = new URL(window.location.href).searchParams.get('page');
        const page = pages.filter(page => page['url-param'] === urlParam)[0];

        if (!page) window.location.href = '/404/';

        const pageTitle = document.querySelector('.page-title');
        const pageContent = document.querySelector('.page-content');

        pageTitle.innerHTML = page.title;
        pageContent.innerHTML = page.content;
    })
    .catch(err => console.log('Falha na conexão...'))