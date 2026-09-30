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

const alertaFinal =
    document.getElementById("finish");

const botonFinal =
    document.getElementById("botonFinal");


function mostrarAlertaFinal() {

    if (alertaFinal) {
        alertaFinal.classList.add("show");
    }

}


if (botonFinal) {

    botonFinal.addEventListener(
        "click",
        function () {

            window.location.href =
                "niveles_auditivo.html";

        }
    );

}

async function guardarProgreso(progreso, estado) {

    try {

        const respuesta = await fetch(
            "../ConfigPHP/guardar_progreso.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    id_actividad: 5,
                    progreso: progreso,
                    estado: estado

                })
            }
        );

        const datos = await respuesta.json();

        console.log(
            "PROGRESO FIGURAS AUDITIVO:",
            datos
        );

        return datos;

    } catch (error) {

        console.error(
            "Error al guardar progreso:",
            error
        );

        return {
            success: false
        };

    }

}

guardarProgreso(0, "sin iniciar");

let puntos = 0;

let figuraCorrecta = null;

let juegoActivo = false;

let intentos = {};

let figurasCorrectas = 0;

const metaFiguras = 8;

const formas = [

    "circulo",
    "cuadrado",
    "triangulo",
    "rectangulo"

];

const nombres = {

    circulo: "círculo",

    cuadrado: "cuadrado",

    triangulo: "triángulo",

    rectangulo: "rectángulo"

};

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

function hablar(texto) {

    window.speechSynthesis.cancel();

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.8;

    voz.pitch = 1.1;

    window.speechSynthesis.speak(voz);

}

function nuevaRonda() {

    const numero =
        Math.floor(
            Math.random() * formas.length
        );

    figuraCorrecta =
        formas[numero];

    juegoActivo = true;

    figuras.forEach(function (figura) {

        figura.classList.remove("seleccionada");
        figura.classList.remove("correcta");
        figura.classList.remove("incorrecta");

    });

    mensaje.textContent = "";
    mensaje.className = "mensaje";

    if (!intentos[figuraCorrecta]) {

        intentos[figuraCorrecta] = 0;

    }

    instruccion.textContent =
        "Presiona ESCUCHAR para oír la figura.";
}

botonEscuchar.addEventListener(
    "click",
    function () {

        if (!figuraCorrecta) {

            nuevaRonda();

        }

        hablar(
            "Busca el " +
            nombres[figuraCorrecta]
        );


        instruccion.textContent =
            "Escucha y busca la figura correcta.";

    }
);

figuras.forEach(function (figura) {

    figura.addEventListener(
        "click",
        function () {

            if (!juegoActivo) {

                return;

            }


            const formaSeleccionada =
                this.dataset.forma;

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


                figurasCorrectas++;

                const progreso =
                    Math.round(
                        (figurasCorrectas / metaFiguras) * 100
                    );


                if (
                    figurasCorrectas <
                    metaFiguras
                ) {

                    guardarProgreso(
                        progreso,
                        "en proceso"
                    );

                }


                mensaje.textContent =
                    "🎉 ¡Muy bien!";


                mensaje.className =
                    "mensaje correcto";


                hablar(
                    "¡Muy bien!"
                );


                juegoActivo = false;

                if (
                    figurasCorrectas >=
                    metaFiguras
                ) {

                    mensaje.textContent =
                        "🎉 ¡Excelente! Completaste el juego";


                    hablar(
                        "¡Excelente! Completaste el juego"
                    );

                    setTimeout(async function () {

                        const resultado =
                            await guardarProgreso(
                                100,
                                "completado"
                            );


                        if (resultado.success) {

                            console.log(
                                "Figuras Auditivo completado."
                            );

                        }


                        mostrarAlertaFinal();

                    }, 700);


                    return;

                }

                setTimeout(function () {

                    nuevaRonda();

                }, 1800);


            }

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




nuevaRonda();