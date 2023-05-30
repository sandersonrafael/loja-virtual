const selectedBanner = document.querySelectorAll('.banners-container input[type="radio"]');
let slideInterval;
const nextBanner = () => {
    if (selectedBanner[0].checked === true) selectedBanner[1].checked = true;
    else if (selectedBanner[1].checked === true) selectedBanner[2].checked = true;
    else if (selectedBanner[2].checked === true) selectedBanner[0].checked = true;
};
const bannerSlide = () => slideInterval = setInterval(nextBanner, 5000);
bannerSlide();

const previousBannerButton = document.querySelector('.banner-previous');
const nextBannerButton = document.querySelector('.banner-next');

previousBannerButton.onclick = () => {
    clearInterval(slideInterval);
    if (selectedBanner[0].checked === true) selectedBanner[2].checked = true;
    else if (selectedBanner[1].checked === true) selectedBanner[0].checked = true;
    else if (selectedBanner[2].checked === true) selectedBanner[1].checked = true;
    return bannerSlide();
};

nextBannerButton.onclick = () => {
    clearInterval(slideInterval);
    nextBanner();
    return bannerSlide();
};

const bannerLabels = document.querySelectorAll('.banner-labels > label');
for (let i in bannerLabels) bannerLabels[i].onclick = () => {
    clearInterval(slideInterval);
    bannerSlide();
};
