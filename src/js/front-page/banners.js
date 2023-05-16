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