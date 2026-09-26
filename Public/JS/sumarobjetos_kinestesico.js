
const alertaFinal =
    document.getElementById("finish");

const botonFinal =
    document.getElementById("botonFinal");



if (botonFinal) {

    botonFinal.addEventListener(
        "click",
        function () {

            window.location.href =
                "niveles.html";

        }
    );

}


// ==========================================
// OBJETOS
// ==========================================

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


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let ronda = 1;

let cantidad = 0;

let puntos = 0;

let objetosDentro = 0;

let objetoArrastrado = null;

let inicioX = 0;

let inicioY = 0;

let moviendo = false;


// ==========================================
// GENERAR PREGUNTA
// ==========================================

function generarPregunta() {

    objetosDentro = 0;

    objetoArrastrado = null;

    moviendo = false;


    const contenedor =
        document.getElementById(
            "objetos-container"
        );


    const caja =
        document.getElementById("caja");


    const panel =
        document.getElementById(
            "panel-opciones"
        );


    const mensaje =
        document.getElementById(
            "feedback-badge"
        );


    // Limpiar

    contenedor.innerHTML = "";

    panel.classList.add("oculto");

    mensaje.className =
        "mensaje oculto";

    mensaje.innerText = "";


    caja.classList.remove(
        "recibiendo"
    );


    actualizarContador();


    let elementos = [];


    // ======================================
    // RONDAS 1 - 3
    // 2 A 4 OBJETOS
    // ======================================

    if (ronda <= 3) {

        cantidad =
            Math.floor(
                Math.random() * 3
            ) + 2;


        const objeto =
            objetos[
                Math.floor(
                    Math.random() *
                    objetos.length
                )
            ];


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            elementos.push(
                objeto
            );

        }

    }


    // ======================================
    // RONDAS 4 - 6
    // 4 A 7 OBJETOS
    // ======================================

    else if (ronda <= 6) {

        cantidad =
            Math.floor(
                Math.random() * 4
            ) + 4;


        const grupo =
            grupos[
                Math.floor(
                    Math.random() *
                    grupos.length
                )
            ];


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            elementos.push(

                grupo[
                    Math.floor(
                        Math.random() *
                        grupo.length
                    )
                ]

            );

        }

    }


    // ======================================
    // RONDAS 7 - 9
    // 6 A 9 OBJETOS
    // ======================================

    else {

        cantidad =
            Math.floor(
                Math.random() * 4
            ) + 6;


        const grupo =
            grupos[
                Math.floor(
                    Math.random() *
                    grupos.length
                )
            ];


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            elementos.push(

                grupo[
                    Math.floor(
                        Math.random() *
                        grupo.length
                    )
                ]

            );

        }

    }


    mostrarObjetos(elementos);

}


// ==========================================
// MOSTRAR OBJETOS
// ==========================================

function mostrarObjetos(elementos) {

    const contenedor =
        document.getElementById(
            "objetos-container"
        );


    elementos.forEach(
        (elemento, indice) => {

            const objeto =
                document.createElement(
                    "div"
                );


            objeto.className =
                "objeto";


            objeto.innerText =
                elemento;


            objeto.dataset.index =
                indice;


            objeto.style.animationDelay =
                `${indice * 0.08}s`;


            // Eventos de mouse

            objeto.addEventListener(
                "mousedown",
                iniciarArrastre
            );


            // Eventos táctiles

            objeto.addEventListener(
                "touchstart",
                iniciarArrastre,
                {
                    passive: false
                }
            );


            contenedor.appendChild(
                objeto
            );

        }
    );

}


// ==========================================
// INICIAR ARRASTRE
// ==========================================

function iniciarArrastre(evento) {

    // Evitar comportamientos del navegador

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


    // Convertir a posición fija

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

    this.classList.add(
        "arrastrando"
    );


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
        {
            passive: false
        }
    );


    document.addEventListener(
        "touchend",
        terminarArrastre
    );

}


// ==========================================
// MOVER OBJETO
// ==========================================

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


// ==========================================
// COMPROBAR SI ESTÁ SOBRE LA CAJA
// ==========================================

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

        caja.classList.add(
            "recibiendo"
        );

    } else {

        caja.classList.remove(
            "recibiendo"
        );

    }

}


// ==========================================
// TERMINAR ARRASTRE
// ==========================================

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


    // ======================================
    // OBJETO ENTRÓ EN LA CAJA
    // ======================================

    if (dentro) {

        meterObjeto();

    }


    // ======================================
    // OBJETO NO ENTRÓ
    // ======================================

    else {

        devolverObjeto();

    }


    // Limpiar eventos

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


// ==========================================
// METER OBJETO EN LA CAJA
// ==========================================

