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

    // Solo ejecuta la lógica si existen carruseles en la página
    if (carouselSlides.length > 0 && carouselDots.length > 0) {
        let currentSlide = 0;

        const showSlide = (index) => {
            // Se asegura de que el índice esté dentro de los límites
            if (index >= carouselSlides.length) {
                index = 0;
            } else if (index < 0) {
                index = carouselSlides.length - 1;
            }

            carouselSlides.forEach(slide => slide.classList.remove('is-active'));
            carouselDots.forEach(dot => dot.classList.remove('is-active'));
            
            carouselSlides[index].classList.add('is-active');
            carouselDots[index].classList.add('is-active');
            
            currentSlide = index;
        };

        // Permite que los puntos funcionen al hacer clic
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // ¡LA CLAVE! Activa el movimiento automático
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Cambia de imagen cada 5000 milisegundos (5 segundos)

        // Muestra el primer slide al cargar la página
        showSlide(0);
    }

 // ================================================================
    // === NUEVA LÓGICA PARA LOGIN CON PESTAÑAS Y FORMULARIOS SEPARADOS
    // ================================================================
    
    // --- Base de Datos Falsa ---
    const usuarios = [
        { rol: 'estudiante', nombre: 'miguel', numero: 101, grado: 3, nombreCompleto: 'Miguel', redirectTo: 'index.html' },
        { email: 'maestro@correo.com', password: '456', rol: 'profesor', nombreCompleto: 'Prof. García', redirectTo: 'panel-profesor.html' }
    ];

    // --- Seleccionamos los elementos de las pestañas y formularios ---
    const tabEstudiante = document.getElementById('tabEstudiante');
    const tabProfesor = document.getElementById('tabProfesor');
    const formEstudiante = document.getElementById('loginFormEstudiante');
    const formProfesor = document.getElementById('loginFormProfesor');

    // Verificamos que estamos en la página de login antes de ejecutar
    if (tabEstudiante && tabProfesor && formEstudiante && formProfesor) {

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

        // --- Lógica para el formulario del Estudiante (MODIFICADA) ---
        formEstudiante.addEventListener('submit', (event) => {
            event.preventDefault();
            // Obtenemos los valores de los tres campos
            const nombreInput = document.getElementById('nombreEstudiante').value.toLowerCase().trim();
            const numeroInput = parseInt(document.getElementById('numeroEstudiante').value, 10);
            const gradoInput = parseInt(document.getElementById('gradoEstudiante').value, 10);
            
            const errorElement = document.getElementById('errorEstudiante');
            
            // Busca un usuario que coincida con los TRES datos
            const usuario = usuarios.find(u => 
                u.rol === 'estudiante' &&
                u.nombre === nombreInput &&
                u.numero === numeroInput &&
                u.grado === gradoInput
            );

            if (usuario) {
                alert(`¡Ximhai (Hola), ${usuario.nombreCompleto}!`);
                window.location.href = usuario.redirectTo;
            } else {
                errorElement.textContent = 'Los datos son incorrectos. Pide ayuda a tu maestro.';
            }
        });

        // --- Lógica para el formulario del Profesor (SIN CAMBIOS) ---
        formProfesor.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('emailProfesor').value;
            const password = document.getElementById('passwordProfesor').value;
            const errorElement = document.getElementById('errorProfesor');

            const usuario = usuarios.find(u => u.email === email && u.password === password && u.rol === 'profesor');

            if (usuario) {
                alert(`¡Bienvenido, ${usuario.nombreCompleto}!`);
                window.location.href = usuario.redirectTo;
            } else {
                errorElement.textContent = 'Correo o contraseña incorrectos.';
            }
        });
    }
});