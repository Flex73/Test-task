document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const container = document.querySelector('.gallery__container');
    const items = document.querySelectorAll('.gallery__item');
    const prevButton = document.querySelector('.gallery__btn_prev');
    const nextButton = document.querySelector('.gallery__btn_next');

    if (gallery) {
        gallery.attributes.removeNamedItem('nojs');
    }

    let isMobile = window.matchMedia && window.matchMedia('screen and (max-width: 600px)').matches;
    let currentPosition = 0;
    const showImages = () => isMobile ? 1 : 3;
    const displayImages = () => Math.ceil(items.length / showImages()) - 1;
    const updateGallery = () => {
        isMobile ? container.style.transform = `translateX(-${100 * currentPosition}vw)` :
        container.style.transform = `translateY(-${100 * currentPosition}vh)`;

        prevButton.classList.toggle('gallery__btn_hidden', currentPosition <= 0);
        nextButton.classList.toggle('gallery__btn_hidden', currentPosition >= displayImages());
    }
    updateGallery();

    prevButton.addEventListener('click', () => {
        currentPosition = Math.max(0, currentPosition - 1);
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentPosition = Math.min(displayImages(), currentPosition + 1);
        updateGallery();
    });

    window.addEventListener('resize', () => {
        if (window.matchMedia && isMobile != window.matchMedia('screen and (max-width: 600px)').matches) {
            isMobile = !isMobile;
            currentPosition = 0;
            container.style.transform = 'initial';
            updateGallery();
        }
    });
});