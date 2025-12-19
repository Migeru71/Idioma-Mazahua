
// ================================================================
// === LÓGICA PARA JUEGO AHORCADO =================================
// ================================================================

// Elementos de las pantallas
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');

// Lista de palabras en mazahua
const palabrasMazahua = [
    { palabra: 'NANA', significado: 'mamá' }, { palabra: 'TATA', significado: 'papá' },
    { palabra: 'KANI', significado: 'perro' }, { palabra: 'MICHI', significado: 'gato' },
    { palabra: 'TSUNGI', significado: 'sol' }, { palabra: 'JÑAA', significado: 'luna' },
    { palabra: 'YEJE', significado: 'agua' }, { palabra: 'JÑIÑI', significado: 'cabeza' },
    { palabra: 'MBARA', significado: 'casa' }, { palabra: 'ÑEJE', significado: 'tres' }
];

// Variables del juego
let palabraActual = null, palabraOculta = [], letrasUsadas = [], letrasIncorrectas = [], intentosRestantes = 6, juegoTerminado = false;
const partesAhorcado = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

/**
 * Inicia el juego, cambiando de la pantalla de inicio a la del juego
 */
function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Si es la primera vez, crea el teclado
    if (!document.getElementById('keyboard').hasChildNodes()) {
        crearTeclado();
    }
    
    resetGame();
}

/**
 * Crea el teclado virtual
 */
function crearTeclado() {
    const teclado = document.getElementById('keyboard');
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    
    letras.forEach(letra => {
        const boton = document.createElement('button');
        boton.className = 'key';
        boton.textContent = letra;
        boton.id = `key-${letra}`;
        boton.onclick = () => seleccionarLetra(letra);
        teclado.appendChild(boton);
    });
}

/**
 * Reinicia el juego con una nueva palabra y resetea el estado
 */
function resetGame() {
    const indiceAleatorio = Math.floor(Math.random() * palabrasMazahua.length);
    palabraActual = palabrasMazahua[indiceAleatorio];
    
    palabraOculta = Array(palabraActual.palabra.length).fill('_');
    letrasUsadas = [];
    letrasIncorrectas = [];
    intentosRestantes = 6;
    juegoTerminado = false;
    
    actualizarPalabraOculta();
    actualizarIntentosRestantes();
    actualizarLetrasIncorrectas();
    resetearTeclado();
    resetearAhorcado();
}

/**
 * Procesa la letra seleccionada por el jugador
 */
function seleccionarLetra(letra) {
    if (juegoTerminado || letrasUsadas.includes(letra)) return;
    
    letrasUsadas.push(letra);
    document.getElementById(`key-${letra}`).disabled = true;
    
    if (palabraActual.palabra.includes(letra)) {
        palabraActual.palabra.split('').forEach((char, index) => {
            if (char === letra) palabraOculta[index] = letra;
        });
        document.getElementById(`key-${letra}`).classList.add('correct');
        actualizarPalabraOculta();
        if (!palabraOculta.includes('_')) ganarJuego();
    } else {
        document.getElementById(`key-${letra}`).classList.add('incorrect');
        letrasIncorrectas.push(letra);
        intentosRestantes--;
        actualizarLetrasIncorrectas();
        actualizarIntentosRestantes();
        mostrarParteAhorcado();
        if (intentosRestantes === 0) perderJuego();
    }
}

// --- Funciones para actualizar la interfaz ---
function actualizarPalabraOculta() { document.getElementById('wordDisplay').textContent = palabraOculta.join(' '); }
function actualizarIntentosRestantes() { document.getElementById('attemptsLeft').textContent = intentosRestantes; }
function actualizarLetrasIncorrectas() { document.getElementById('wrongLetters').textContent = letrasIncorrectas.length > 0 ? letrasIncorrectas.join(' ') : '-'; }
function mostrarParteAhorcado() {
    const parteIndex = 5 - intentosRestantes;
    if (parteIndex >= 0) document.getElementById(partesAhorcado[parteIndex]).style.display = 'block';
}
function resetearAhorcado() { partesAhorcado.forEach(p => document.getElementById(p).style.display = 'none'); }
function resetearTeclado() {
    document.querySelectorAll('.key').forEach(b => {
        b.disabled = false;
        b.classList.remove('correct', 'incorrect');
    });
}

/**
 * Maneja la victoria del jugador
 */
function ganarJuego() {
    juegoTerminado = true;
    mostrarPantallaFinal(true);
}

/**
 * Maneja la derrota del jugador
 */
function perderJuego() {
    juegoTerminado = true;
    mostrarPantallaFinal(false);
}

/**
 * Muestra la pantalla final con el mensaje de victoria o derrota
 */
function mostrarPantallaFinal(victoria) {
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');

    const titulo = document.getElementById('endTitle');
    const mensaje = document.getElementById('endMessage');
    const revelacion = document.getElementById('wordReveal');

    if (victoria) {
        titulo.textContent = '🎉 ¡Jangoje! ¡Adivinaste! 🎉';
        mensaje.textContent = '¡Excelente trabajo! Has adivinado la palabra correctamente.';
        revelacion.textContent = `${palabraActual.palabra} = ${palabraActual.significado}`;
    } else {
        titulo.textContent = '😔 Perdiste 😔';
        mensaje.textContent = 'No te preocupes, ¡sigue practicando!';
        revelacion.textContent = `La palabra era: ${palabraActual.palabra} (${palabraActual.significado})`;
    }
}