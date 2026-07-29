(function() {

    const images = [
        'IMG/avatar1.png',
        'IMG/avatar2.png',
        'IMG/avatar3.png',
        'IMG/avatar4.png',
        'IMG/avatar5.png',
        'IMG/avatar6.png',
        'IMG/avatar7.png',
        'IMG/avatar8.png'
    ];


    const audio = [
        'audios/cerdo.mp3',
        'audios/vaca.mp3',
        'audios/oveja.mp3',
        'audios/gato.mp3',
        'audios/rata.mp3',
        'audios/pollito.mp3',
        'audios/tigre.mp3',
        'audios/.mp3'
    ];



    let cards = [];


    // Crear parejas imagen + audio
    images.forEach((img, index) => {

        cards.push({
            id: index,
            type: "image",
            src: img
        });


        cards.push({
            id: index,
            type: "audio",
            src: audio[index]
        });

    });



    cards.sort(() => Math.random() - 0.5);



    const gameBoard = document.getElementById('gameBoard');

    let firstCard = null;
    let secondCard = null;

    let lockBoard = false;

    let matchedPairs = 0;



    cards.forEach(item => {


        const card = document.createElement('div');

        card.classList.add('card');


        card.dataset.id = item.id;

        card.dataset.type = item.type;



        if(item.type === "image") {


            const img = document.createElement('img');

            img.src = item.src;

            img.alt = "Imagen";

            card.appendChild(img);


        } else {


            card.innerHTML = "🔊";


            card.audio = new Audio(item.src);


        }



        card.addEventListener('click', flipCard);


        gameBoard.appendChild(card);


    });





    function flipCard() {


        if (
            lockBoard ||
            this.classList.contains('flipped') ||
            this.classList.contains('matched')
        ) return;



        this.classList.add('flipped');



        // Reproducir sonido al tocar la carta
        if(this.dataset.type === "audio") {

            this.audio.currentTime = 0;

            this.audio.play();

        }





        if(!firstCard) {

            firstCard = this;

            return;

        }



        secondCard = this;

        lockBoard = true;


        checkMatch();

    }






    function checkMatch() {


        if(
            firstCard.dataset.id === secondCard.dataset.id &&
            firstCard.dataset.type !== secondCard.dataset.type
        ) {


            firstCard.classList.add('matched');

            secondCard.classList.add('matched');


            matchedPairs++;


            resetTurn();



            if(matchedPairs === images.length) {


                setTimeout(() => {

                    alert("🎉 ¡Encontraste todas las parejas!");

                },300);


            }



        } else {


            setTimeout(() => {


                firstCard.classList.remove('flipped');

                secondCard.classList.remove('flipped');


                resetTurn();


            },800);


        }

    }




    function resetTurn() {


        firstCard = null;

        secondCard = null;

        lockBoard = false;


    }


})();