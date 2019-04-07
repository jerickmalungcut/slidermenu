const carousel = document.querySelector('.carousel');
const slides = Array.from(carousel.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const inContainer = document.querySelector('.indicator-container');
const indicator = Array.from(inContainer.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (carousel, activeSlide, targetSlide) => {
    carousel.style.transform = 'translateX( -' + targetSlide.style.left + ')';
    activeSlide.classList.remove('active-slide');
    targetSlide.classList.add('active-slide');
};

const updateIndicator = (activeIndicator, targetIndicator) => {
    activeIndicator.classList.remove('active-slide');
    targetIndicator.classList.add('active-slide');
}

prevBtn.addEventListener('click', e => {
    const activeSlide = carousel.querySelector('.active-slide');
    const activeIndicator = inContainer.querySelector('.active-slide');

    let {prevSlide, prevIndicator} = '';
    if (activeSlide.previousElementSibling) {
        prevSlide = activeSlide.previousElementSibling;
        prevIndicator = activeIndicator.previousElementSibling;
    } else {
        prevSlide = slides[slides.length - 1];
        prevIndicator = indicator[indicator.length - 1];
    }

    moveToSlide(carousel, activeSlide, prevSlide);
    updateIndicator(activeIndicator, prevIndicator);
});

nextBtn.addEventListener('click', e => {
    const activeSlide = carousel.querySelector('.active-slide');
    const activeIndicator = inContainer.querySelector('.active-slide');

    let {nextSlide, nextIndicator} = '';
    if (activeSlide.nextElementSibling) {
        nextSlide = activeSlide.nextElementSibling;
        nextIndicator = activeIndicator.nextElementSibling;
    } else {
        nextSlide = slides[0];
        nextIndicator = indicator[0];
    }

    moveToSlide(carousel, activeSlide, nextSlide);
    updateIndicator(activeIndicator, nextIndicator);
});

inContainer.addEventListener('click', e => {
    const targetIndicator = e.target.closest('button');

    if(!targetIndicator) return;

    const activeSlide = carousel.querySelector('.active-slide');
    const activeIndicator = inContainer.querySelector('.active-slide');
    const targetIndex = indicator.findIndex(dot => dot === targetIndicator);
    const targetSlide = slides[targetIndex];

    moveToSlide(carousel, activeSlide, targetSlide);
    updateIndicator(activeIndicator, targetIndicator);
});