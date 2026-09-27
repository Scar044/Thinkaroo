// ============================================
// ELEMENTOS DEL JUEGO
// ============================================

const figuras = document.querySelectorAll(".figura");
const categorias = document.querySelectorAll(".categoria");
const puntosTexto = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");

const pista = document.getElementById("pista");
const textoPista = document.getElementById("textoPista");
const cerrarPista = document.getElementById("cerrarPista");


// ============================================
// VARIABLES
// ============================================

let puntos = 0;
let figurasCorrectas = 0;
let figuraActual = null;
let intentos = {};


// ============================================
// ALERTA FINAL
// ============================================

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


// ============================================
// GUARDAR PROGRESO
// ============================================

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


// ============================================
// PROGRESO INICIAL
// ============================================

guardarProgreso(
    0,
    "sin iniciar"
);


// ============================================
// ARRASTRAR FIGURAS
// ============================================

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


// ============================================
// CATEGORÍAS
// ============================================

categorias.forEach(function (categoria) {


    const zona =
        categoria.querySelector(".zona");


    // ========================================
    // DRAGOVER
    // ========================================

    zona.addEventListener(
        "dragover",
        function (evento) {

            evento.preventDefault();

            this.classList.add(
                "activa"
            );

        }
    );


    // ========================================
    // DRAGLEAVE
    // ========================================

    zona.addEventListener(
        "dragleave",
        function () {

            this.classList.remove(
                "activa"
            );

        }
    );


    // ========================================
    // DROP
    // ========================================

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


            // ====================================
            // RESPUESTA CORRECTA
            // ====================================

            if (
                formaFigura ===
                formaCategoria
            ) {


                // Colocar figura

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


                // ==================================
                // PUNTOS
                // ==================================

                puntos += 10;

                figurasCorrectas++;


                puntosTexto.textContent =
                    puntos;


                // ==================================
                // MENSAJE
                // ==================================

                mensaje.textContent =
                    "🎉 ¡Muy bien!";

                mensaje.style.color =
                    "#35a853";


                // ==================================
                // ANIMACIÓN CORRECTA
                // ==================================

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


                // ==================================
                // CALCULAR PROGRESO
                // ==================================

                const progreso =
                    Math.round(
                        (
                            figurasCorrectas /
                            figuras.length
                        ) * 100
                    );


                // ==================================
                // GUARDAR EN PROCESO
                // ==================================

                if (
                    figurasCorrectas <
                    figuras.length
                ) {

                    guardarProgreso(
                        progreso,
                        "en proceso"
                    );

                }


                // ==================================
                // TERMINÓ EL JUEGO
                // ==================================

                if (
                    figurasCorrectas ===
                    figuras.length
                ) {


                    mensaje.textContent =
                        "🎉 ¡Excelente! Completaste el juego";


                    // Guardar 100% completado

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


                    // Mostrar alerta final

                    setTimeout(function () {

                        mostrarAlertaFinal();

                    }, 700);

                }

            }


            // ====================================
            // RESPUESTA INCORRECTA
            // ====================================

            else {


                const forma =
                    figuraActual.dataset.forma;


                if (!intentos[forma]) {

                    intentos[forma] = 0;

                }


                intentos[forma]++;


                // ==================================
                // PISTAS
                // ==================================

                const pistas = {

                    circulo: [

                        "Mira con atención. El círculo no tiene esquinas.",

                        "Observa su borde. Es completamente redondo.",

                        "Busca la figura que parece una pelota."

                    ],


                    cuadrado: [

                        "Mira sus lados. Tiene 4 lados.",

                        "Sus 4 lados tienen el mismo tamaño.",

                        "Busca la figura que tiene 4 lados iguales."

                    ],


                    triangulo: [

                        "Mira sus esquinas. Tiene 3.",

                        "Cuenta sus lados. Tiene 3.",

                        "Busca la figura que tiene forma de montaña."

                    ],


                    rectangulo: [

                        "Mira sus lados. Tiene 4.",

                        "Tiene 2 lados largos y 2 lados cortos.",

                        "Busca la figura que parece una puerta."

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
                        pistas[forma][numeroPista];

                }


                if (pista) {

                    pista.classList.add(
                        "visible"
                    );

                }


                // ==================================
                // MENSAJE
                // ==================================

                mensaje.textContent =
                    "😊 ¡Casi!";


                mensaje.style.color =
                    "#f39c12";


                // ==================================
                // ANIMACIÓN DE ERROR
                // ==================================

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


// ============================================
// CERRAR PISTA
// ============================================

if (cerrarPista) {

    cerrarPista.addEventListener(
        "click",
        function () {

            pista.classList.remove(
                "visible"
            );


            mensaje.textContent =
                "¡Inténtalo de nuevo!";


            mensaje.style.color =
                "#1596e6";

        }
    );

}