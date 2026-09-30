const images = [

    "IMG/avatar1cerdo.png",
    "IMG/Elefante.png",
    "IMG/avatar3gato.png",
    "IMG/avatar4oveja.png",
    "IMG/avatar5pollo.png",
    "IMG/avatar6ratón.png",
    "IMG/avatar7tigre.png",
    "IMG/avatar8vaca.png"

];

let cards = [...images, ...images];

cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

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

                    id_actividad: 1,

                    progreso: progreso,

                    estado: estado

                })
            }
        );

        const datos = await respuesta.json();

        console.log(
            "PROGRESO VISUAL:",
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

cards.forEach(function (imgSrc) {

    const card = document.createElement("div");

    card.classList.add("memory-card");

    card.dataset.image = imgSrc;

    const cardInner = document.createElement("div");

    cardInner.classList.add("card-inner");

    const cardBack = document.createElement("div");

    cardBack.classList.add("card-back");

    const cardFront = document.createElement("div");

    cardFront.classList.add("card-front");

    const img = document.createElement("img");

    img.src = imgSrc;
    img.alt = "Animal";

    cardFront.appendChild(img);

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);

    card.appendChild(cardInner);

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);

});

function flipCard() {

    if (lockBoard) {
        return;
    }

    if (this.classList.contains("flipped")) {
        return;
    }

    if (this.classList.contains("matched")) {
        return;
    }

    this.classList.add("flipped");

    if (firstCard === null) {

        firstCard = this;

        return;
    }

    secondCard = this;

    lockBoard = true;

    checkMatch();

}

function checkMatch() {

    const isMatch =
        firstCard.dataset.image ===
        secondCard.dataset.image;


    if (isMatch) {

        firstCard.classList.add("matched");

        secondCard.classList.add("matched");

        matchedPairs++;

        const progreso = Math.round(
            (matchedPairs / images.length) * 100
        );

        if (matchedPairs < images.length) {

            guardarProgreso(
                progreso,
                "en proceso"
            );

        }


        resetTurn();

        if (matchedPairs === images.length) {

            setTimeout(async function () {

                const resultado =
                    await guardarProgreso(
                        100,
                        "completado"
                    );


                if (resultado.success) {

                    console.log(
                        "Memoria Visual completada."
                    );

                }

                mostrarAlertaFinal();

            }, 500);

        }


    } else {

        setTimeout(function () {

            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");

            resetTurn();

        }, 800);

    }

}

function resetTurn() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}

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