document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentIndex = 0;

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }
});
