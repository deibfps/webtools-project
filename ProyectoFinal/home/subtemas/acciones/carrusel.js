let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carrusel-item');
    const totalItems = items.length;

    // Cálculo del índice actual para el carrusel
    currentIndex = (currentIndex + direction + totalItems) % totalItems;

    const container = document.querySelector('.carrusel-container');
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}