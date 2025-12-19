// ================================================================
// === LÓGICA PARA JUEGO DE NUMEROS ===============================
// ================================================================

// Diccionario de números en mazahua
        const numerosMazahua = {
            1: "naja",
            2: "yeje",
            3: "jñi'i",
            4: "nziyo",
            5: "ts'icha",
            6: "ñanto",
            7: "yencho",
            8: "ñonto",
            9: "nzhincho",
            10: "dyech'a"
        };

        // Variables del juego
        let currentQuestionIndex = 0;
        let score = 0;
        let timeLeft = 10;
        let timerInterval = null;
        let questions = [];
        let isAnswering = false;

        /**
         * Genera un array aleatorio de 10 preguntas sin repetición
         * Cada pregunta tiene un número y sus opciones mezcladas
         */
        function generateQuestions() {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            // Mezclar los números para orden aleatorio
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }

            return numbers.map(num => {
                const correctAnswer = numerosMazahua[num];
                const options = generateOptions(num);
                return {
                    number: num,
                    correctAnswer: correctAnswer,
                    options: options
                };
            });
        }

        /**
         * Genera 4 opciones de respuesta para una pregunta
         * Incluye la respuesta correcta y 3 incorrectas aleatorias
         */
        function generateOptions(correctNumber) {
            const options = [numerosMazahua[correctNumber]];
            const availableNumbers = Object.keys(numerosMazahua)
                .map(n => parseInt(n))
                .filter(n => n !== correctNumber);

            // Seleccionar 3 opciones incorrectas aleatorias
            while (options.length < 4) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                const wrongNumber = availableNumbers[randomIndex];
                const wrongAnswer = numerosMazahua[wrongNumber];
                
                if (!options.includes(wrongAnswer)) {
                    options.push(wrongAnswer);
                }
            }

            // Mezclar las opciones
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            return options;
        }

        /**
         * Inicia el juego
         */
        function startGame() {
            // Ocultar pantalla de inicio y mostrar pantalla de juego
            document.getElementById('startScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.remove('hidden');
            
            // Reiniciar variables
            currentQuestionIndex = 0;
            score = 0;
            questions = generateQuestions();
            
            // Actualizar UI
            document.getElementById('score').textContent = score;
            
            // Mostrar primera pregunta
            showQuestion();
        }

        /**
         * Muestra la pregunta actual con sus opciones
         */
        function showQuestion() {
            if (currentQuestionIndex >= questions.length) {
                endGame();
                return;
            }

            isAnswering = false;
            const question = questions[currentQuestionIndex];
            
            // Actualizar número de la pregunta
            document.getElementById('questionNumber').textContent = question.number;
            document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
            
            // Actualizar barra de progreso
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            
            // Generar botones de opciones
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option;
                button.onclick = () => checkAnswer(option, button);
                optionsContainer.appendChild(button);
            });
            
            // Iniciar temporizador
            startTimer();
        }

        /**
         * Inicia el temporizador de 10 segundos para la pregunta actual
         */
        function startTimer() {
            timeLeft = 10;
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    timeUp();
                }
            }, 1000);
        }

        /**
         * Actualiza la visualización del temporizador con efectos visuales
         */
        function updateTimerDisplay() {
            document.getElementById('timer').textContent = timeLeft;
            
            const timerBox = document.getElementById('timerBox');
            // Cambiar color del temporizador según el tiempo restante
            if (timeLeft <= 3) {
                timerBox.className = 'timer-box danger';
            } else if (timeLeft <= 6) {
                timerBox.className = 'timer-box warning';
            } else {
                timerBox.className = 'timer-box';
            }
        }

        /**
         * Maneja cuando se acaba el tiempo sin respuesta
         */
        function timeUp() {
            if (isAnswering) return;
            
            isAnswering = true;
            
            // Deshabilitar todos los botones
            const buttons = document.querySelectorAll('.option-btn');
            buttons.forEach(btn => {
                btn.disabled = true;
                // Marcar la respuesta correcta
                if (btn.textContent === questions[currentQuestionIndex].correctAnswer) {
                    btn.classList.add('correct');
                }
            });
            
            // Esperar 2 segundos y pasar a la siguiente pregunta
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 2000);
        }

        /**
         * Verifica si la respuesta seleccionada es correcta
         * Calcula los puntos incluyendo bonus por tiempo
         */
        function checkAnswer(selectedAnswer, buttonElement) {
            if (isAnswering) return;
            
            isAnswering = true;
            clearInterval(timerInterval);
            
            const question = questions[currentQuestionIndex];
            const isCorrect = selectedAnswer === question.correctAnswer;
            
            // Deshabilitar todos los botones
            const buttons = document.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.disabled = true);
            
            if (isCorrect) {
                // Respuesta correcta
                buttonElement.classList.add('correct');
                
                // Calcular puntos: 100 base + segundos restantes
                const points = 100 + timeLeft;
                score += points;
                document.getElementById('score').textContent = score;
                
                // Efecto visual de puntos ganados
                showPointsAnimation(points);
            } else {
                // Respuesta incorrecta
                buttonElement.classList.add('incorrect');
                
                // Mostrar la respuesta correcta
                buttons.forEach(btn => {
                    if (btn.textContent === question.correctAnswer) {
                        btn.classList.add('correct');
                    }
                });
            }
            
            // Pasar a la siguiente pregunta después de 2 segundos
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 2000);
        }

        /**
         * Muestra una animación de los puntos ganados
         */
        function showPointsAnimation(points) {
            const scoreBox = document.querySelector('.score-box');
            const pointsElement = document.createElement('div');
            pointsElement.style.cssText = `
                position: absolute;
                color: #38ef7d;
                font-size: 1.5em;
                font-weight: bold;
                animation: floatUp 1s ease-out forwards;
            `;
            pointsElement.textContent = `+${points}`;
            
            // Agregar estilos de animación si no existen
            if (!document.querySelector('#pointsAnimation')) {
                const style = document.createElement('style');
                style.id = 'pointsAnimation';
                style.textContent = `
                    @keyframes floatUp {
                        0% { 
                            transform: translateY(0);
                            opacity: 1;
                        }
                        100% { 
                            transform: translateY(-30px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            scoreBox.style.position = 'relative';
            scoreBox.appendChild(pointsElement);
            
            setTimeout(() => pointsElement.remove(), 1000);
        }

        /**
         * Termina el juego y muestra la pantalla final con el puntaje
         */
        function endGame() {
            clearInterval(timerInterval);
            
            // Ocultar pantalla de juego y mostrar pantalla final
            document.getElementById('gameScreen').classList.add('hidden');
            document.getElementById('endScreen').classList.remove('hidden');
            
            // Mostrar puntuación final
            document.getElementById('finalScore').textContent = score + ' puntos';
            
            // Mensaje personalizado según el puntaje
            let message = '';
            const maxScore = 1100; // Puntuación máxima posible (100 + 10) * 10
            const percentage = (score / maxScore) * 100;
            
            if (percentage >= 90) {
                message = '¡Excelente! 🌟 Eres un maestro de los números mazahuas';
            } else if (percentage >= 70) {
                message = '¡Muy bien! 👏 Tienes un buen dominio de los números';
            } else if (percentage >= 50) {
                message = '¡Bien hecho! 👍 Sigue practicando para mejorar';
            } else {
                message = '¡Sigue intentando! 💪 La práctica hace al maestro';
            }
            
            document.getElementById('scoreMessage').textContent = message;
        }

        /**
         * Reinicia el juego para jugar de nuevo
         */
        function restartGame() {
            // Ocultar pantalla final y mostrar pantalla de inicio
            document.getElementById('endScreen').classList.add('hidden');
            document.getElementById('startScreen').classList.remove('hidden');
        }

