let puntos = 0;
let ronda = 1;

let colorCorrecto = "";

const colores = [
    "rojo",
    "azul",
    "amarillo",
    "verde",
    "morado"
];


// CREAR UNA RONDA

function crearRonda() {

    colorCorrecto =
        colores[Math.floor(Math.random() * colores.length)];z


    // Mostrar pregunta

    document.getElementById("pregunta").textContent =
        "¿Dónde está el " + colorCorrecto.toUpperCase() + "?";


    // Obtener contenedor

    let opciones =
        document.getElementById("opciones");


    // Limpiar opciones anteriores

    opciones.innerHTML = "";


    // Mezclar colores

    let coloresMezclados = [...colores];

    coloresMezclados.sort(() => Math.random() - 0.5);


    // Crear botones

    coloresMezclados.forEach(function(color) {

        let boton = document.createElement("button");

        boton.classList.add("color");
        boton.classList.add(color);

        boton.onclick = function() {

            comprobar(color);

        };

        opciones.appendChild(boton);

    });


    // Limpiar mensaje

    document.getElementById("mensaje").textContent = "";

    document.getElementById("siguiente").style.display = "none";
}


// COMPROBAR RESPUESTA

function comprobar(colorElegido) {

    let mensaje =
        document.getElementById("mensaje");


    if (colorElegido === colorCorrecto) {

        puntos = puntos + 10;

        document.getElementById("puntos").textContent =
            puntos;


        mensaje.textContent =
            "🎉 ¡Muy bien!";


        mensaje.style.color = "green";


        document.getElementById("siguiente").style.display =
            "block";


        // Desactivar botones

        let botones =
            document.querySelectorAll(".color");


        botones.forEach(function(boton) {

            boton.disabled = true;

        });


    } else {

        mensaje.textContent =
            "😊 Inténtalo otra vez";

        mensaje.style.color = "orange";

    }
}


// SIGUIENTE RONDA

function siguienteRonda() {

    if (ronda < 5) {

        ronda = ronda + 1;

        document.getElementById("ronda").textContent =
            ronda;

        crearRonda();

    } else {

        terminarJuego();

    }
}


// TERMINAR

function terminarJuego() {

    document.getElementById("opciones").innerHTML = "";

    document.getElementById("pregunta").textContent =
        "🎉 ¡Juego terminado!";

    document.getElementById("mensaje").textContent =
        "Conseguiste " + puntos + " puntos ⭐";

    document.getElementById("mensaje").style.color =
        "green";

    document.getElementById("siguiente").style.display =
        "none";
}


// INICIAR JUEGO

crearRonda();