function meterObjeto() {

    const objeto =
        objetoArrastrado;


    const caja =
        document.getElementById("caja");


    objeto.classList.remove(
        "arrastrando"
    );


    objeto.classList.add(
        "dentro"
    );


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


    // Eliminar después de la animación

    setTimeout(() => {

        if (objeto.parentElement) {

            objeto.remove();

        }

    }, 400);


    objetoArrastrado = null;

    moviendo = false;


    // ======================================
    // ¿YA METIÓ TODOS?
    // ======================================

    if (
        objetosDentro === cantidad
    ) {

        setTimeout(
            mostrarOpciones,
            600
        );

    }

}


// ==========================================
// DEVOLVER OBJETO
// ==========================================

function devolverObjeto() {

    const objeto =
        objetoArrastrado;


    objeto.classList.remove(
        "arrastrando"
    );


    objeto.style.position =
        "";

    objeto.style.left =
        "";

    objeto.style.top =
        "";

    objeto.style.width =
        "";

    objeto.style.height =
        "";


    objetoArrastrado = null;

    moviendo = false;


    mostrarMensaje(
        "¡Casi! Suelta el objeto dentro de la caja 📦",
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


// ==========================================
// MOSTRAR OPCIONES
// ==========================================

function mostrarOpciones() {

    const panel =
        document.getElementById(
            "panel-opciones"
        );


    const mensaje =
        document.getElementById(
            "feedback-badge"
        );


    panel.classList.remove(
        "oculto"
    );


    mensaje.innerText =
        "¡Muy bien! Ahora dime cuántos objetos metiste 🔢";


    mensaje.className =
        "mensaje listo";


    generarOpciones(cantidad);


    panel.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ==========================================
// GENERAR OPCIONES
// ==========================================

function generarOpciones(respuesta) {

    const contenedor =
        document.getElementById(
            "options-container"
        );


    contenedor.innerHTML = "";


    const opciones =
        new Set();


    opciones.add(respuesta);


    while (
        opciones.size < 4
    ) {

        const cambio =
            Math.floor(
                Math.random() * 5
            ) - 2;


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


    mezcladas.forEach(
        numero => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.innerText =
                numero;


            boton.addEventListener(
                "click",
                function () {

                    comprobar(
                        numero,
                        boton
                    );

                }
            );


            contenedor.appendChild(
                boton
            );

        }
    );

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobar(
    numero,
    boton
) {

    // Evitar doble respuesta

    if (boton.disabled) {

        return;

    }


    const mensaje =
        document.getElementById(
            "feedback-badge"
        );


    // ======================================
    // CORRECTO
    // ======================================

    if (
        numero === cantidad
    ) {

        boton.classList.add(
            "bien"
        );


        boton.disabled =
            true;


        puntos++;


        document.getElementById(
            "score-text"
        ).innerText =
            puntos;


        mensaje.innerText =
            "🎉 ¡MUY BIEN!";


        mensaje.className =
            "mensaje correcto";


        ronda++;


        // Esperar antes de siguiente ronda

        setTimeout(() => {

            if (
                ronda > 9
            ) {

                mostrarFinal();

            } else {

                generarPregunta();

            }

        }, 1400);

    }


    // ======================================
    // INCORRECTO
    // ======================================

    else {

        boton.classList.add(
            "error"
        );


        mensaje.innerText =
            "🤔 Cuenta los objetos que metiste en la caja";


        mensaje.className =
            "mensaje pista";


        // Animación

        setTimeout(() => {

            boton.classList.remove(
                "error"
            );

        }, 500);

    }

}


// ==========================================
// ACTUALIZAR CONTADOR
// ==========================================

function actualizarContador() {

    const contador =
        document.getElementById(
            "contador-caja"
        );


    contador.innerText =
        objetosDentro;

}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

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


// ==========================================
// OBTENER POSICIÓN
// ==========================================

function obtenerPosicion(evento) {

    // Mouse

    if (
        evento.clientX !== undefined
    ) {

        return {

            x: evento.clientX,

            y: evento.clientY

        };

    }


    // Touch

    if (
        evento.touches &&
        evento.touches.length > 0
    ) {

        return {

            x:
                evento.touches[0].clientX,

            y:
                evento.touches[0].clientY

        };

    }


    if (
        evento.changedTouches &&
        evento.changedTouches.length > 0
    ) {

        return {

            x:
                evento.changedTouches[0].clientX,

            y:
                evento.changedTouches[0].clientY

        };

    }


    return {

        x: 0,

        y: 0

    };

}


// ==========================================
// ALERTA FINAL
// ==========================================

function mostrarFinal() {

    if (!alertaFinal) {

        return;

    }


    alertaFinal.classList.add(
        "show"
    );

}


// ==========================================
// REINICIAR JUEGO
// ==========================================

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


    // Ocultar alerta

    if (alertaFinal) {

        alertaFinal.classList.remove(
            "show"
        );

    }


    generarPregunta();

}


// ==========================================
// INICIAR
// ==========================================

window.addEventListener(
    "load",
    generarPregunta
);

