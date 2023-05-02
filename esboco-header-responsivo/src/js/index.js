// header desktop

const bottomHeader = document.querySelector('.bottom-header');

const menuExpand = document.querySelector('.menu-expand > p, .menu-expand > span');
const spanCategorias = document.querySelector('.span-categorias');
const subMenu = document.querySelector('.sub-menu');

const subMenuExpand1 = document.querySelectorAll('.sub-menu-expand > p')[0];
const spanPecas = document.querySelector('.span-pecas');
const subMenuPecas = document.querySelectorAll('.sub-sub-menu')[0];

const subMenuExpand2 = document.querySelectorAll('.sub-menu-expand > p')[1];
const spanAcessorios = document.querySelector('.span-acessorios');
const subMenuAcessorios = document.querySelectorAll('.sub-sub-menu')[1];

menuExpand.onclick = () => {
    if (spanCategorias.innerHTML === '❯') {
        spanCategorias.innerHTML = '❮';
        subMenu.style.display = 'flex';
    } else {
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
    }
    if (subMenuPecas.style.display !== 'none' || subMenuAcessorios.style.display !== 'none') {
        
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';

        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
    if (hamburguerMenu.innerHTML === '✕') {
        headerBack.style.display = 'block';
    }
};

subMenuExpand1.onclick = () => {
    if (spanPecas.innerHTML === '❯') {
        spanPecas.innerHTML = '❮';
        subMenuPecas.style.display = 'flex';
    } else {
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    }
    if (subMenuPecas.style.display !== 'none') {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
};

subMenuExpand2.onclick = () => {
    if (spanAcessorios.innerHTML === '❯') {
        spanAcessorios.innerHTML = '❮';
        subMenuAcessorios.style.display = 'flex';
    } else {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
    }
    if (subMenuAcessorios.style.display !== 'none') {
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    }
};

bottomHeader.onmouseleave = () => {
        if (hamburguerMenu.innerHTML === '✕') hamburguerMenu.onclick();
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
};

// banner desktop

const banners = document.querySelector('.banners');
const banner1 = document.querySelector('.banner-option-1');
const banner2 = document.querySelector('.banner-option-2');
const banner3 = document.querySelector('.banner-option-3');
const bannerOption1 = document.querySelectorAll('.banner-option-button')[0];
const bannerOption2 = document.querySelectorAll('.banner-option-button')[1];
const bannerOption3 = document.querySelectorAll('.banner-option-button')[2];
bannerOption1.style['background-color'] = '#000000'

window.onload = () => {
    setInterval(() => {
        if (banner1.style.display === 'block') {
            banner1.style.display = 'none';
            bannerOption1.style['background-color'] = 'transparent';

            banner2.style.display = 'block';
            bannerOption2.style['background-color'] = '#000000';

            banner3.style.display = 'none';
            bannerOption3.style['background-color'] = 'transparent';
        } else if (banner2.style.display === 'block') {
            banner1.style.display = 'none';
            bannerOption1.style['background-color'] = 'transparent';

            banner2.style.display = 'none';
            bannerOption2.style['background-color'] = 'transparent';

            banner3.style.display = 'block';
            bannerOption3.style['background-color'] = '#000000';
        } else {
            banner1.style.display = 'block';
            bannerOption1.style['background-color'] = '#000000';

            banner2.style.display = 'none';
            bannerOption2.style['background-color'] = 'transparent';

            banner3.style.display = 'none';
            bannerOption3.style['background-color'] = 'transparent';
        }
    }, 5000);
};

bannerOption1.onclick = () => {
    banner1.style.display = 'block';
    bannerOption1.style['background-color'] = '#000000';

    banner2.style.display = 'none';
    bannerOption2.style['background-color'] = 'transparent';

    banner3.style.display = 'none';
    bannerOption3.style['background-color'] = 'transparent';
};
bannerOption2.onclick = () => {
    banner1.style.display = 'none';
    bannerOption1.style['background-color'] = 'transparent';

    banner2.style.display = 'block';
    bannerOption2.style['background-color'] = '#000000';

    banner3.style.display = 'none';
    bannerOption3.style['background-color'] = 'transparent';
};
bannerOption3.onclick = () => {
    banner1.style.display = 'none';
    bannerOption1.style['background-color'] = 'transparent';

    banner2.style.display = 'none';
    bannerOption2.style['background-color'] = 'transparent';

    banner3.style.display = 'block';
    bannerOption3.style['background-color'] = '#000000';
};



// header mobile

const hamburguerMenu = document.querySelector('.header-hamburguer');
const headerNavigation = document.querySelector('.header-navigation');
const searchBar = document.querySelector('.header-search');

const headerBack = document.querySelector('.header-back');

hamburguerMenu.onclick = () => {
    if (hamburguerMenu.innerHTML === '☰') { 
        banners.style['z-index'] = '-1';
        hamburguerMenu.innerHTML = '✕';
        headerNavigation.style.display = 'flex';
        hamburguerMenu.style.position = 'fixed';
        searchBar.style.display = 'none';
    } else { 
        banners.style['z-index'] = '0';
        hamburguerMenu.innerHTML = '☰';
        headerNavigation.style.display = 'none';
        hamburguerMenu.style.position = 'static';
        searchBar.style.display = 'flex';

        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
        headerBack.style.display = 'none';
    }
};

headerBack.onclick = () => {
    if (spanPecas.innerHTML === '❮' || spanAcessorios.innerHTML === '❮') {
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
    } else if (spanCategorias.innerHTML === '❮') {
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        headerBack.style.display = 'none';
    }
};


// footer mobile









// cookies e json para o site

/* console.log(document.cookie) */
/* fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => console.log(json)) */

/* no json, para adicionar produtos, pode-se utilizar o método push dos arrays para adicionar produtos ao json
pode-se utilizar o método slice para apagar determinados produtos
necessário proteger o json para acessos externos

*/
