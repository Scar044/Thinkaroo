function guardarProgreso(progreso, estado) {

    console.log("Progreso:", progreso + "%", "-", estado);

}

const alertaFinal =
    document.getElementById("finish");

const botonFinal =
    document.getElementById("botonFinal");


if (botonFinal) {

    botonFinal.addEventListener("click", function () {

        window.location.href =
            "niveles_kinestesico.html";

    });

}


const objetos = [
    "🚗",
    "🧸",
    "🍌",
    "🍎",
    "🐶",
    "🦖",
    "🎈",
    "⚽",
    "🚀",
    "🍓"
];


const grupos = [
    ["🚗", "🏎️", "🚙", "🚌"],
    ["🦖", "🦕"],
    ["🍎", "🍌", "🍓", "🍊"],
    ["🐶", "🐱", "🦁", "🦊"],
    ["🎈", "🚀", "⚽", "🧸"]
];


let ronda = 1;
let cantidad = 0;
let puntos = 0;
let objetosDentro = 0;
let objetoArrastrado = null;
let inicioX = 0;
let inicioY = 0;
let moviendo = false;


guardarProgreso(0, "sin iniciar");


function generarPregunta() {

    objetosDentro = 0;
    objetoArrastrado = null;
    moviendo = false;

    const contenedor =
        document.getElementById("objetos-container");

    const caja =
        document.getElementById("caja");

    const panel =
        document.getElementById("panel-opciones");

    const mensaje =
        document.getElementById("feedback-badge");

    if (!contenedor || !caja || !panel || !mensaje) {

        console.error(
            "Faltan elementos del HTML."
        );

        return;

    }

    contenedor.innerHTML = "";

    panel.classList.add("oculto");

    mensaje.className =
        "mensaje oculto";

    mensaje.innerText = "";

    caja.classList.remove("recibiendo");

    actualizarContador();

    let elementos = [];


    if (ronda <= 3) {

        cantidad =
            Math.floor(Math.random() * 3) + 2;

        const objeto =
            objetos[
                Math.floor(
                    Math.random() * objetos.length
                )
            ];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(objeto);

        }

    }


    else if (ronda <= 6) {

        cantidad =
            Math.floor(Math.random() * 4) + 4;

        const grupo =
            grupos[
                Math.floor(
                    Math.random() * grupos.length
                )
            ];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(
                grupo[
                    Math.floor(
                        Math.random() * grupo.length
                    )
                ]
            );

        }

    }


    else {

        cantidad =
            Math.floor(Math.random() * 4) + 6;

        const grupo =
            grupos[
                Math.floor(
                    Math.random() * grupos.length
                )
            ];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(
                grupo[
                    Math.floor(
                        Math.random() * grupo.length
                    )
                ]
            );

        }

    }

    mostrarObjetos(elementos);

}


function mostrarObjetos(elementos) {

    const contenedor =
        document.getElementById(
            "objetos-container"
        );

    elementos.forEach((elemento, indice) => {

        const objeto =
            document.createElement("div");

        objeto.className = "objeto";

        objeto.innerText = elemento;

        objeto.dataset.index = indice;

        objeto.style.animationDelay =
            `${indice * 0.08}s`;

        objeto.addEventListener(
            "mousedown",
            iniciarArrastre
        );

        objeto.addEventListener(
            "touchstart",
            iniciarArrastre,
            { passive: false }
        );

        contenedor.appendChild(objeto);

    });

}


