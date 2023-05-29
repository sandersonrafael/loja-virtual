const selectedBanner = document.querySelectorAll('.banners-container input[type="radio"]');
let slideInterval;
const bannerSlide = () => slideInterval = setInterval(() => {
    if (selectedBanner[0].checked === true) selectedBanner[1].checked = true;
    else if (selectedBanner[1].checked === true) selectedBanner[2].checked = true;
    else if (selectedBanner[2].checked === true) selectedBanner[0].checked = true;
}, 4000);
bannerSlide();

const previousBanner = document.querySelector('.banner-previous');
const nextBanner = document.querySelector('.banner-next');

previousBanner.onclick = () => {
    clearInterval(slideInterval);
    if (selectedBanner[0].checked === true) selectedBanner[2].checked = true;
    else if (selectedBanner[1].checked === true) selectedBanner[0].checked = true;
    else if (selectedBanner[2].checked === true) selectedBanner[1].checked = true;
    return bannerSlide();
};

nextBanner.onclick = () => {
    clearInterval(slideInterval);
    if (selectedBanner[0].checked === true) selectedBanner[1].checked = true;
    else if (selectedBanner[1].checked === true) selectedBanner[2].checked = true;
    else if (selectedBanner[2].checked === true) selectedBanner[0].checked = true;
    return bannerSlide();
};

const bannerLabels = document.querySelectorAll('.banner-labels > label');
for (let i in bannerLabels) bannerLabels[i].onclick = () => {
    clearInterval(slideInterval);
    bannerSlide();
}