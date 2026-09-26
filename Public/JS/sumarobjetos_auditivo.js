// ========================================
// ALERTA FINAL
// ========================================

const alertaFinal =
    document.getElementById("finish");

const botonFinal =
    document.getElementById("botonFinal");


function mostrarAlertaFinal() {

    if (alertaFinal) {

        alertaFinal.classList.add("show");

    }

}


if (botonFinal) {

    botonFinal.addEventListener(
        "click",
        function () {

            window.location.href =
                "niveles_auditivo.html";

        }
    );

}


// ========================================
// VARIABLES DEL JUEGO
// ========================================

let ronda = 1;
let cantidad = 0;
let puntos = 0;

let respondido = false;
let reproduciendo = false;

// Un solo contexto de audio para todo el juego
let contextoAudio = null;


// ========================================
// INICIAR / OBTENER AUDIO
// ========================================

function obtenerAudioContext() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!contextoAudio) {
        contextoAudio = new AudioContext();
    }

    return contextoAudio;
}


// ========================================
// GENERA UNA NUEVA RONDA
// ========================================

function generarPregunta() {

    respondido = false;
    reproduciendo = false;

    const mensaje =
        document.getElementById("feedback-badge");

    const ondas =
        document.getElementById("ondas");

    const boton =
        document.getElementById("play-button");


    mensaje.className = "mensaje oculto";
    mensaje.innerText = "";

    ondas.classList.add("oculto");

    boton.disabled = false;


    // ====================================
    // CANTIDAD DE SONIDOS POR RONDA
    // ====================================

    if (ronda <= 3) {

        // Rondas 1, 2 y 3
        // Entre 2 y 4 sonidos

        cantidad =
            Math.floor(Math.random() * 3) + 2;

    } else if (ronda <= 6) {

        // Rondas 4, 5 y 6
        // Entre 4 y 6 sonidos

        cantidad =
            Math.floor(Math.random() * 3) + 4;

    } else {

        // Rondas 7, 8 y 9
        // Entre 6 y 8 sonidos

        cantidad =
            Math.floor(Math.random() * 3) + 6;
    }


    generarOpciones(cantidad);
}


// ========================================
// REPRODUCIR TODOS LOS SONIDOS
// ========================================

async function reproducirSonidos() {

    // No permitir iniciar otra reproducción
    if (reproduciendo) {
        return;
    }

    reproduciendo = true;
    respondido = false;


    const boton =
        document.getElementById("play-button");

    const ondas =
        document.getElementById("ondas");


    boton.disabled = true;

    ondas.classList.remove("oculto");


    try {

        const contexto =
            obtenerAudioContext();


        // Algunos navegadores suspenden el audio
        if (contexto.state === "suspended") {
            await contexto.resume();
        }


        // ====================================
        // REPRODUCIR EXACTAMENTE "cantidad"
        // ====================================

        for (let i = 0; i < cantidad; i++) {

            // Reproducir un solo pitido
            await reproducirTono();


            // Esperar antes del siguiente pitido
            // excepto después del último
            if (i < cantidad - 1) {

                await esperar(700);

            }
        }

    } finally {

        // La reproducción terminó
        reproduciendo = false;

        ondas.classList.add("oculto");
    }
}


// ========================================
// ESPERA
// ========================================

function esperar(milisegundos) {

    return new Promise(resolve => {

        setTimeout(resolve, milisegundos);

    });
}


// ========================================
// REPRODUCIR UN SOLO PITIDO
// ========================================