function iniciarArrastre(evento) {

    evento.preventDefault();

    if (
        objetoArrastrado ||
        this.classList.contains("dentro")
    ) {

        return;

    }

    objetoArrastrado = this;

    moviendo = true;

    const posicion =
        obtenerPosicion(evento);

    inicioX =
        posicion.x -
        this.getBoundingClientRect().left;

    inicioY =
        posicion.y -
        this.getBoundingClientRect().top;

    const rect =
        this.getBoundingClientRect();

    this.style.width =
        `${rect.width}px`;

    this.style.height =
        `${rect.height}px`;

    this.style.left =
        `${rect.left}px`;

    this.style.top =
        `${rect.top}px`;

    this.classList.add("arrastrando");

    document.addEventListener(
        "mousemove",
        moverObjeto
    );

    document.addEventListener(
        "mouseup",
        terminarArrastre
    );

    document.addEventListener(
        "touchmove",
        moverObjeto,
        { passive: false }
    );

    document.addEventListener(
        "touchend",
        terminarArrastre
    );

}


function moverObjeto(evento) {

    if (
        !objetoArrastrado ||
        !moviendo
    ) {

        return;

    }

    evento.preventDefault();

    const posicion =
        obtenerPosicion(evento);

    objetoArrastrado.style.left =
        `${posicion.x - inicioX}px`;

    objetoArrastrado.style.top =
        `${posicion.y - inicioY}px`;

    comprobarCaja(
        posicion.x,
        posicion.y
    );

}


function comprobarCaja(x, y) {

    const caja =
        document.getElementById("caja");

    const rect =
        caja.getBoundingClientRect();

    const dentro =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

    if (dentro) {

        caja.classList.add("recibiendo");

    } else {

        caja.classList.remove("recibiendo");

    }

}


function terminarArrastre(evento) {

    if (!objetoArrastrado) {

        return;

    }

    const posicion =
        obtenerPosicion(evento);

    const caja =
        document.getElementById("caja");

    const rect =
        caja.getBoundingClientRect();

    const dentro =
        posicion.x >= rect.left &&
        posicion.x <= rect.right &&
        posicion.y >= rect.top &&
        posicion.y <= rect.bottom;

    if (dentro) {

        meterObjeto();

    } else {

        devolverObjeto();

    }

    document.removeEventListener(
        "mousemove",
        moverObjeto
    );

    document.removeEventListener(
        "mouseup",
        terminarArrastre
    );

    document.removeEventListener(
        "touchmove",
        moverObjeto
    );

    document.removeEventListener(
        "touchend",
        terminarArrastre
    );

}


function meterObjeto() {

    const objeto =
        objetoArrastrado;

    const caja =
        document.getElementById("caja");

    objeto.classList.remove(
        "arrastrando"
    );

    objeto.classList.add("dentro");

    objeto.style.position =
        "absolute";

    objeto.style.left =
        "50%";

    objeto.style.top =
        "50%";

    objeto.style.transform =
        "translate(-50%, -50%) scale(.5)";

    objeto.style.opacity =
        "0";

    caja.classList.add(
        "recibiendo"
    );

    objetosDentro++;

    actualizarContador();

    setTimeout(() => {

        if (objeto.parentElement) {

            objeto.remove();

        }

    }, 400);

    objetoArrastrado = null;

    moviendo = false;

    if (objetosDentro === cantidad) {

        setTimeout(
            mostrarOpciones,
            600
        );

    }

}


function devolverObjeto() {

    const objeto =
        objetoArrastrado;

    objeto.classList.remove(
        "arrastrando"
    );

    objeto.style.position = "";

    objeto.style.left = "";

    objeto.style.top = "";

    objeto.style.width = "";

    objeto.style.height = "";

    objetoArrastrado = null;

    moviendo = false;

    mostrarMensaje(
        translate("putObjects.feedback.hint"),
        "pista"
    );

    setTimeout(() => {

        const mensaje =
            document.getElementById(
                "feedback-badge"
            );

        mensaje.className =
            "mensaje oculto";

    }, 1800);

}


