"use strict";

function guardarProgreso(progreso, estado) {

    fetch("../ConfigPHP/guardar_progreso.php", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id_actividad: 7,
            progreso: progreso,
            estado: estado
        })
    })

    .then(response => response.json())

    .then(data => {
        console.log("Progreso guardado:", data);
    })

    .catch(error => {
        console.error(
            "Error al guardar progreso:",
            error
        );
    });
}




let puntos = 0;

let ronda = 1;

let objetoSeleccionado = null;

let objetosCorrectos = 0;

const TOTAL_RONDAS = 5;




const objetos = [

    {
        nameKey: "colorsVisual.apple",
        emoji: "🍎",
        color: "rojo"
    },

    {
        nameKey: "colorsVisual.blueBerry",
        emoji: "🫐",
        color: "azul"
    },

    {
        nameKey: "colorsVisual.lemon",
        emoji: "🍋",
        color: "amarillo"
    },

    {
        nameKey: "colorsVisual.greenApple",
        emoji: "🍏",
        color: "verde"
    }

];


const puntosElement =
    document.getElementById("puntos");

const rondaElement =
    document.getElementById("ronda");

const preguntaElement =
    document.getElementById("pregunta");

const objetosElement =
    document.getElementById("objetos");

const mensajeElement =
    document.getElementById("mensaje");

const siguienteButton =
    document.getElementById("siguiente");

const finishElement =
    document.getElementById("finish");

const botonFinal =
    document.getElementById("botonFinal");


function t(key, fallback = "") {

    if (typeof window.translate === "function") {

        return window.translate(
            key,
            fallback
        );

    }

    return fallback || key;
}

function crearRonda() {

    objetoSeleccionado = null;

    objetosCorrectos = 0;


    mensajeElement.textContent = "";

    mensajeElement.style.color = "";


    siguienteButton.style.display =
        "none";


    objetosElement.innerHTML = "";


    const objetosMezclados =
        [...objetos].sort(
            () => Math.random() - 0.5
        );


    objetosMezclados.forEach(
        function(item, indice) {

            const boton =
                document.createElement("button");


            boton.type = "button";


            boton.classList.add(
                "objeto"
            );


            boton.classList.add(
                item.color
            );


            boton.textContent =
                item.emoji;


            boton.dataset.color =
                item.color;


            boton.dataset.id =
                indice;


            boton.setAttribute(
                "aria-label",
                t(item.nameKey)
            );


            boton.addEventListener(
                "click",
                function() {

                    seleccionarObjeto(
                        boton
                    );

                }
            );


            objetosElement.appendChild(
                boton
            );

        }
    );


    activarCajas();

}



function seleccionarObjeto(boton) {

    document
        .querySelectorAll(".objeto")
        .forEach(
            function(objeto) {

                objeto.classList.remove(
                    "seleccionado"
                );

            }
        );


    boton.classList.add(
        "seleccionado"
    );


    objetoSeleccionado =
        boton;


    const color =
        boton.dataset.color;


    preguntaElement.textContent =
        t(
            "colorsVisual.chooseBox",
            "Ahora toca la caja"
        ) +
        " " +
        t(
            "colorsVisual." + color,
            color
        ).toUpperCase() +
        " 👆";


    mensajeElement.textContent = "";

}



function activarCajas() {

    const cajas =
        document.querySelectorAll(".caja");


    cajas.forEach(
        function(caja) {

            caja.onclick =
                function() {

                    comprobarCaja(
                        caja
                    );

                };

        }
    );

}


function comprobarCaja(caja) {

    if (
        objetoSeleccionado === null
    ) {

        mostrarMensaje(
            t(
                "colorsVisual.selectFirst",
                "👆 Primero selecciona un objeto."
            ),
            "orange"
        );

        return;
    }


    const colorObjeto =
        objetoSeleccionado.dataset.color;


    const colorCaja =
        caja.dataset.color;


    if (colorObjeto === colorCaja) {

        puntos += 10;

        objetosCorrectos++;


        puntosElement.textContent =
            puntos;


        mostrarMensaje(
            t(
                "colorsVisual.correct",
                "🎉 ¡Muy bien!"
            ),
            "green"
        );


        objetoSeleccionado.style.visibility =
            "hidden";


        objetoSeleccionado.classList.remove(
            "seleccionado"
        );


        objetoSeleccionado =
            null;


        preguntaElement.textContent =
            t(
                "colorsVisual.findAnother",
                "¡Busca otro objeto! 😊"
            );


        if (
            objetosCorrectos ===
            objetos.length
        ) {

            terminarRonda();

        }

    }

    else {

        mostrarMensaje(
            t(
                "colorsVisual.wrong",
                "😊 Ese no es su color. ¡Inténtalo otra vez!"
            ),
            "orange"
        );

    }

}


function mostrarMensaje(
    texto,
    color
) {

    mensajeElement.textContent =
        texto;


    mensajeElement.style.color =
        color;

}


function terminarRonda() {

    preguntaElement.textContent =
        t(
            "colorsVisual.roundComplete",
            "🎉 ¡Completaste la ronda!"
        );


    mostrarMensaje(
        t(
            "colorsVisual.excellent",
            "¡Excelente trabajo! ⭐"
        ),
        "green"
    );


    const progreso =
        Math.round(
            (ronda / TOTAL_RONDAS) * 100
        );


    if (
        ronda < TOTAL_RONDAS
    ) {

        guardarProgreso(
            progreso,
            "en proceso"
        );


        siguienteButton.style.display =
            "block";

    }

    else {

        terminarJuego();

    }

}

function siguienteRonda() {

    if (
        ronda < TOTAL_RONDAS
    ) {

        ronda++;


        rondaElement.textContent =
            ronda;


        crearRonda();

    }

}


function terminarJuego() {

    preguntaElement.textContent =
        t(
            "colorsVisual.gameComplete",
            "🏆 ¡Juego terminado!"
        );


    mostrarMensaje(
        t(
            "colorsVisual.finalScore",
            "Conseguiste {points} puntos ⭐"
        ).replace(
            "{points}",
            puntos
        ),
        "green"
    );


    siguienteButton.style.display =
        "none";


    objetosElement.innerHTML =
        "";


    guardarProgreso(
        100,
        "completado"
    );


    setTimeout(
        function() {

            mostrarAlertaFinal();

        },
        700
    );

}


function reiniciarJuego() {

    puntos = 0;

    ronda = 1;

    objetoSeleccionado = null;

    objetosCorrectos = 0;


    puntosElement.textContent =
        puntos;


    rondaElement.textContent =
        ronda;


    crearRonda();

}


function mostrarAlertaFinal() {

    finishElement.classList.add(
        "show"
    );

}


function ocultarAlertaFinal() {

    finishElement.classList.remove(
        "show"
    );

}


botonFinal.addEventListener(
    "click",
    function() {

        window.location.href =
            "niveles.html";

    }
);


window.addEventListener(
    "thinkarooLanguageChanged",
    function() {
        crearRonda();

        if (!objetoSeleccionado) {

            preguntaElement.textContent =
                t(
                    "colorsVisual.selectObject",
                    "¡Selecciona un objeto!"
                );

        }

    }
);

guardarProgreso(
    0,
    "sin iniciar"
);


crearRonda();