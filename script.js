document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    const openSidebar = () => {
        sidebar.classList.add('is-open');
        overlay.classList.add('is-open');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', openSidebar);
    menuClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    const dots = document.querySelectorAll('.carrusel-dot');
    const slides = document.querySelectorAll('.carrusel-slide');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('is-active');
            dots[i].classList.remove('is-active');
        });

        slides[index].classList.add('is-active');
        dots[index].classList.add('is-active');
        currentSlide = index; 
    };

    showSlide(currentSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    setInterval(() => {
         currentSlide = (currentSlide + 1) % slides.length;
         showSlide(currentSlide);
    }, 5000);
});