function mostrarOpciones() {

    const panel =
        document.getElementById(
            "panel-opciones"
        );

    const mensaje =
        document.getElementById(
            "feedback-badge"
        );

    panel.classList.remove("oculto");

    mensaje.innerText =
        translate(
            "putObjects.feedback.count"
        );

    mensaje.className =
        "mensaje listo";

    generarOpciones(cantidad);

    panel.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function generarOpciones(respuesta) {

    const contenedor =
        document.getElementById(
            "options-container"
        );

    contenedor.innerHTML = "";

    const opciones =
        new Set();

    opciones.add(respuesta);

    while (opciones.size < 4) {

        const cambio =
            Math.floor(Math.random() * 5) - 2;

        const numero =
            respuesta + cambio;

        if (
            numero >= 1 &&
            numero <= 10 &&
            numero !== respuesta
        ) {

            opciones.add(numero);

        }

    }

    const mezcladas =
        Array.from(opciones)
            .sort(
                () =>
                    Math.random() - 0.5
            );

    mezcladas.forEach(numero => {

        const boton =
            document.createElement("button");

        boton.innerText = numero;

        boton.addEventListener(
            "click",
            function () {

                comprobar(
                    numero,
                    boton
                );

            }
        );

        contenedor.appendChild(boton);

    });

}


function comprobar(numero, boton) {

    if (boton.disabled) {

        return;

    }

    const mensaje =
        document.getElementById(
            "feedback-badge"
        );

    if (numero === cantidad) {

        boton.classList.add("bien");

        boton.disabled = true;

        puntos++;

        document.getElementById(
            "score-text"
        ).innerText = puntos;

        mensaje.innerText =
            translate(
                "putObjects.feedback.correct"
            );

        mensaje.className =
            "mensaje correcto";

        const progreso =
            Math.round(
                (ronda / 9) * 100
            );

        if (ronda < 9) {

            guardarProgreso(
                progreso,
                "en proceso"
            );

        }

        ronda++;

        setTimeout(() => {

            if (ronda > 9) {

                guardarProgreso(
                    100,
                    "completado"
                );

                mostrarFinal();

            } else {

                generarPregunta();

            }

        }, 1400);

    }


    else {

        boton.classList.add("error");

        mensaje.innerText =
            translate(
                "putObjects.feedback.countHint"
            );

        mensaje.className =
            "mensaje pista";

        setTimeout(() => {

            boton.classList.remove(
                "error"
            );

        }, 500);

    }

}


function actualizarContador() {

    const contador =
        document.getElementById(
            "contador-caja"
        );

    contador.innerText =
        objetosDentro;

}


function mostrarMensaje(
    texto,
    clase
) {

    const mensaje =
        document.getElementById(
            "feedback-badge"
        );

    mensaje.innerText =
        texto;

    mensaje.className =
        "mensaje " + clase;

}


function obtenerPosicion(evento) {

    if (
        evento.clientX !== undefined
    ) {

        return {
            x: evento.clientX,
            y: evento.clientY
        };

    }

    if (
        evento.touches &&
        evento.touches.length > 0
    ) {

        return {
            x: evento.touches[0].clientX,
            y: evento.touches[0].clientY
        };

    }

    if (
        evento.changedTouches &&
        evento.changedTouches.length > 0
    ) {

        return {
            x: evento.changedTouches[0].clientX,
            y: evento.changedTouches[0].clientY
        };

    }

    return {
        x: 0,
        y: 0
    };

}


function mostrarFinal() {

    const finish =
        document.getElementById("finish");

    if (finish) {

        finish.classList.add("show");

        // Reapply translations to the final message
        applyTranslations(finish);

    } else {

        console.error(
            "No se encontró el elemento #finish"
        );

    }

}


function resetGame() {

    ronda = 1;

    cantidad = 0;

    puntos = 0;

    objetosDentro = 0;

    objetoArrastrado = null;

    moviendo = false;

    document.getElementById(
        "score-text"
    ).innerText = "0";

    if (alertaFinal) {

        alertaFinal.classList.remove(
            "show"
        );

    }

    generarPregunta();

}


window.addEventListener(
    "load",
    generarPregunta
);