// ==========================================
// VARIABLES
// ==========================================

let puntos = 0;

let ronda = 1;

let objetoSeleccionado = null;

let objetosCorrectos = 0;


// ==========================================
// OBJETOS DISPONIBLES
// ==========================================

const objetos = [

    // ROJOS

    {
        nombre: "manzana",
        emoji: "🍎",
        color: "rojo"
    },

    {
        nombre: "fresa",
        emoji: "🍓",
        color: "rojo"
    },

    {
        nombre: "cereza",
        emoji: "🍒",
        color: "rojo"
    },

    {
        nombre: "corazón",
        emoji: "❤️",
        color: "rojo"
    },

    {
        nombre: "tomate",
        emoji: "🍅",
        color: "rojo"
    },


    // AZULES

    {
        nombre: "ballena",
        emoji: "🐳",
        color: "azul"
    },

    {
        nombre: "pez",
        emoji: "🐟",
        color: "azul"
    },

    {
        nombre: "gota de agua",
        emoji: "💧",
        color: "azul"
    },

    {
        nombre: "globo azul",
        emoji: "🎈",
        color: "azul"
    },

    {
        nombre: "carro azul",
        emoji: "🚙",
        color: "azul"
    },


    // AMARILLOS

    {
        nombre: "queso",
        emoji: "🧀",
        color: "amarillo"
    },

    {
        nombre: "plátano",
        emoji: "🍌",
        color: "amarillo"
    },

    {
        nombre: "sol",
        emoji: "☀️",
        color: "amarillo"
    },

    {
        nombre: "estrella",
        emoji: "⭐",
        color: "amarillo"
    },

    {
        nombre: "pollito",
        emoji: "🐥",
        color: "amarillo"
    },


    // VERDES

    {
        nombre: "brócoli",
        emoji: "🥦",
        color: "verde"
    },

    {
        nombre: "manzana verde",
        emoji: "🍏",
        color: "verde"
    },

    {
        nombre: "rana",
        emoji: "🐸",
        color: "verde"
    },

    {
        nombre: "árbol",
        emoji: "🌳",
        color: "verde"
    },

    {
        nombre: "trébol",
        emoji: "🍀",
        color: "verde"
    }

];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const contenedorObjetos =
    document.getElementById("objetos");

const puntosHTML =
    document.getElementById("puntos");

const rondaHTML =
    document.getElementById("ronda");

const preguntaHTML =
    document.getElementById("pregunta");

const mensajeHTML =
    document.getElementById("mensaje");

const siguienteHTML =
    document.getElementById("siguiente");

const reiniciarHTML =
    document.getElementById("reiniciar");


// ==========================================
// MEZCLAR ARRAY
// ==========================================

function mezclar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] =
        [
            copia[j],
            copia[i]
        ];
    }

    return copia;
}


// ==========================================
// CREAR RONDA
// ==========================================

function crearRonda() {

    objetoSeleccionado = null;

    objetosCorrectos = 0;

    contenedorObjetos.innerHTML = "";

    mensajeHTML.textContent = "";

    siguienteHTML.style.display = "none";

    reiniciarHTML.style.display = "none";


    preguntaHTML.textContent =
        "¡Selecciona un objeto! 👆";


    /*
    Seleccionamos un objeto
    de cada color.
    */

    const colores = [
        "rojo",
        "azul",
        "amarillo",
        "verde"
    ];


    const objetosRonda = [];


    colores.forEach(color => {

        const disponibles =
            objetos.filter(
                objeto =>
                    objeto.color === color
            );


        const mezclados =
            mezclar(disponibles);


        objetosRonda.push(
            mezclados[0]
        );

    });


    /*
    Mezclamos los cuatro objetos
    para que aparezcan en
    posiciones diferentes.
    */

    const objetosFinales =
        mezclar(objetosRonda);


    objetosFinales.forEach(
        (item, indice) => {

            const boton =
                document.createElement("button");


            boton.classList.add(
                "objeto"
            );


            boton.classList.add(
                item.color
            );


            boton.textContent =
                item.emoji;


            boton.dataset.color =
                item.color;


            boton.dataset.id =
                indice;


            boton.setAttribute(
                "aria-label",
                item.nombre
            );


            boton.addEventListener(
                "click",
                () => {

                    seleccionarObjeto(
                        boton
                    );

                }
            );


            contenedorObjetos.appendChild(
                boton
            );

        }
    );
}


// ==========================================
// SELECCIONAR OBJETO
// ==========================================

