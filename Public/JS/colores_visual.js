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


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let puntos = 0;
let ronda = 1;
let objetoSeleccionado = null;
let objetosCorrectos = 0;

const TOTAL_RONDAS = 5;


// ==========================================
// OBJETOS
// ==========================================

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


// ==========================================
// CREAR UNA RONDA
// ==========================================

function crearRonda() {

    objetoSeleccionado = null;
    objetosCorrectos = 0;

    document.getElementById("mensaje").textContent = "";

    document.getElementById("siguiente").style.display = "none";

    const contenedor =
        document.getElementById("objetos");

    contenedor.innerHTML = "";


    // Mezclar objetos

    let objetosMezclados = [...objetos];

    objetosMezclados.sort(
        () => Math.random() - 0.5
    );


    // Crear cada objeto

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


        // Seleccionar objeto

        boton.addEventListener(
            "click",
            function() {

                seleccionarObjeto(boton);

            }
        );


        contenedor.appendChild(boton);

    });


    // Activar cajas

    activarCajas();

}


// ==========================================
// SELECCIONAR OBJETO
// ==========================================

function seleccionarObjeto(boton) {

    // Quitar selección anterior

    document
        .querySelectorAll(".objeto")
        .forEach(function(objeto) {

            objeto.classList.remove(
                "seleccionado"
            );

        });


    // Seleccionar nuevo objeto

    boton.classList.add("seleccionado");

    objetoSeleccionado = boton;


    const color =
        boton.dataset.color;


    document.getElementById("pregunta").textContent =
        "Ahora toca la caja " +
        color.toUpperCase() +
        " 👆";


    document.getElementById("mensaje").textContent = "";

}


// ==========================================
// ACTIVAR CAJAS
// ==========================================

function activarCajas() {

    const cajas =
        document.querySelectorAll(".caja");


    cajas.forEach(function(caja) {

        caja.onclick = function() {

            comprobarCaja(caja);

        };

    });

}


// ==========================================
// COMPROBAR CAJA
// ==========================================

function comprobarCaja(caja) {

    // Si no hay objeto seleccionado

    if (objetoSeleccionado === null) {

        mostrarMensaje(
            "👆 Primero selecciona un objeto.",
            "orange"
        );

        return;
    }


    const colorObjeto =
        objetoSeleccionado.dataset.color;


    const colorCaja =
        caja.dataset.color;


    // ======================================
    // RESPUESTA CORRECTA
    // ======================================

    if (colorObjeto === colorCaja) {

        puntos += 10;

        objetosCorrectos++;


        document.getElementById("puntos").textContent =
            puntos;


        mostrarMensaje(
            "🎉 ¡Muy bien!",
            "green"
        );


        // Ocultar objeto

        objetoSeleccionado.style.visibility =
            "hidden";


        objetoSeleccionado.classList.remove(
            "seleccionado"
        );


        objetoSeleccionado = null;


        document.getElementById("pregunta").textContent =
            "¡Busca otro objeto! 😊";


        // Comprobar si terminó la ronda

        if (objetosCorrectos === objetos.length) {

            terminarRonda();

        }

    }


    // ======================================
    // RESPUESTA INCORRECTA
    // ======================================

    else {

        mostrarMensaje(
            "😊 Ese no es su color. ¡Inténtalo otra vez!",
            "orange"
        );

    }

}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

function mostrarMensaje(texto, color) {

    const mensaje =
        document.getElementById("mensaje");


    mensaje.textContent = texto;

    mensaje.style.color = color;

}


// ==========================================
// TERMINAR RONDA
// ==========================================

function terminarRonda() {

    document.getElementById("pregunta").textContent =
        "🎉 ¡Completaste la ronda!";


    mostrarMensaje(
        "¡Excelente trabajo! ⭐",
        "green"
    );


    // ======================================
    // CALCULAR PROGRESO
    // ======================================

    const progreso =
        Math.round((ronda / TOTAL_RONDAS) * 100);


    // ======================================
    // RONDAS 1 - 4
    // ======================================

    if (ronda < TOTAL_RONDAS) {

        guardarProgreso(
            progreso,
            "en proceso"
        );


        document.getElementById("siguiente").style.display =
            "block";

    }


    // ======================================
    // RONDA 5 - JUEGO COMPLETADO
    // ======================================

    else {

        terminarJuego();

    }

}


// ==========================================
// SIGUIENTE RONDA
// ==========================================

function siguienteRonda() {

    if (ronda < TOTAL_RONDAS) {

        ronda++;


        document.getElementById("ronda").textContent =
            ronda;


        crearRonda();

    }

}


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    document.getElementById("pregunta").textContent =
        "🏆 ¡Juego terminado!";


    mostrarMensaje(
        "Conseguiste " + puntos + " puntos ⭐",
        "green"
    );


    document.getElementById("siguiente").style.display =
        "none";


    // Ocultar reiniciar si existe

    const reiniciar =
        document.getElementById("reiniciar");


    if (reiniciar) {

        reiniciar.style.display =
            "none";

    }


    document.getElementById("objetos").innerHTML =
        "";


    // ======================================
    // GUARDAR 100% COMPLETADO
    // ======================================

    guardarProgreso(
        100,
        "completado"
    );


    // Mostrar alerta final

    setTimeout(function() {

        mostrarAlertaFinal();

    }, 700);

}


// ==========================================
// REINICIAR JUEGO
// ==========================================

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


// ==========================================
// INICIAR JUEGO
// ==========================================

guardarProgreso(
    0,
    "sin iniciar"
);


crearRonda();


// ========================================
// PANTALLA FINAL
// ========================================

const alertaFinal =
    document.getElementById("finish");


const botonFinal =
    document.getElementById("botonFinal");


// ========================================
// MOSTRAR ALERTA
// ========================================

function mostrarAlertaFinal() {

    alertaFinal.classList.add("show");

}


// ========================================
// OCULTAR ALERTA
// ========================================

function ocultarAlertaFinal() {

    alertaFinal.classList.remove("show");

}


// ========================================
// BOTÓN FINAL
// ========================================

botonFinal.addEventListener(
    "click",
    function() {

        window.location.href =
            "niveles.html";

    }
);