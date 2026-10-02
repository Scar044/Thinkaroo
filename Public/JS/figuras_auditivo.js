const figuras =
    document.querySelectorAll(".figura");

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


async function guardarProgreso(
    progreso,
    estado
) {

    try {

        const respuesta =
            await fetch(
                "../ConfigPHP/guardar_progreso.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        id_actividad: 5,

                        progreso: progreso,

                        estado: estado

                    })
                }
            );


        const datos =
            await respuesta.json();


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


guardarProgreso(
    0,
    "sin iniciar"
);


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

    circulo: "figuresAuditory.circle",

    cuadrado: "figuresAuditory.square",

    triangulo: "figuresAuditory.triangle",

    rectangulo: "figuresAuditory.rectangle"

};


const pistas = {

    circulo: [

        "figuresAuditory.hint.circle1",
        "figuresAuditory.hint.circle2",
        "figuresAuditory.hint.circle3"

    ],

    cuadrado: [

        "figuresAuditory.hint.square1",
        "figuresAuditory.hint.square2",
        "figuresAuditory.hint.square3"

    ],

    triangulo: [

        "figuresAuditory.hint.triangle1",
        "figuresAuditory.hint.triangle2",
        "figuresAuditory.hint.triangle3"

    ],

    rectangulo: [

        "figuresAuditory.hint.rectangle1",
        "figuresAuditory.hint.rectangle2",
        "figuresAuditory.hint.rectangle3"

    ]

};


function hablar(texto) {

    window.speechSynthesis.cancel();


    const voz =
        new SpeechSynthesisUtterance(texto);


    if (
        getCurrentLanguage() === "en"
    ) {

        voz.lang = "en-US";

    } else {

        voz.lang = "es-ES";

    }


    voz.rate = 0.8;

    voz.pitch = 1.1;


    window.speechSynthesis.speak(
        voz
    );

}


function nuevaRonda() {

    const numero =
        Math.floor(
            Math.random() *
            formas.length
        );


    figuraCorrecta =
        formas[numero];


    juegoActivo = true;


    figuras.forEach(
        function (figura) {

            figura.classList.remove(
                "seleccionada"
            );

            figura.classList.remove(
                "correcta"
            );

            figura.classList.remove(
                "incorrecta"
            );

        }
    );


    mensaje.textContent = "";

    mensaje.className =
        "mensaje";


    if (
        !intentos[figuraCorrecta]
    ) {

        intentos[figuraCorrecta] = 0;

    }


    instruccion.textContent =
        translate(
            "figuresAuditory.listenInstruction"
        );

}


botonEscuchar.addEventListener(
    "click",
    function () {

        if (!figuraCorrecta) {

            nuevaRonda();

        }


        hablar(
            translate(
                "figuresAuditory.searchInstruction"
            ) +
            " " +
            translate(
                nombres[figuraCorrecta]
            )
        );


        instruccion.textContent =
            translate(
                "figuresAuditory.searchInstruction"
            );

    }
);


figuras.forEach(
    function (figura) {

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
                            (
                                figurasCorrectas /
                                metaFiguras
                            ) * 100
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
                        translate(
                            "figuresAuditory.correct"
                        );


                    mensaje.className =
                        "mensaje correcto";


                    hablar(
                        translate(
                            "figuresAuditory.correctVoice"
                        )
                    );


                    juegoActivo = false;


                    if (
                        figurasCorrectas >=
                        metaFiguras
                    ) {

                        mensaje.textContent =
                            translate(
                                "figuresAuditory.finishTitle"
                            );


                        hablar(
                            translate(
                                "figuresAuditory.finishTitle"
                            )
                        );


                        setTimeout(
                            async function () {

                                const resultado =
                                    await guardarProgreso(
                                        100,
                                        "completado"
                                    );


                                if (
                                    resultado.success
                                ) {

                                    console.log(
                                        "Figuras Auditivo completado."
                                    );

                                }


                                mostrarAlertaFinal();

                            },
                            700
                        );


                        return;

                    }


                    setTimeout(
                        function () {

                            nuevaRonda();

                        },
                        1800
                    );


                }

                else {

                    this.classList.add(
                        "incorrecta"
                    );


                    intentos[figuraCorrecta]++;


                    mensaje.textContent =
                        translate(
                            "figuresAuditory.incorrect"
                        );


                    mensaje.className =
                        "mensaje error";


                    mostrarPista();


                    hablar(
                        translate(
                            "figuresAuditory.incorrectVoice"
                        )
                    );


                    setTimeout(
                        function () {

                            figura.classList.remove(
                                "incorrecta"
                            );

                        },
                        700
                    );

                }

            }
        );

    }
);


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
        translate(
            pistas[figuraCorrecta][indice]
        );


    pista.classList.add(
        "visible"
    );

}


cerrarPista.addEventListener(
    "click",
    function () {

        pista.classList.remove(
            "visible"
        );


        hablar(
            translate(
                "figuresAuditory.hintAgain"
            )
        );

    }
);


nuevaRonda();