const hamburguerMenu = document.querySelector('.header-hamburguer');
const headerNavigation = document.querySelector('.header-navigation');
const mediaQuery = window

hamburguerMenu.onclick = () => {
    if (hamburguerMenu.innerHTML === '☰') { 
        hamburguerMenu.innerHTML = '✕';
        headerNavigation.style.display = 'block';
    } else { 
       hamburguerMenu.innerHTML = '☰';
       headerNavigation.style.display = 'none';
    }
}

mediaQuery.matchMedia('(max-width: 800px)') = () => {
    alert('Alterado.')
}