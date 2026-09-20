document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const opciones =
        document.getElementById("opciones");

    const botonEscuchar =
        document.getElementById("botonEscuchar");

    const puntosTexto =
        document.getElementById("puntos");

    const rondaTexto =
        document.getElementById("ronda");

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

    let ronda = 1;

    let colorCorrecto = "";

    let juegoActivo = false;

    const totalRondas = 5;


    // ==========================================
    // COLORES
    // ==========================================

    const colores = [

        "rojo",
        "azul",
        "amarillo",
        "verde",
        "morado"

    ];


    // ==========================================
    // NOMBRES
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


        if (!("speechSynthesis" in window)) {

            alert(
                "Tu navegador no permite utilizar voz."
            );

            return;

        }


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
    // CREAR LOS COLORES
    // ==========================================

    function crearColores() {


        opciones.innerHTML = "";


        colores.forEach(function (color) {


            const boton =
                document.createElement("button");


            boton.type = "button";


            boton.className =
                "color " + color;


            boton.dataset.color =
                color;


            opciones.appendChild(boton);


            // Evento del botón

            boton.addEventListener(
                "click",
                seleccionarColor
            );

        });

    }


    // ==========================================
    // NUEVA RONDA
    // ==========================================

    function nuevaRonda() {


        juegoActivo = true;


        // Elegir color al azar

        const numero =
            Math.floor(
                Math.random() *
                colores.length
            );


        colorCorrecto =
            colores[numero];


        // Actualizar ronda

        rondaTexto.textContent =
            ronda;


        // Limpiar mensaje

        mensaje.textContent = "";

        mensaje.className =
            "mensaje";


        // Crear botones

        crearColores();


        // Ocultar siguiente

        siguiente.style.display =
            "none";


        // Texto

        instruccion.textContent =
            "Escucha con atención";


        // Hablar

        setTimeout(function () {

            hablar(
                nombres[colorCorrecto]
            );

        }, 300);

    }


    // ==========================================
    // ESCUCHAR COLOR
    // ==========================================

    botonEscuchar.addEventListener(
        "click",
        function () {


            hablar(
                nombres[colorCorrecto]
            );

        }
    );


    // ==========================================
    // SELECCIONAR COLOR
    // ==========================================

    function seleccionarColor(event) {


        if (!juegoActivo) {

            return;

        }


        const boton =
            event.currentTarget;


        const seleccionado =
            boton.dataset.color;


        // ======================================
        // CORRECTO
        // ======================================

        if (
            seleccionado ===
            colorCorrecto
        ) {


            puntos += 10;


            puntosTexto.textContent =
                puntos;


            boton.classList.add(
                "correcta"
            );


            mensaje.textContent =
                "🎉 ¡Muy bien!";


            mensaje.className =
                "mensaje correcto";


            hablar(
                "¡Muy bien!"
            );


            juegoActivo = false;


            // Desactivar botones

            const botones =
                document.querySelectorAll(".color");


            botones.forEach(function (b) {

                b.disabled = true;

            });


            // ¿Quedan rondas?

            if (ronda < totalRondas) {


                siguiente.style.display =
                    "block";


            } else {


                terminarJuego();

            }


        }


        // ======================================
        // INCORRECTO
        // ======================================

        else {


            boton.classList.add(
                "incorrecta"
            );


            mensaje.textContent =
                "😊 Inténtalo otra vez";


            mensaje.className =
                "mensaje error";


            hablar(
                "Inténtalo otra vez"
            );


            setTimeout(function () {

                boton.classList.remove(
                    "incorrecta"
                );

            }, 500);

        }

    }


    // ==========================================
    // SIGUIENTE
    // ==========================================

    siguiente.addEventListener(
        "click",
        function () {


            ronda++;


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
            "🎉 ¡Completaste todas las rondas!";


        mensaje.textContent =
            "🎉 Conseguiste " +
            puntos +
            " puntos";


        mensaje.className =
            "mensaje correcto";


        hablar(
            "Juego terminado. Conseguiste " +
            puntos +
            " puntos"
        );

    }


    // ==========================================
    // INICIAR
    // ==========================================

    nuevaRonda();

});