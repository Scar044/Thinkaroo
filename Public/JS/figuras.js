const figuras = document.querySelectorAll(".figura");
const categorias = document.querySelectorAll(".categoria");
const puntosTexto = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");

const pista = document.getElementById("pista");
const textoPista = document.getElementById("textoPista");
const cerrarPista = document.getElementById("cerrarPista");

let puntos = 0;
let figurasCorrectas = 0;
let figuraActual = null;
let intentos = {};

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
                "niveles.html";

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

                    // Actividad 4 =
                    // Figuras Visual
                    id_actividad: 4,

                    progreso: progreso,

                    estado: estado

                })
            }
        );


        const datos =
            await respuesta.json();


        console.log(
            "PROGRESO FIGURAS VISUAL:",
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


figuras.forEach(function (figura) {


    figura.addEventListener(
        "dragstart",
        function () {

            figuraActual = this;

            this.classList.add(
                "arrastrando"
            );


            const forma =
                this.dataset.forma;


            if (!intentos[forma]) {

                intentos[forma] = 0;

            }

        }
    );


    figura.addEventListener(
        "dragend",
        function () {

            this.classList.remove(
                "arrastrando"
            );

        }
    );

});


categorias.forEach(function (categoria) {


    const zona =
        categoria.querySelector(".zona");


    zona.addEventListener(
        "dragover",
        function (evento) {

            evento.preventDefault();

            this.classList.add(
                "activa"
            );

        }
    );


    zona.addEventListener(
        "dragleave",
        function () {

            this.classList.remove(
                "activa"
            );

        }
    );


    zona.addEventListener(
        "drop",
        function (evento) {

            evento.preventDefault();

            this.classList.remove(
                "activa"
            );


            if (!figuraActual) {
                return;
            }


            const formaFigura =
                figuraActual.dataset.forma;


            const formaCategoria =
                categoria.dataset.forma;


            if (
                formaFigura ===
                formaCategoria
            ) {

                this.appendChild(
                    figuraActual
                );


                figuraActual.draggable =
                    false;


                figuraActual.style.cursor =
                    "default";


                figuraActual.classList.remove(
                    "arrastrando"
                );


                puntos += 10;

                figurasCorrectas++;


                puntosTexto.textContent =
                    puntos;


                mensaje.textContent =
                    translate(
                        "figuresVisual.correct"
                    );


                mensaje.style.color =
                    "#35a853";


                this.classList.add(
                    "correcto"
                );


                setTimeout(function () {

                    categoria
                        .querySelector(".zona")
                        .classList.remove(
                            "correcto"
                        );

                }, 600);


                const progreso =
                    Math.round(
                        (
                            figurasCorrectas /
                            figuras.length
                        ) * 100
                    );


                if (
                    figurasCorrectas <
                    figuras.length
                ) {

                    guardarProgreso(
                        progreso,
                        "en proceso"
                    );

                }


                if (
                    figurasCorrectas ===
                    figuras.length
                ) {


                    mensaje.textContent =
                        translate(
                            "figuresVisual.complete"
                        );


                    guardarProgreso(
                        100,
                        "completado"
                    ).then(function (resultado) {

                        if (resultado.success) {

                            console.log(
                                "Figuras Visual completado."
                            );

                        }

                    });


                    setTimeout(function () {

                        mostrarAlertaFinal();

                    }, 700);

                }

            }

            else {


                const forma =
                    figuraActual.dataset.forma;


                if (!intentos[forma]) {

                    intentos[forma] = 0;

                }


                intentos[forma]++;


                const pistas = {

                    circulo: [
                        "figuresVisual.hint.circle1",
                        "figuresVisual.hint.circle2",
                        "figuresVisual.hint.circle3"
                    ],

                    cuadrado: [
                        "figuresVisual.hint.square1",
                        "figuresVisual.hint.square2",
                        "figuresVisual.hint.square3"
                    ],

                    triangulo: [
                        "figuresVisual.hint.triangle1",
                        "figuresVisual.hint.triangle2",
                        "figuresVisual.hint.triangle3"
                    ],

                    rectangulo: [
                        "figuresVisual.hint.rectangle1",
                        "figuresVisual.hint.rectangle2",
                        "figuresVisual.hint.rectangle3"
                    ]

                };


                let numeroPista =
                    intentos[forma] - 1;


                if (
                    numeroPista >=
                    pistas[forma].length
                ) {

                    numeroPista =
                        pistas[forma].length - 1;

                }


                if (textoPista) {

                    textoPista.textContent =
                        translate(
                            pistas[forma][numeroPista]
                        );

                }


                if (pista) {

                    pista.classList.add(
                        "visible"
                    );

                }


                mensaje.textContent =
                    translate(
                        "figuresVisual.incorrect"
                    );


                mensaje.style.color =
                    "#f39c12";


                zona.classList.remove(
                    "error"
                );


                void zona.offsetWidth;


                zona.classList.add(
                    "error"
                );


                setTimeout(function () {

                    zona.classList.remove(
                        "error"
                    );

                }, 2000);

            }


            figuraActual = null;

        }
    );

});


if (cerrarPista) {

    cerrarPista.addEventListener(
        "click",
        function () {

            pista.classList.remove(
                "visible"
            );


            mensaje.textContent =
                translate(
                    "figuresVisual.tryAgain"
                );


            mensaje.style.color =
                "#1596e6";

        }
    );

}