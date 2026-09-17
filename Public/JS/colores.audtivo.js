document.addEventListener("DOMContentLoaded", function () {

// ==========================================
// ELEMENTOS
// ==========================================

const colores =
    document.querySelectorAll(".color");


const botonEscuchar =
    document.getElementById("botonEscuchar");


const puntosTexto =
    document.getElementById("puntos");


const mensaje =
    document.getElementById("mensaje");


const siguiente =
    document.getElementById("siguiente");


const instruccion =
    document.getElementById("instruccion");


// ==========================================
// VARIABLES
// ==========================================

let puntos = 0;

let colorCorrecto = null;

let juegoActivo = false;

let ronda = 0;

const totalRondas = 5;


// ==========================================
// NOMBRES DE LOS COLORES
// ==========================================

const nombres = {

    rojo: "rojo",

    azul: "azul",

    amarillo: "amarillo",

    verde: "verde",

    morado: "morado"

};


// ==========================================
// HABLAR
// ==========================================

function hablar(texto) {

    // Cancelar voz anterior

    window.speechSynthesis.cancel();


    const voz =
        new SpeechSynthesisUtterance(texto);


    voz.lang = "es-ES";


    voz.rate = 0.8;


    voz.pitch = 1.1;


    voz.volume = 1;


    window.speechSynthesis.speak(voz);

}


// ==========================================
// NUEVA RONDA
// ==========================================

function nuevaRonda() {

    ronda++;


    // Elegir color al azar

    const numero =
        Math.floor(
            Math.random() *
            Object.keys(nombres).length
        );


    colorCorrecto =
        Object.keys(nombres)[numero];


    juegoActivo = true;


    // Limpiar botones

    colores.forEach(function (color) {

        color.classList.remove("correcta");

        color.classList.remove("incorrecta");

        color.disabled = false;

    });


    // Limpiar mensaje

    mensaje.textContent = "";

    mensaje.className = "mensaje";


    instruccion.textContent =
        "Escucha el color y selecciónalo.";


    // Actualizar botón

    siguiente.style.display = "none";


    // Decir el color

    hablar(
        nombres[colorCorrecto]
    );

}


// ==========================================
// BOTÓN ESCUCHAR
// ==========================================

botonEscuchar.addEventListener(
    "click",
    function () {

        if (!colorCorrecto) {

            nuevaRonda();

            return;

        }


        hablar(
            nombres[colorCorrecto]
        );

    }
);


// ==========================================
// SELECCIONAR COLOR
// ==========================================

colores.forEach(function (color) {

    color.addEventListener(
        "click",
        function () {


            if (!juegoActivo) {

                return;

            }


            const colorSeleccionado =
                this.dataset.color;


            // ==================================
            // CORRECTO
            // ==================================

            if (
                colorSeleccionado ===
                colorCorrecto
            ) {


                this.classList.add(
                    "correcta"
                );


                puntos += 10;


                puntosTexto.textContent =
                    puntos;


                mensaje.textContent =
                    "🎉 ¡Muy bien!";


                mensaje.className =
                    "mensaje correcto";


                // Voz

                hablar(
                    "¡Muy bien!"
                );


                juegoActivo = false;


                // Desactivar colores

                colores.forEach(
                    function (boton) {

                        boton.disabled = true;

                    }
                );


                // Mostrar siguiente

                if (ronda < totalRondas) {

                    siguiente.style.display =
                        "block";

                }

                else {

                    terminarJuego();

                }


            }


            // ==================================
            // INCORRECTO
            // ==================================

            else {


                this.classList.add(
                    "incorrecta"
                );


                mensaje.textContent =
                    "😊 Inténtalo otra vez";


                mensaje.className =
                    "mensaje error";


                hablar(
                    "Inténtalo otra vez"
                );


                setTimeout(
                    function () {

                        color.classList.remove(
                            "incorrecta"
                        );

                    },
                    600
                );

            }

        }
    );

});


// ==========================================
// SIGUIENTE
// ==========================================

siguiente.addEventListener(
    "click",
    function () {

        nuevaRonda();

    }
);


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {


    juegoActivo = false;


    siguiente.style.display =
        "none";


    instruccion.textContent =
        "¡Has completado todas las rondas!";


    mensaje.textContent =
        "🎉 Conseguíste " +
        puntos +
        " puntos";


    mensaje.className =
        "mensaje correcto";


    hablar(
        "¡Juego terminado! Conseguíste " +
        puntos +
        " puntos"
    );

}


// ==========================================
// INICIAR
// ==========================================

nuevaRonda();


});