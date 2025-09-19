document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // === LÓGICA PARA COMPONENTES (SIDEBAR Y CARRUSEL) =====
    // ======================================================
    
    // --- Lógica de la Barra Lateral ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (menuToggle && menuClose && sidebar && overlay) {
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
    }
    
    // --- Lógica del Carrusel ---
    const carouselSlides = document.querySelectorAll('.carrusel-slide');
    const carouselDots = document.querySelectorAll('.carrusel-dot');

    if (carouselSlides.length > 0 && carouselDots.length > 0) {
        let currentSlide = 0;
        const showSlide = (index) => {
            carouselSlides.forEach(slide => slide.classList.remove('is-active'));
            carouselDots.forEach(dot => dot.classList.remove('is-active'));
            carouselSlides[index].classList.add('is-active');
            carouselDots[index].classList.add('is-active');
            currentSlide = index;
        };

        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        if(carouselSlides.length > 0) {
            showSlide(0);
        }
    }

 // ================================================================
    // === NUEVA LÓGICA PARA LOGIN CON PESTAÑAS Y FORMULARIOS SEPARADOS
    // ================================================================
    
    // --- Base de Datos Falsa ---
    const usuarios = [
        { email: 'alumno@correo.com', password: '123', rol: 'estudiante', redirectTo: 'index.html' },
        { email: 'maestro@correo.com', password: '456', rol: 'profesor', redirectTo: 'panel-profesor.html' }
    ];

    // --- Seleccionamos los elementos de las pestañas y formularios ---
    const tabEstudiante = document.getElementById('tabEstudiante');
    const tabProfesor = document.getElementById('tabProfesor');
    const formEstudiante = document.getElementById('loginFormEstudiante');
    const formProfesor = document.getElementById('loginFormProfesor');

    // Verificamos que estamos en la página de login antes de ejecutar
    if (tabEstudiante && tabProfesor && formEstudiante && formProfesor) {

        // --- Lógica para cambiar de pestaña ---
        tabEstudiante.addEventListener('click', () => {
            tabEstudiante.classList.add('active');
            tabProfesor.classList.remove('active');
            formEstudiante.classList.remove('hidden');
            formProfesor.classList.add('hidden');
        });

        tabProfesor.addEventListener('click', () => {
            tabProfesor.classList.add('active');
            tabEstudiante.classList.remove('active');
            formProfesor.classList.remove('hidden');
            formEstudiante.classList.add('hidden');
        });

        // --- Lógica para el formulario del Estudiante ---
        formEstudiante.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('emailEstudiante').value;
            const password = document.getElementById('passwordEstudiante').value;
            const errorElement = document.getElementById('errorEstudiante');
            
            const usuario = usuarios.find(u => u.email === email && u.password === password && u.rol === 'estudiante');

            if (usuario) {
                window.location.href = usuario.redirectTo;
            } else {
                errorElement.textContent = 'Correo o contraseña incorrectos.';
            }
        });

        // --- Lógica para el formulario del Profesor ---
        formProfesor.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('emailProfesor').value;
            const password = document.getElementById('passwordProfesor').value;
            const errorElement = document.getElementById('errorProfesor');

            const usuario = usuarios.find(u => u.email === email && u.password === password && u.rol === 'profesor');

            if (usuario) {
                window.location.href = usuario.redirectTo;
            } else {
                errorElement.textContent = 'Correo o contraseña incorrectos.';
            }
        });
    }
});