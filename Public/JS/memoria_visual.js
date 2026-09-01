document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // IMÁGENES
    // ==========================================

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


    // ==========================================
    // CREAR LAS 16 CARTAS
    // ==========================================

    let cards = [...images, ...images];


    // Mezclar cartas
    cards.sort(() => Math.random() - 0.5);


    const gameBoard = document.getElementById("gameBoard");


    // ==========================================
    // VARIABLES DEL JUEGO
    // ==========================================

    let firstCard = null;
    let secondCard = null;

    let lockBoard = false;

    let matchedPairs = 0;


    // ==========================================
    // CREAR CARTAS
    // ==========================================

    cards.forEach(function (imgSrc) {

        // Carta principal
        const card = document.createElement("div");

        card.classList.add("memory-card");

        // Guardamos qué imagen tiene
        card.dataset.image = imgSrc;


        // ==========================================
        // CONTENEDOR INTERNO
        // ==========================================

        const cardInner = document.createElement("div");

        cardInner.classList.add("card-inner");


        // ==========================================
        // PARTE TRASERA
        // ==========================================

        const cardBack = document.createElement("div");

        cardBack.classList.add("card-back");


        // ==========================================
        // PARTE DELANTERA
        // ==========================================

        const cardFront = document.createElement("div");

        cardFront.classList.add("card-front");


        // Imagen del animal
        const img = document.createElement("img");

        img.src = imgSrc;

        img.alt = "Animal";


        // ==========================================
        // ARMAR LA CARTA
        // ==========================================

        cardFront.appendChild(img);

        cardInner.appendChild(cardBack);

        cardInner.appendChild(cardFront);

        card.appendChild(cardInner);


        // ==========================================
        // CLICK
        // ==========================================

        card.addEventListener("click", flipCard);


        // Agregar al tablero
        gameBoard.appendChild(card);

    });


    // ==========================================
    // VOLTEAR CARTA
    // ==========================================

    function flipCard() {

        // No permitir clicks mientras se revisa
        // una pareja
        if (lockBoard) {
            return;
        }


        // No permitir volver a seleccionar
        // una carta ya volteada
        if (this.classList.contains("flipped")) {
            return;
        }


        // No permitir seleccionar una pareja
        // que ya fue encontrada
        if (this.classList.contains("matched")) {
            return;
        }


        // Voltear la carta
        this.classList.add("flipped");


        // Primera carta
        if (firstCard === null) {

            firstCard = this;

            return;
        }


        // Segunda carta
        secondCard = this;


        // Bloquear tablero temporalmente
        lockBoard = true;


        // Comprobar si coinciden
        checkMatch();

    }


    // ==========================================
    // COMPROBAR PAREJA
    // ==========================================

    function checkMatch() {

        const isMatch =
            firstCard.dataset.image ===
            secondCard.dataset.image;


        if (isMatch) {

            // ==================================
            // PAREJA CORRECTA
            // ==================================

            firstCard.classList.add("matched");

            secondCard.classList.add("matched");


            matchedPairs++;


            resetTurn();


            // ==================================
            // COMPROBAR SI TERMINÓ EL JUEGO
            // ==================================

            if (matchedPairs === images.length) {

                setTimeout(function () {

                    alert(
                        "🎉 ¡Excelente trabajo! Encontraste todas las parejas!"
                    );

                    window.location.href = "niveles.html";

                }, 500);

            }


        } else {

            // ==================================
            // NO SON PAREJA
            // ==================================

            setTimeout(function () {

                firstCard.classList.remove("flipped");

                secondCard.classList.remove("flipped");


                resetTurn();

            }, 800);

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

});