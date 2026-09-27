// ==========================================
// PAREJAS
// ==========================================

const pairs = [

    {
        img: "IMG/avatar1cerdo.png",
        audio: "../audios/cerdo.mp3"
    },

    {
        img: "IMG/Elefante.png",
        audio: "../audios/elefante.mp3"
    },

    {
        img: "IMG/avatar3gato.png",
        audio: "../audios/gato.mp3"
    },

    {
        img: "IMG/avatar4oveja.png",
        audio: "../audios/oveja.mp3"
    },

    {
        img: "IMG/avatar5pollo.png",
        audio: "../audios/pollito.mp3"
    },

    {
        img: "IMG/avatar6ratón.png",
        audio: "../audios/rata.mp3"
    },

    {
        img: "IMG/avatar7tigre.png",
        audio: "../audios/tigre.mp3"
    },

    {
        img: "IMG/avatar8vaca.png",
        audio: "../audios/vaca.mp3"
    }

];


// ==========================================
// CREAR CARTAS
// ==========================================

let cards = [];


pairs.forEach((pair, index) => {

    // Carta con imagen

    cards.push({

        id: index,

        type: "image",

        img: pair.img,

        audio: pair.audio

    });


    // Carta con sonido

    cards.push({

        id: index,

        type: "audio",

        img: pair.img,

        audio: pair.audio

    });

});


// Mezclar

cards.sort(
    () => Math.random() - 0.5
);


// ==========================================
// TABLERO
// ==========================================

const gameBoard =
    document.getElementById("gameBoard");


// ==========================================
// VARIABLES
// ==========================================

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;


// ==========================================
// ALERTA FINAL
// ==========================================

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


// ==========================================
// GUARDAR PROGRESO
// ==========================================

async function guardarProgreso(
    progreso,
    estado
) {

    try {

        const respuesta = await fetch(
            "../ConfigPHP/guardar_progreso.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    // Actividad 2 =
                    // Memoria Auditiva

                    id_actividad: 2,

                    progreso: progreso,

                    estado: estado

                })

            }
        );


        const datos =
            await respuesta.json();


        console.log(
            "PROGRESO AUDITIVO:",
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


// ==========================================
// REGISTRAR COMO SIN INICIAR
// ==========================================

guardarProgreso(
    0,
    "sin iniciar"
);


// ==========================================
// CREAR LAS CARTAS
// ==========================================

cards.forEach(cardData => {

    const card =
        document.createElement("div");


    card.classList.add("card");


    card.dataset.id =
        cardData.id;


    card.dataset.type =
        cardData.type;


    card.dataset.audio =
        cardData.audio;


    // ======================================
    // CARTA DE IMAGEN
    // ======================================

    if (cardData.type === "image") {

        const img =
            document.createElement("img");


        img.src =
            cardData.img;


        img.alt =
            "Animal";


        card.appendChild(img);

    }


    // ======================================
    // CARTA DE SONIDO
    // ======================================

    else {

        const img =
            document.createElement("img");


        img.src =
            "IMG/bocina.png";


        img.alt =
            "Escuchar animal";


        card.appendChild(img);

    }


    // ======================================
    // CLICK
    // ======================================

    card.addEventListener(
        "click",
        flipCard
    );


    gameBoard.appendChild(card);

});


// ==========================================
// VOLTEAR CARTA
// ==========================================

function flipCard() {

    if (
        lockBoard ||
        this.classList.contains("matched") ||
        this.classList.contains("flipped")
    ) {

        return;

    }


    this.classList.add(
        "flipped"
    );


    // ======================================
    // REPRODUCIR SONIDO
    // ======================================

    if (
        this.dataset.type === "audio"
    ) {

        const sonido =
            new Audio(
                this.dataset.audio
            );


        sonido.play();

    }


    // ======================================
    // PRIMERA CARTA
    // ======================================

    if (firstCard === null) {

        firstCard = this;

        return;

    }


    // ======================================
    // SEGUNDA CARTA
    // ======================================

    secondCard = this;


    lockBoard = true;


    checkMatch();

}


// ==========================================
// COMPROBAR PAREJA
// ==========================================

function checkMatch() {

    const match =

        firstCard.dataset.id ===
        secondCard.dataset.id &&

        firstCard.dataset.type !==
        secondCard.dataset.type;


    // ======================================
    // PAREJA CORRECTA
    // ======================================

    if (match) {

        firstCard.classList.add(
            "matched"
        );


        secondCard.classList.add(
            "matched"
        );


        matchedPairs++;


        // ==================================
        // CALCULAR PROGRESO
        // ==================================

        const progreso =
            Math.round(
                (
                    matchedPairs /
                    pairs.length
                ) * 100
            );


        // ==================================
        // EN PROCESO
        // ==================================

        if (
            matchedPairs <
            pairs.length
        ) {

            guardarProgreso(
                progreso,
                "en proceso"
            );

        }


        resetTurn();


        // ==================================
        // JUEGO COMPLETADO
        // ==================================

        if (
            matchedPairs ===
            pairs.length
        ) {

            setTimeout(
                async function () {

                    // Guardar como completado

                    const resultado =
                        await guardarProgreso(
                            100,
                            "completado"
                        );


                    if (
                        resultado.success
                    ) {

                        console.log(
                            "Memoria Auditiva completada."
                        );

                    }


                    // ==================================
                    // MOSTRAR MISIÓN FINAL
                    // ==================================

                    mostrarAlertaFinal();

                },
                500
            );

        }

    }


    // ======================================
    // PAREJA INCORRECTA
    // ======================================

    else {

        setTimeout(
            function () {

                firstCard.classList.remove(
                    "flipped"
                );


                secondCard.classList.remove(
                    "flipped"
                );


                resetTurn();

            },
            1000
        );

    }

}


// ==========================================
// REINICIAR TURNO
// ==========================================

function resetTurn() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}