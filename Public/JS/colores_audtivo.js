// ==========================================
// PROGRESO EN LA BASE DE DATOS
// ==========================================

function guardarProgreso(progreso, estado) {

    fetch("../ConfigPHP/guardar_progreso.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_actividad: 8,
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


// ==========================================
// VARIABLES
// ==========================================

const colores = [
    "rojo",
    "azul",
    "amarillo",
    "verde",
    "morado"
];

let colorCorrecto = "";
let puntos = 0;
let ronda = 1;

const totalRondas = 5;


// ==========================================
// ELEMENTOS HTML
// ==========================================

const levelComplete =
    document.getElementById("levelComplete");

const nextLevel =
    document.getElementById("nextLevel");

const botonEscuchar =
    document.getElementById("botonEscuchar");

const opciones =
    document.querySelectorAll(".color");

const mensaje =
    document.getElementById("mensaje");

const siguiente =
    document.getElementById("siguiente");

const puntosTexto =
    document.getElementById("puntos");

const rondaTexto =
    document.getElementById("ronda");

const instruccion =
    document.getElementById("instruccion");


// ==========================================
// ELEGIR COLOR ALEATORIO
// ==========================================

function elegirColor() {

    const indice =
        Math.floor(Math.random() * colores.length);

    colorCorrecto =
        colores[indice];

    instruccion.textContent =
        "Escucha el color";

    mensaje.textContent = "";

    siguiente.style.display =
        "none";


    opciones.forEach(boton => {

        boton.disabled = false;

        boton.classList.remove(
            "correcta",
            "incorrecta"
        );

    });

}


// ==========================================
// DECIR EL COLOR
// ==========================================

function hablarColor() {

    if (!colorCorrecto) {

        elegirColor();

    }


    const voz =
        new SpeechSynthesisUtterance(
            colorCorrecto
        );

    voz.lang = "es-ES";

    voz.rate = 0.8;

    voz.pitch = 1.1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(voz);

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarColor(event) {

    const boton =
        event.currentTarget;

    const colorSeleccionado =
        boton.dataset.color;


    // Evitar responder otra vez

    if (boton.disabled) {

        return;

    }


    // ======================================
    // RESPUESTA CORRECTA
    // ======================================

    if (colorSeleccionado === colorCorrecto) {

        puntos += 10;

        puntosTexto.textContent =
            puntos;


        boton.classList.add(
            "correcta"
        );


        mensaje.textContent =
            "🎉 ¡Correcto!";

        mensaje.className =
            "mensaje-correcto";


        // Desactivar botones

        opciones.forEach(opcion => {

            opcion.disabled = true;

        });


        // ==================================
        // CALCULAR PROGRESO
        // ==================================

        const progreso =
            Math.round(
                (ronda / totalRondas) * 100
            );


        // ==================================
        // RONDAS 1 - 4
        // ==================================

        if (ronda < totalRondas) {

            guardarProgreso(
                progreso,
                "en proceso"
            );


            siguiente.style.display =
                "inline-block";

        }


        // ==================================
        // RONDA 5 - COMPLETADO
        // ==================================

        else {

            guardarProgreso(
                100,
                "completado"
            );


            mensaje.textContent =
                `🏆 ¡Juego terminado! Obtuviste ${puntos} puntos.`;


            // Mostrar pantalla final

            setTimeout(() => {

                showLevelComplete();

            }, 700);

        }

    }


    // ======================================
    // RESPUESTA INCORRECTA
    // ======================================

    else {

        boton.classList.add(
            "incorrecta"
        );


        mensaje.textContent =
            "❌ Incorrecto. ¡Inténtalo de nuevo!";

        mensaje.className =
            "mensaje-error";


        // Volver a activar los botones

        opciones.forEach(opcion => {

            opcion.disabled = false;

        });

    }

}


// ==========================================
// SIGUIENTE RONDA
// ==========================================

function siguienteRonda() {

    if (ronda < totalRondas) {

        ronda++;

        rondaTexto.textContent =
            ronda;

        elegirColor();

    }

}


// ==========================================
// INICIAR JUEGO
// ==========================================

guardarProgreso(
    0,
    "sin iniciar"
);


elegirColor();


// ==========================================
// EVENTOS
// ==========================================

botonEscuchar.addEventListener(
    "click",
    hablarColor
);


opciones.forEach(boton => {

    boton.addEventListener(
        "click",
        comprobarColor
    );

});


siguiente.addEventListener(
    "click",
    siguienteRonda
);


// ==========================================
// FINALIZAR NIVEL
// ==========================================

function showLevelComplete() {

    levelComplete.classList.add(
        "show"
    );

}


// ==========================================
// SIGUIENTE NIVEL
// ==========================================

nextLevel.addEventListener(
    "click",
    () => {

        window.location.href =
            "niveles_auditivo.html";

    }
);