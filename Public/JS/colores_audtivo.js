// ===============================
// VARIABLES
// ===============================

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


// ===============================
// ELEMENTOS HTML
// ===============================

const botonEscuchar = document.getElementById("botonEscuchar");
const opciones = document.querySelectorAll(".color");
const mensaje = document.getElementById("mensaje");
const siguiente = document.getElementById("siguiente");
const reiniciar = document.getElementById("reiniciar");

const puntosTexto = document.getElementById("puntos");
const rondaTexto = document.getElementById("ronda");
const instruccion = document.getElementById("instruccion");


// ===============================
// ELEGIR COLOR ALEATORIO
// ===============================

function elegirColor() {

    const indice = Math.floor(Math.random() * colores.length);

    colorCorrecto = colores[indice];

    instruccion.textContent = "Escucha el color";

    mensaje.textContent = "";

    siguiente.style.display = "none";

    opciones.forEach(boton => {
        boton.disabled = false;
        boton.classList.remove("correcta", "incorrecta");
    });
}


// ===============================
// DECIR EL COLOR
// ===============================

function hablarColor() {

    if (!colorCorrecto) {
        elegirColor();
    }

    const voz = new SpeechSynthesisUtterance(colorCorrecto);

    voz.lang = "es-ES";
    voz.rate = 0.8;
    voz.pitch = 1.1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(voz);
}


// ===============================
// COMPROBAR RESPUESTA
// ===============================

function comprobarColor(event) {

    const boton = event.currentTarget;
    const colorSeleccionado = boton.dataset.color;

    // Evitar responder otra vez
    if (boton.disabled) {
        return;
    }

    // Desactivar todos los colores
    opciones.forEach(opcion => {
        opcion.disabled = true;
    });


    // RESPUESTA CORRECTA
    if (colorSeleccionado === colorCorrecto) {

        puntos += 10;

        puntosTexto.textContent = puntos;

        boton.classList.add("correcta");

        mensaje.textContent = "🎉 ¡Correcto!";
        mensaje.className = "mensaje-correcto";

        // Si todavía quedan rondas
        if (ronda < totalRondas) {

            siguiente.style.display = "inline-block";

        } else {

            mensaje.textContent =
                `🏆 ¡Juego terminado! Obtuviste ${puntos} puntos.`;

            reiniciar.style.display = "inline-block";
        }

    }

    // RESPUESTA INCORRECTA
    else {

        boton.classList.add("incorrecta");

        mensaje.textContent =
            "❌ Incorrecto. ¡Inténtalo de nuevo!";

        mensaje.className = "mensaje-error";

        // Volver a activar los botones
        opciones.forEach(opcion => {
            opcion.disabled = false;
        });

    }
}


// ===============================
// SIGUIENTE RONDA
// ===============================

function siguienteRonda() {

    ronda++;

    rondaTexto.textContent = ronda;

    elegirColor();

}


// ===============================
// REINICIAR JUEGO
// ===============================

function reiniciarJuego() {

    puntos = 0;
    ronda = 1;

    puntosTexto.textContent = puntos;
    rondaTexto.textContent = ronda;

    reiniciar.style.display = "none";

    elegirColor();

}


// ===============================
// EVENTOS
// ===============================

botonEscuchar.addEventListener("click", hablarColor);

opciones.forEach(boton => {
    boton.addEventListener("click", comprobarColor);
});

siguiente.addEventListener("click", siguienteRonda);

reiniciar.addEventListener("click", reiniciarJuego);


// ===============================
// INICIAR JUEGO
// ===============================

elegirColor();