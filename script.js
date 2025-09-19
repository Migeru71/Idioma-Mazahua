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

// ======================================================
// === LÓGICA PARA EL FORMULARIO DE LOGIN (VERSIÓN CON DEPURACIÓN) ========
// ======================================================

// --- Base de Datos Falsa (Usuarios Estáticos) ---
const usuarios = [
    {
        email: 'alumno@correo.com',
        password: '123',
        rol: 'estudiante',
        redirectTo: 'index.html'
    },
    {
        email: 'maestro@correo.com',
        password: '456',
        rol: 'profesor',
        redirectTo: 'panel-profesor.html'
    }
];

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    const rolButtons = document.querySelectorAll('.btn-rol');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('login-error');
    
    let selectedRol = 'estudiante';

    rolButtons.forEach(button => {
        button.addEventListener('click', () => {
            rolButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedRol = button.dataset.rol;
        });
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        console.log("--- Intento de Login Iniciado ---"); // <-- NUEVO

        const email = emailInput.value;
        const password = passwordInput.value;

        // MICRÓFONO 1: Vemos qué datos estamos intentando validar
        console.log("Datos ingresados:", { 
            correo: email, 
            contrasena: password, 
            rol: selectedRol 
        });

        // MICRÓFONO 2: Vemos la "base de datos" que estamos usando
        console.log("Buscando en la base de datos de usuarios:", usuarios);

        const usuarioEncontrado = usuarios.find(user => 
            user.email === email && 
            user.password === password && 
            user.rol === selectedRol
        );
        
        // MICRÓFONO 3: Vemos el resultado de la búsqueda
        console.log("Resultado de la búsqueda (usuarioEncontrado):", usuarioEncontrado);

        if (usuarioEncontrado) {
            // MICRÓFONO 4: Confirmamos que la validación fue exitosa
            console.log("✅ ¡Éxito! Usuario encontrado. Redirigiendo a:", usuarioEncontrado.redirectTo);
            errorElement.textContent = '';
            alert(`¡Bienvenido! Redirigiendo...`);
            window.location.href = usuarioEncontrado.redirectTo;
        } else {
            // MICRÓFONO 5: Confirmamos que la validación falló
            console.log("❌ Fallo: No se encontró un usuario con esos datos.");
            errorElement.textContent = 'Correo, contraseña o rol incorrectos.';
        }

        console.log("--- Fin del Intento de Login ---");
    });
}
});