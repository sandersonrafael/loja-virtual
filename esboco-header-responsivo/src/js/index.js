// desktop

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
}

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
}

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
}

bottomHeader.onmouseleave = () => {
        if (hamburguerMenu.innerHTML === '✕') hamburguerMenu.onclick();
        spanCategorias.innerHTML = '❯';
        subMenu.style.display = 'none';
        spanAcessorios.innerHTML = '❯';
        subMenuAcessorios.style.display = 'none';
        spanPecas.innerHTML = '❯';
        subMenuPecas.style.display = 'none';
}

// mobile

const hamburguerMenu = document.querySelector('.header-hamburguer');
const headerNavigation = document.querySelector('.header-navigation');
const searchBar = document.querySelector('.header-search');

const headerBack = document.querySelector('.header-back');

hamburguerMenu.onclick = () => {
    if (hamburguerMenu.innerHTML === '☰') { 
        hamburguerMenu.innerHTML = '✕';
        headerNavigation.style.display = 'flex';
        hamburguerMenu.style.position = 'fixed'
        searchBar.style.display = 'none'
    } else { 
       hamburguerMenu.innerHTML = '☰';
       headerNavigation.style.display = 'none';
       hamburguerMenu.style.position = 'static'
       searchBar.style.display = 'flex'

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
}