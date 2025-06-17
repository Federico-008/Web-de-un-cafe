document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que la taza exista
    const coffeeCup = document.querySelector('.coffee-cup');
    if (!coffeeCup) return;

    const pupils = document.querySelectorAll('.pupil');
    const eyes = document.querySelectorAll('.eye');
    const face = document.querySelector('.face');
    const formulario = document.querySelector('.formulario');
    const inputs = document.querySelectorAll('.formulario input, .formulario textarea');
    let isTyping = false;
    let currentInput = null;
    let isMouseInForm = false;
    
    // Hacer visible la taza inmediatamente
    coffeeCup.style.opacity = '1';
    
    // Función mejorada para hacer parpadear los ojos
    function blink() {
        // Añadir clase para cerrar los ojos
        eyes.forEach(eye => eye.classList.add('blink'));
        
        // Abrir los ojos después de 300ms (más lento)
        setTimeout(() => {
            eyes.forEach(eye => eye.classList.remove('blink'));
        }, 300);

        // Ocasionalmente hacer un doble parpadeo
        if (Math.random() > 0.8) {  // 20% de probabilidad de doble parpadeo
            setTimeout(() => {
                eyes.forEach(eye => eye.classList.add('blink'));
                setTimeout(() => {
                    eyes.forEach(eye => eye.classList.remove('blink'));
                }, 300);  // Mismo tiempo para el segundo parpadeo
            }, 400);  // Pequeña pausa entre parpadeos
        }
    }

    // Iniciar el intervalo de parpadeo cada 7 segundos
    setInterval(blink, 7000);
    
    // Hacer un parpadeo inicial después de 500ms
    setTimeout(blink, 500);

    // Modificar la función de parpadeo aleatorio para que sea menos frecuente
    function randomBlink() {
        if (Math.random() > 0.9 && !eyes[0].classList.contains('blink')) {  // 10% de probabilidad
            blink();
        }
    }

    // Añadir parpadeos aleatorios ocasionales al mover el mouse sobre el formulario
    formulario.addEventListener('mousemove', () => {
        randomBlink();
    });

    // Función para que los ojos miren al frente
    function lookForward() {
        pupils.forEach(pupil => {
            pupil.style.transform = 'translate(-50%, -50%)';
        });
    }

    // Función para calcular la posición de la pupila
    function calculatePupilPosition(mouseX, mouseY, eye) {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        // Calcular el ángulo entre el ojo y el cursor
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        
        // Limitar el movimiento de la pupila
        const distance = 2; // Reducimos la distancia para un movimiento más sutil
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        return { x: pupilX, y: pupilY };
    }

    // Función para mover las pupilas
    function movePupils(mouseX, mouseY) {
        if (!isMouseInForm && !isTyping) {
            lookForward();
            return;
        }

        pupils.forEach(pupil => {
            const eye = pupil.parentElement;
            const { x, y } = calculatePupilPosition(mouseX, mouseY, eye);
            pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    // Función para seguir el cursor
    function followCursor(e) {
        if (isTyping && currentInput) {
            const inputRect = currentInput.getBoundingClientRect();
            const cursorX = e.clientX;
            const cursorY = inputRect.top + inputRect.height / 2;
            movePupils(cursorX, cursorY);
        } else if (isMouseInForm) {
            movePupils(e.clientX, e.clientY);
        }
    }

    // Detectar cuando el mouse entra y sale del formulario
    formulario.addEventListener('mouseenter', () => {
        isMouseInForm = true;
    });

    formulario.addEventListener('mouseleave', () => {
        isMouseInForm = false;
        if (!isTyping) {
            lookForward();
        }
    });

    // Manejar eventos de input
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            isTyping = true;
            currentInput = this;
            face.classList.add('happy');
            this.classList.add('input-active');

            // Mover pupilas al centro del input
            const rect = this.getBoundingClientRect();
            movePupils(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });

        input.addEventListener('blur', function() {
            isTyping = false;
            currentInput = null;
            face.classList.remove('happy');
            this.classList.remove('input-active');
            
            // Si el mouse no está en el formulario, mirar al frente
            if (!isMouseInForm) {
                lookForward();
            }
        });

        input.addEventListener('input', function(e) {
            if (this.tagName.toLowerCase() === 'textarea') {
                const rect = this.getBoundingClientRect();
                const lines = this.value.substr(0, this.selectionStart).split('\n').length;
                const lineHeight = parseInt(window.getComputedStyle(this).lineHeight);
                movePupils(e.clientX || rect.left + rect.width / 2, rect.top + (lines * lineHeight));
            }
        });

        input.addEventListener('mousemove', function(e) {
            if (isTyping && this === currentInput) {
                movePupils(e.clientX, e.clientY);
            }
        });
    });

    // Seguir el cursor solo cuando esté dentro del formulario
    document.addEventListener('mousemove', followCursor);

    // Modificar el evento de envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        face.classList.add('super-happy');
        
        // Secuencia de parpadeos más lenta
        blink();
        setTimeout(blink, 400);
        setTimeout(blink, 800);
        
        // Animar pupilas
        pupils.forEach(pupil => {
            pupil.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                pupil.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });

        setTimeout(() => {
            face.classList.remove('super-happy');
            lookForward();
        }, 1200);
    });

    // Posición inicial de las pupilas mirando al frente
    lookForward();
}); 