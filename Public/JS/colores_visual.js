// =====================================
// GUARDAR PROGRESO
// =====================================

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
        console.error("Error al guardar progreso:", error);
    });

}


// =====================================
// VARIABLES DEL JUEGO
// =====================================

let puntos = 0;
let ronda = 1;
let objetoSeleccionado = null;
let objetosCorrectos = 0;

const TOTAL_RONDAS = 5;


// =====================================
// OBJETOS DEL JUEGO
// =====================================

const objetos = [

    {
        nombre: "manzana",
        emoji: "🍎",
        color: "rojo"
    },

    {
        nombre: "baya",
        emoji: "🫐",
        color: "azul"
    },

    {
        nombre: "limón",
        emoji: "🍋",
        color: "amarillo"
    },

    {
        nombre: "manzana verde",
        emoji: "🍏",
        color: "verde"
    }

];


// =====================================
// CREAR RONDA
// =====================================

function crearRonda() {

    objetoSeleccionado = null;
    objetosCorrectos = 0;

    document.getElementById("mensaje").textContent = "";

    document.getElementById("siguiente").style.display = "none";

    const contenedor =
        document.getElementById("objetos");

    contenedor.innerHTML = "";

    let objetosMezclados = [...objetos];

    objetosMezclados.sort(
        () => Math.random() - 0.5
    );


    objetosMezclados.forEach(function(item, indice) {

        const boton =
            document.createElement("button");

        boton.classList.add("objeto");

        boton.classList.add(item.color);

        boton.textContent = item.emoji;

        boton.dataset.color = item.color;

        boton.dataset.id = indice;

        boton.setAttribute(
            "aria-label",
            item.nombre
        );

        boton.addEventListener(
            "click",
            function() {

                seleccionarObjeto(boton);

            }
        );


        contenedor.appendChild(boton);

    });

    activarCajas();

}


// =====================================
// SELECCIONAR OBJETO
// =====================================

function seleccionarObjeto(boton) {

    document
        .querySelectorAll(".objeto")
        .forEach(function(objeto) {

            objeto.classList.remove(
                "seleccionado"
            );

        });


    boton.classList.add("seleccionado");

    objetoSeleccionado = boton;


    const color =
        boton.dataset.color;


    document.getElementById("pregunta").textContent =

        translate(
            "colorsVisual.selectBox",
            "Ahora toca la caja {color} 👆"
        )

        .replace(
            "{color}",
            color.toUpperCase()
        );


    document.getElementById("mensaje").textContent = "";

}


// =====================================
// ACTIVAR CAJAS
// =====================================

function activarCajas() {

    const cajas =
        document.querySelectorAll(".caja");


    cajas.forEach(function(caja) {

        caja.onclick = function() {

            comprobarCaja(caja);

        };

    });

}


// =====================================
// COMPROBAR CAJA
// =====================================

function comprobarCaja(caja) {

    if (objetoSeleccionado === null) {

        mostrarMensaje(

            translate(
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


        document.getElementById("puntos").textContent =
            puntos;


        mostrarMensaje(

            translate(
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


        objetoSeleccionado = null;


        document.getElementById("pregunta").textContent =

            translate(
                "colorsVisual.findAnother",
                "¡Busca otro objeto! 😊"
            );


        if (objetosCorrectos === objetos.length) {

            terminarRonda();

        }

    }

    else {

        mostrarMensaje(

            translate(
                "colorsVisual.wrong",
                "😊 Ese no es su color. ¡Inténtalo otra vez!"
            ),

            "orange"

        );

    }

}


// =====================================
// MOSTRAR MENSAJE
// =====================================

function mostrarMensaje(texto, color) {

    const mensaje =
        document.getElementById("mensaje");


    mensaje.textContent = texto;

    mensaje.style.color = color;

}


// =====================================
// TERMINAR RONDA
// =====================================

function terminarRonda() {

    document.getElementById("pregunta").textContent =

        translate(
            "colorsVisual.roundComplete",
            "🎉 ¡Completaste la ronda!"
        );


    mostrarMensaje(

        translate(
            "colorsVisual.excellent",
            "¡Excelente trabajo! ⭐"
        ),

        "green"

    );


    const progreso =
        Math.round(
            (ronda / TOTAL_RONDAS) * 100
        );


    if (ronda < TOTAL_RONDAS) {

        guardarProgreso(
            progreso,
            "en proceso"
        );


        document.getElementById("siguiente").style.display =
            "block";

    }

    else {

        terminarJuego();

    }

}


// =====================================
// SIGUIENTE RONDA
// =====================================

function siguienteRonda() {

    if (ronda < TOTAL_RONDAS) {

        ronda++;


        document.getElementById("ronda").textContent =
            ronda;


        crearRonda();

    }

}


// =====================================
// BOTÓN SIGUIENTE
// =====================================

document.getElementById("siguiente").addEventListener(
    "click",
    siguienteRonda
);


// =====================================
// TERMINAR JUEGO
// =====================================

function terminarJuego() {

    document.getElementById("pregunta").textContent =

        translate(
            "colorsVisual.gameComplete",
            "🏆 ¡Juego terminado!"
        );


    mostrarMensaje(

        translate(
            "colorsVisual.finalScore",
            "Conseguiste {points} puntos ⭐"
        )

        .replace(
            "{points}",
            puntos
        ),

        "green"

    );


    document.getElementById("siguiente").style.display =
        "none";


    const reiniciar =
        document.getElementById("reiniciar");


    if (reiniciar) {

        reiniciar.style.display =
            "none";

    }


    document.getElementById("objetos").innerHTML =
        "";


    guardarProgreso(
        100,
        "completado"
    );


    setTimeout(function() {

        mostrarAlertaFinal();

    }, 700);

}


// =====================================
// REINICIAR JUEGO
// =====================================

function reiniciarJuego() {

    puntos = 0;

    ronda = 1;

    objetoSeleccionado = null;

    objetosCorrectos = 0;


    document.getElementById("puntos").textContent =
        puntos;


    document.getElementById("ronda").textContent =
        ronda;


    const reiniciar =
        document.getElementById("reiniciar");


    if (reiniciar) {

        reiniciar.style.display =
            "none";

    }


    crearRonda();

}



guardarProgreso(
    0,
    "sin iniciar"
);


crearRonda();


const alertaFinal =
    document.getElementById("finish");


const botonFinal =
    document.getElementById("botonFinal");


function mostrarAlertaFinal() {

    alertaFinal.classList.add("show");

}


function ocultarAlertaFinal() {

    alertaFinal.classList.remove("show");

}


botonFinal.addEventListener(
    "click",
    function() {

        window.location.href =
            "niveles.html";

    }
);