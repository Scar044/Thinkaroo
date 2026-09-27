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
    const contenedor = document.getElementById("options-container");

    if (!contenedor) {
        console.error("No se encontró #options-container");
        return;
    }

    contenedor.innerHTML = "";

    // Crear opciones posibles del 1 al 8
    const numeros = [];

    for (let i = 1; i <= 8; i++) {
        if (i !== respuesta) {
            numeros.push(i);
        }
    }

    // Mezclar las opciones
    numeros.sort(() => Math.random() - 0.5);

    // Tomar 3 opciones incorrectas + la correcta
    const opciones = [
        respuesta,
        numeros[0],
        numeros[1],
        numeros[2]
    ];

    // Mezclar nuevamente
    opciones.sort(() => Math.random() - 0.5);

    opciones.forEach(numero => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.innerText = numero;

        boton.onclick = function () {
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
// MOSTRAR PANTALLA FINAL
// ========================================

function mostrarFinal() {

    const finish =
        document.getElementById("finish");

    if (!finish) {
        console.error(
            "ERROR: No se encontró #finish"
        );
        return;
    }

    // Ocultar mensajes del juego
    const mensaje =
        document.getElementById(
            "feedback-badge"
        );

    if (mensaje) {
        mensaje.className =
            "mensaje oculto";

        mensaje.innerHTML = "";
    }

    // Ocultar opciones
    const opciones =
        document.getElementById(
            "options-container"
        );

    if (opciones) {
        opciones.innerHTML = "";
    }

    // FORZAR EL TEXTO CORRECTO
    const titulo =
        document.getElementById(
            "mensaje-final-titulo"
        );

    const texto =
        document.getElementById(
            "mensaje-final-texto"
        );

    if (titulo) {
        titulo.textContent =
            "¡Excelente ahora tu misión!";
    }

    if (texto) {
        texto.innerHTML =
            "Cuenta cuantos juguetes tienes" +
            "<br>" +
            "¡Aprendiste a contar!";
    }

    // Mostrar pantalla final
    finish.classList.add("show");

    // Botón CONTINUAR
    const boton =
        document.getElementById(
            "botonFinal"
        );

    if (boton) {

        boton.onclick = function () {

            window.location.href =
                "niveles_auditivo.html";

        };

    }

    console.log(
        "PANTALLA FINAL CORRECTA"
    );
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