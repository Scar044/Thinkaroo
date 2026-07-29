(function () {

    const animals = [
        {
            id: "pinguino",
            image:  'file:///C:/Users/kevin/Documents/GitHub/Thinkaroo/Public/IMG/avatar1.png',
            sound: "SONIDOS/pinguino.mp3"
        },
        {
            id: "conejo",
            image: "IMG/conejito_memoria.png",
            sound: "SONIDOS/conejo.mp3"
        },
        {
            id: "koala",
            image: "IMG/Koala_memoria.png",
            sound: "SONIDOS/koala.mp3"
        },
        {
            id: "sapo",
            image: "IMG/sapito_memoria.png",
            sound: "SONIDOS/sapo.mp3"
        },
        {
            id: "ballena",
            image: "IMG/ballena_memoria.png",
            sound: "SONIDOS/ballena.mp3"
        },
        {
            id: "pollito",
            image: "IMG/pollito_memoria.png",
            sound: "SONIDOS/pollito.mp3"
        },
        {
            id: "zorro",
            image: "IMG/zorrito_memoria.png",
            sound: "SONIDOS/zorro.mp3"
        },
        {
            id: "oso",
            image: "IMG/osito_memoria.png",
            sound: "SONIDOS/oso.mp3"
        }
    ];

    let cards = [];

    animals.forEach(animal => {

        cards.push({
            type: "image",
            pair: animal.id,
            image: animal.image
        });

        cards.push({
            type: "sound",
            pair: animal.id,
            sound: animal.sound
        });

    });

    cards.sort(() => Math.random() - 0.5);

    const gameBoard = document.getElementById("gameBoard");

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matched = 0;

    cards.forEach(data => {

        const card = document.createElement("div");
        card.className = "card";
        card.dataset.pair = data.pair;
        card.dataset.type = data.type;

        if (data.type === "image") {

            const img = document.createElement("img");
            img.src = data.image;
            card.appendChild(img);

        } else {

            const icon = document.createElement("div");
            icon.className = "sound";
            icon.textContent = "🔊";
            card.appendChild(icon);

            card.dataset.sound = data.sound;

        }

        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);

    });

    function flipCard() {

        if (lockBoard) return;
        if (this.classList.contains("flipped")) return;
        if (this.classList.contains("matched")) return;

        this.classList.add("flipped");

        if (this.dataset.type === "sound") {

            const audio = new Audio(this.dataset.sound);
            audio.play();

        }

        if (!firstCard) {

            firstCard = this;
            return;

        }

        secondCard = this;
        lockBoard = true;

        checkMatch();

    }

    function checkMatch() {

        const samePair = firstCard.dataset.pair === secondCard.dataset.pair;
        const differentType = firstCard.dataset.type !== secondCard.dataset.type;

        if (samePair && differentType) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matched++;

            reset();

            if (matched === animals.length) {

                setTimeout(() => {

                    alert("🎉 ¡Ganaste!");

                }, 400);

            }

        } else {

            setTimeout(() => {

                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");

                reset();

            }, 1000);

        }

    }

    function reset() {

        firstCard = null;
        secondCard = null;
        lockBoard = false;

    }

})();