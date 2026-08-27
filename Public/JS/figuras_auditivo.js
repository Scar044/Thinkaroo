document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const figuras = document.querySelectorAll(".figura");

    const botonEscuchar =
        document.getElementById("botonEscuchar");

    const puntosTexto =
        document.getElementById("puntos");

    const mensaje =
        document.getElementById("mensaje");

    const pista =
        document.getElementById("pista");

    const textoPista =
        document.getElementById("textoPista");

    const cerrarPista =
        document.getElementById("cerrarPista");

    const instruccion =
        document.getElementById("instruccion");


    // ==========================================
    // VARIABLES
    // ==========================================

    let puntos = 0;

    let figuraCorrecta = null;

    let juegoActivo = false;

    let intentos = {};


    // ==========================================
    // FIGURAS DISPONIBLES
    // ==========================================

    const formas = [
        "circulo",
        "cuadrado",
        "triangulo",
        "rectangulo"
    ];


    // ==========================================
    // NOMBRES
    // ==========================================

    const nombres = {

        circulo: "círculo",

        cuadrado: "cuadrado",

        triangulo: "triángulo",

        rectangulo: "rectángulo"

    };


    // ==========================================
    // PISTAS
    // ==========================================

    const pistas = {

        circulo: [
            "No tiene esquinas.",
            "Es completamente redondo.",
            "Piensa en una pelota."
        ],

        cuadrado: [
            "Tiene cuatro lados.",
            "Sus cuatro lados son iguales.",
            "Piensa en una ventana."
        ],

        triangulo: [
            "Tiene tres lados.",
            "Tiene tres esquinas.",
            "Piensa en una montaña."
        ],

        rectangulo: [
            "Tiene cuatro lados.",
            "Tiene dos lados largos y dos cortos.",
            "Piensa en una puerta."
        ]

    };


    // ==========================================
    // HABLAR
    // ==========================================

    function hablar(texto) {

        // Cancelar cualquier voz anterior

        window.speechSynthesis.cancel();


        const voz =
            new SpeechSynthesisUtterance(texto);


        voz.lang = "es-ES";

        voz.rate = 0.8;

        voz.pitch = 1.1;


        window.speechSynthesis.speak(voz);

    }


    // ==========================================
    // ELEGIR FIGURA
    // ==========================================

    function nuevaRonda() {

        // Elegir una figura al azar

        const numero =
            Math.floor(
                Math.random() * formas.length
            );


        figuraCorrecta =
            formas[numero];


        juegoActivo = true;


        // Limpiar selección anterior

        figuras.forEach(function (figura) {

            figura.classList.remove("seleccionada");

            figura.classList.remove("correcta");

            figura.classList.remove("incorrecta");

        });


        mensaje.textContent = "";


        // Reiniciar intento de esta figura

        if (!intentos[figuraCorrecta]) {

            intentos[figuraCorrecta] = 0;

        }


        instruccion.textContent =
            "Escucha y busca la figura correcta.";


        // Decir la figura

        hablar(
            "Busca el " +
            nombres[figuraCorrecta]
        );

    }


    // ==========================================
    // BOTÓN ESCUCHAR
    // ==========================================

    botonEscuchar.addEventListener(
        "click",
        function () {

            if (!figuraCorrecta) {

                nuevaRonda();

                return;

            }


            hablar(
                "Busca el " +
                nombres[figuraCorrecta]
            );

        }
    );


    // ==========================================
    // SELECCIONAR FIGURA
    // ==========================================

    figuras.forEach(function (figura) {

        figura.addEventListener(
            "click",
            function () {

                if (!juegoActivo) {

                    return;

                }


                const formaSeleccionada =
                    this.dataset.forma;


                // ==================================
                // RESPUESTA CORRECTA
                // ==================================

                if (
                    formaSeleccionada ===
                    figuraCorrecta
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


                    hablar(
                        "¡Muy bien!"
                    );


                    juegoActivo = false;


                    setTimeout(function () {

                        nuevaRonda();

                    }, 1800);


                }

                // ==================================
                // RESPUESTA INCORRECTA
                // ==================================

                else {

                    this.classList.add(
                        "incorrecta"
                    );


                    intentos[figuraCorrecta]++;


                    mensaje.textContent =
                        "😊 ¡Casi! Escucha otra vez.";


                    mensaje.className =
                        "mensaje error";


                    mostrarPista();


                    hablar(
                        "Casi. Escucha otra vez."
                    );


                    setTimeout(function () {

                        figura.classList.remove(
                            "incorrecta"
                        );

                    }, 700);

                }

            }
        );

    });


    // ==========================================
    // MOSTRAR PISTA
    // ==========================================

    function mostrarPista() {

        const numero =
            intentos[figuraCorrecta] - 1;


        let indice = numero;


        if (
            indice >=
            pistas[figuraCorrecta].length
        ) {

            indice =
                pistas[figuraCorrecta].length - 1;

        }


        textoPista.textContent =
            pistas[figuraCorrecta][indice];


        pista.classList.add("visible");

    }


    // ==========================================
    // CERRAR PISTA
    // ==========================================

    cerrarPista.addEventListener(
        "click",
        function () {

            pista.classList.remove(
                "visible"
            );


            hablar(
                "Escucha nuevamente."
            );

        }
    );


    // ==========================================
    // COMENZAR JUEGO
    // ==========================================

    nuevaRonda();

});