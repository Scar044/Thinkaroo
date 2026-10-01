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

function elegirColor() {

    const indice =
        Math.floor(Math.random() * colores.length);

    colorCorrecto =
        colores[indice];

    instruccion.textContent =
        translate("colorsGame.listenInstruction");

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

function comprobarColor(event) {

    const boton =
        event.currentTarget;

    const colorSeleccionado =
        boton.dataset.color;

    if (boton.disabled) {

        return;

    }

    if (colorSeleccionado === colorCorrecto) {

        puntos += 10;

        puntosTexto.textContent =
            puntos;


        boton.classList.add(
            "correcta"
        );


        mensaje.textContent =
            translate("colorsGame.correct");

        mensaje.className =
            "mensaje-correcto";

        opciones.forEach(opcion => {

            opcion.disabled = true;

        });

        const progreso =
            Math.round(
                (ronda / totalRondas) * 100
            );

        if (ronda < totalRondas) {

            guardarProgreso(
                progreso,
                "en proceso"
            );


            siguiente.style.display =
                "inline-block";

        }

        else {

            guardarProgreso(
                100,
                "completado"
            );


            mensaje.textContent =
                `🏆 ¡Juego terminado! Obtuviste ${puntos} puntos.`;

            setTimeout(() => {

                showLevelComplete();

            }, 700);

        }

    }

    else {

        boton.classList.add(
            "incorrecta"
        );


        mensaje.textContent =
            translate("colorsGame.incorrect");

        mensaje.className =
            "mensaje-error";

        opciones.forEach(opcion => {

            opcion.disabled = false;

        });

    }

}

function siguienteRonda() {

    if (ronda < totalRondas) {

        ronda++;

        document.getElementById("ronda").textContent =
            ronda;

        elegirColor();

    }

}

guardarProgreso(
    0,
    "sin iniciar"
);


elegirColor();

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

function showLevelComplete() {

    levelComplete.classList.add(
        "show"
    );

}

nextLevel.addEventListener(
    "click",
    () => {

        window.location.href =
            "niveles_auditivo.html";

    }
);