function reproducirTono() {

    return new Promise(resolve => {

        const contexto =
            obtenerAudioContext();


        const oscilador =
            contexto.createOscillator();

        const ganancia =
            contexto.createGain();


        // Tipo de sonido
        oscilador.type = "sine";


        // Frecuencia del pitido
        // 523 Hz = Do
        oscilador.frequency.setValueAtTime(
            523,
            contexto.currentTime
        );


        const ahora =
            contexto.currentTime;


        // ====================================
        // VOLUMEN
        // ====================================

        ganancia.gain.setValueAtTime(
            0.0001,
            ahora
        );


        // Subida rápida
        ganancia.gain.exponentialRampToValueAtTime(
            0.35,
            ahora + 0.05
        );


        // Mantener
        ganancia.gain.setValueAtTime(
            0.35,
            ahora + 0.30
        );


        // Bajar
        ganancia.gain.exponentialRampToValueAtTime(
            0.0001,
            ahora + 0.50
        );


        // ====================================
        // CONECTAR AUDIO
        // ====================================

        oscilador.connect(ganancia);

        ganancia.connect(contexto.destination);


        // ====================================
        // INICIAR SONIDO
        // ====================================

        oscilador.start(ahora);

        oscilador.stop(ahora + 0.55);


        // Cuando termina el sonido
        oscilador.onended = () => {

            oscilador.disconnect();
            ganancia.disconnect();

            resolve();
        };

    });
}


// ========================================
// GENERAR OPCIONES
// ========================================

function generarOpciones(respuesta) {

    const contenedor =
        document.getElementById("options-container");


    contenedor.innerHTML = "";


    const opciones =
        new Set();


    // ====================================
    // RESPUESTA CORRECTA
    // ====================================

    opciones.add(respuesta);


    // ====================================
    // CREAR 3 RESPUESTAS INCORRECTAS
    // ====================================

    while (opciones.size < 4) {

        const cambio =
            Math.floor(Math.random() * 5) - 2;


        const numero =
            respuesta + cambio;


        if (
            numero >= 1 &&
            numero <= 8 &&
            numero !== respuesta
        ) {

            opciones.add(numero);
        }
    }


    // ====================================
    // MEZCLAR OPCIONES
    // ====================================

    const mezcladas =
        Array.from(opciones);


    mezcladas.sort(
        () => Math.random() - 0.5
    );


    // ====================================
    // CREAR BOTONES
    // ====================================

    mezcladas.forEach(numero => {

        const boton =
            document.createElement("button");


        boton.innerText = numero;


        boton.onclick = () => {

            comprobar(numero, boton);

        };


        contenedor.appendChild(boton);

    });
}


// ========================================
// COMPROBAR RESPUESTA
// ========================================

function comprobar(numero, boton) {

    // No permitir responder mientras
    // están sonando los pitidos
    if (reproduciendo) {

        return;
    }


    // No permitir responder dos veces
    if (respondido) {

        return;
    }


    const mensaje =
        document.getElementById("feedback-badge");


    // ====================================
    // RESPUESTA CORRECTA
    // ====================================

    if (numero === cantidad) {

        respondido = true;


        boton.classList.add("bien");


        puntos++;


        document.getElementById(
            "score-text"
        ).innerText = puntos;


        mensaje.innerText =
            "🎉 ¡MUY BIEN!";


        mensaje.className =
            "mensaje correcto";


        ronda++;


        // Esperar antes de pasar
        // a la siguiente ronda

        setTimeout(() => {

            if (ronda > 9) {

                mostrarFinal();

            } else {

                generarPregunta();

            }

        }, 1300);

    }


    // ====================================
    // RESPUESTA INCORRECTA
    // ====================================

    else {

        mensaje.innerText =
            "👂 Escuchemos otra vez";


        mensaje.className =
            "mensaje";


        // Permitir volver a escuchar

        document.getElementById(
            "play-button"
        ).disabled = false;
    }
}


// ========================================
// MOSTRAR PANTALLA FINAL
// ========================================

function mostrarFinal() {

    document
        .getElementById("victory-modal")
        .classList.remove("oculto");


    // Mostrar la alerta final después
    // de la pantalla de victoria

    setTimeout(() => {

        mostrarAlertaFinal();

    }, 700);
}


// ========================================
// REINICIAR JUEGO
// ========================================

function resetGame() {

    ronda = 1;
    puntos = 0;

    respondido = false;
    reproduciendo = false;


    document.getElementById(
        "score-text"
    ).innerText = "0";


    document
        .getElementById("victory-modal")
        .classList.add("oculto");


    generarPregunta();
}


// ========================================
// INICIAR JUEGO
// ========================================

window.addEventListener(
    "load",
    generarPregunta
);