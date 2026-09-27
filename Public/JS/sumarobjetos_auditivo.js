// ========================================
// PROGRESO DEL JUEGO
// ACTIVIDAD 11 - SUMAS AUDITIVO
// ========================================

function guardarProgreso(progreso, estado) {

    fetch("../ConfigPHP/guardar_progreso.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_actividad: 11,
            progreso: progreso,
            estado: estado
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Progreso guardado:", data);
    })
    .catch(error => {
        console.error("Error al guardar progreso:", error);
    });
}


// ========================================
// ALERTA / MENSAJE FINAL
// ========================================

const alertaFinal = document.getElementById("finish");
const botonFinal = document.getElementById("botonFinal");

function mostrarAlertaFinal() {

    if (alertaFinal) {
        alertaFinal.classList.add("show");
    }

}


// ========================================
// BOTÓN CONTINUAR
// ========================================

if (botonFinal) {

    botonFinal.addEventListener("click", function () {

        window.location.href = "niveles_auditivo.html";

    });

}


// ========================================
// VARIABLES DEL JUEGO
// ========================================

let ronda = 1;
let cantidad = 0;
let puntos = 0;
let respondido = false;
let reproduciendo = false;

let contextoAudio = null;


// ========================================
// INICIAR PROGRESO
// ========================================

guardarProgreso(0, "sin iniciar");


// ========================================
// OBTENER AUDIO
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
// GENERAR PREGUNTA
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


    // RONDAS 1 - 3
    if (ronda <= 3) {

        cantidad =
            Math.floor(Math.random() * 3) + 2;

    }

    // RONDAS 4 - 6
    else if (ronda <= 6) {

        cantidad =
            Math.floor(Math.random() * 3) + 4;

    }

    // RONDAS 7 - 9
    else {

        cantidad =
            Math.floor(Math.random() * 3) + 6;

    }


    generarOpciones(cantidad);

}


// ========================================
// REPRODUCIR SONIDOS
// ========================================

async function reproducirSonidos() {

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


        if (contexto.state === "suspended") {
            await contexto.resume();
        }


        for (let i = 0; i < cantidad; i++) {

            await reproducirTono();

            if (i < cantidad - 1) {

                await esperar(700);

            }

        }

    }

    finally {

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
// REPRODUCIR UN PITIDO
// ========================================

function reproducirTono() {

    return new Promise(resolve => {

        const contexto =
            obtenerAudioContext();

        const oscilador =
            contexto.createOscillator();

        const ganancia =
            contexto.createGain();


        oscilador.type = "sine";


        oscilador.frequency.setValueAtTime(
            523,
            contexto.currentTime
        );


        const ahora =
            contexto.currentTime;


        ganancia.gain.setValueAtTime(
            0.0001,
            ahora
        );


        ganancia.gain.exponentialRampToValueAtTime(
            0.35,
            ahora + 0.05
        );


        ganancia.gain.setValueAtTime(
            0.35,
            ahora + 0.30
        );


        ganancia.gain.exponentialRampToValueAtTime(
            0.0001,
            ahora + 0.50
        );


        oscilador.connect(ganancia);

        ganancia.connect(
            contexto.destination
        );


        oscilador.start(ahora);

        oscilador.stop(
            ahora + 0.55
        );


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
        document.getElementById(
            "options-container"
        );

    contenedor.innerHTML = "";


    const opciones = new Set();

    opciones.add(respuesta);


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


    const mezcladas =
        Array.from(opciones);


    mezcladas.sort(
        () => Math.random() - 0.5
    );


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

    if (reproduciendo) {
        return;
    }

    if (respondido) {
        return;
    }


    const mensaje =
        document.getElementById(
            "feedback-badge"
        );


    // ====================================
    // CORRECTO
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


        // Pasar a la siguiente ronda
        ronda++;


        // ====================================
        // GUARDAR PROGRESO
        // ====================================

        const progreso =
            Math.round(
                ((ronda - 1) / 9) * 100
            );


        if (ronda <= 9) {

            guardarProgreso(
                progreso,
                "en proceso"
            );

        }


        // ====================================
        // SIGUIENTE RONDA O FINAL
        // ====================================

        setTimeout(() => {

            if (ronda > 9) {

                // GUARDAR 100%
                guardarProgreso(
                    100,
                    "completado"
                );


                // MOSTRAR PANTALLA FINAL
                mostrarFinal();

            }

            else {

                generarPregunta();

            }

        }, 1300);

    }


    // ====================================
    // INCORRECTO
    // ====================================

    else {

        mensaje.innerText =
            "👂 Escuchemos otra vez";

        mensaje.className =
            "mensaje";


        document.getElementById(
            "play-button"
        ).disabled = false;

    }

}


// ========================================
// MOSTRAR FINAL
// ========================================

function mostrarFinal() {

    // ------------------------------------
    // PRIMERO: MENSAJE DE FELICITACIÓN
    // ------------------------------------

    const victoria =
        document.getElementById(
            "victory-modal"
        );


    if (victoria) {

        victoria.classList.remove(
            "oculto"
        );

    }


    // ------------------------------------
    // DESPUÉS: TARJETA DE THINKAROO
    // ------------------------------------

    setTimeout(() => {

        mostrarAlertaFinal();

    }, 2500);

}


// ========================================
// REINICIAR JUEGO
// ========================================

function resetGame() {

    ronda = 1;

    cantidad = 0;

    puntos = 0;

    respondido = false;

    reproduciendo = false;


    document.getElementById(
        "score-text"
    ).innerText = "0";


    const victoria =
        document.getElementById(
            "victory-modal"
        );


    if (victoria) {

        victoria.classList.add(
            "oculto"
        );

    }


    if (alertaFinal) {

        alertaFinal.classList.remove(
            "show"
        );

    }


    generarPregunta();

}


// ========================================
// INICIAR JUEGO
// ========================================

window.addEventListener(
    "load",
    generarPregunta
);