function seleccionarObjeto(boton) {

    /*
    Si el objeto ya fue acertado,
    no hacemos nada.
    */

    if (
        boton.dataset.completado ===
        "true"
    ) {

        return;
    }


    /*
    Quitamos la selección
    de los demás objetos.
    */

    document
        .querySelectorAll(".objeto")
        .forEach(objeto => {

            objeto.classList.remove(
                "seleccionado"
            );

        });


    /*
    Seleccionamos el objeto.
    */

    boton.classList.add(
        "seleccionado"
    );


    objetoSeleccionado = boton;


    const color =
        boton.dataset.color;


    preguntaHTML.textContent =
        "Ahora busca el color " +
        color.toUpperCase() +
        " 👆";


    mensajeHTML.textContent = "";
}


// ==========================================
// ACTIVAR CAJAS
// ==========================================

document
    .querySelectorAll(".caja")
    .forEach(caja => {

        caja.addEventListener(
            "click",
            () => {

                comprobarCaja(caja);

            }
        );

    });


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarCaja(caja) {

    /*
    Primero comprobamos
    si hay un objeto seleccionado.
    */

    if (
        objetoSeleccionado === null
    ) {

        mostrarMensaje(
            "👆 Primero selecciona un objeto.",
            "#ff8f00"
        );

        return;
    }


    const colorObjeto =
        objetoSeleccionado.dataset.color;


    const colorCaja =
        caja.dataset.color;


    /*
    RESPUESTA CORRECTA
    */

    if (
        colorObjeto === colorCaja
    ) {

        puntos += 10;

        objetosCorrectos++;


        puntosHTML.textContent =
            puntos;


        mostrarMensaje(
            "🎉 ¡Muy bien!",
            "#20a653"
        );


        caja.classList.add(
            "correcta"
        );


        setTimeout(() => {

            caja.classList.remove(
                "correcta"
            );

        }, 500);


        /*
        Marcamos el objeto
        como completado.
        */

        objetoSeleccionado.dataset.completado =
            "true";


        objetoSeleccionado.classList.remove(
            "seleccionado"
        );


        objetoSeleccionado.style.visibility =
            "hidden";


        objetoSeleccionado =
            null;


        preguntaHTML.textContent =
            "¡Busca otro objeto! 😊";


        /*
        ¿Terminó la ronda?
        */

        if (
            objetosCorrectos === 4
        ) {

            terminarRonda();

        }

    }


    /*
    RESPUESTA INCORRECTA
    */

    else {

        mostrarMensaje(
            "😊 Ese no es su color. ¡Inténtalo otra vez!",
            "#ff8f00"
        );

    }
}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

function mostrarMensaje(
    texto,
    color
) {

    mensajeHTML.textContent =
        texto;

    mensajeHTML.style.color =
        color;
}


// ==========================================
// TERMINAR RONDA
// ==========================================

function terminarRonda() {

    preguntaHTML.textContent =
        "🎉 ¡Completaste la ronda!";


    mostrarMensaje(
        "¡Excelente trabajo! ⭐",
        "#20a653"
    );


    if (ronda < 5) {

        siguienteHTML.style.display =
            "block";

    } else {

        terminarJuego();

    }
}


// ==========================================
// SIGUIENTE RONDA
// ==========================================

siguienteHTML.addEventListener(
    "click",
    siguienteRonda
);


function siguienteRonda() {

    if (ronda >= 5) {

        return;
    }


    ronda++;


    rondaHTML.textContent =
        ronda;


    crearRonda();
}


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    preguntaHTML.textContent =
        "🏆 ¡Juego terminado!";


    mostrarMensaje(
        "¡Conseguiste " +
        puntos +
        " puntos! ⭐",
        "#20a653"
    );


    siguienteHTML.style.display =
        "none";


    reiniciarHTML.style.display =
        "block";


    contenedorObjetos.innerHTML =
        "🎉 🏆 🎉";
}


// ==========================================
// REINICIAR
// ==========================================

reiniciarHTML.addEventListener(
    "click",
    reiniciarJuego
);


function reiniciarJuego() {

    puntos = 0;

    ronda = 1;

    objetoSeleccionado = null;

    objetosCorrectos = 0;


    puntosHTML.textContent =
        "0";


    rondaHTML.textContent =
        "1";


    mensajeHTML.textContent =
        "";


    crearRonda();
}


// ==========================================
// INICIAR
// ==========================================

crearRonda();
