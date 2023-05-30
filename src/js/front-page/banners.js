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

// responsive banner images

const bannerImages = document.querySelectorAll('.banner-images a img');

const checkBannerImgDevice = () => {
    if (window.innerWidth <= 768) for (let img of bannerImages) img.src = img.src.replace('desktop', 'mobile');
    else if (window.innerWidth > 768) for (let img of bannerImages) img.src = img.src.replace('mobile', 'desktop');
}
checkBannerImgDevice();

window.onresize = () => checkBannerImgDevice();