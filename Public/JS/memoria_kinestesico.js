const images = [
    'IMG/avatar1cerdo.png',
    'IMG/Elefante.png',
    'IMG/avatar3gato.png',
    'IMG/avatar4oveja.png',
    'IMG/avatar5pollo.png',
    'IMG/avatar6ratón.png',
    'IMG/avatar7tigre.png',
    'IMG/avatar8vaca.png'
];

let cards = [...images, ...images];

cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('gameBoard');

let draggedCard = null;
let matchedPairs = 0;

cards.forEach(function(imgSrc) {

    const card = document.createElement('div');

    card.classList.add('memory-card');

    card.dataset.image = imgSrc;

    card.draggable = true;


    const img = document.createElement('img');

    img.src = imgSrc;

    img.alt = "Animal";


    card.appendChild(img);

    gameBoard.appendChild(card);


    card.addEventListener('dragstart', function() {

        draggedCard = card;

        card.classList.add('dragging');

    });


    card.addEventListener('dragend', function() {

        card.classList.remove('dragging');

    });


    card.addEventListener('dragover', function(event) {

        event.preventDefault();

        card.classList.add('over');

    });


    card.addEventListener('dragleave', function() {

        card.classList.remove('over');

    });


    card.addEventListener('drop', function(event) {

        event.preventDefault();

        card.classList.remove('over');


        if (draggedCard === null) {
            return;
        }

        if (draggedCard === card) {
            return;
        }


        if (draggedCard.dataset.image === card.dataset.image) {

            draggedCard.classList.add('matched');
            card.classList.add('matched');

            matchedPairs++;

            draggedCard = null;


            if (matchedPairs === images.length) {

                setTimeout(function() {

                    alert('🎉 ¡Excelente trabajo! Encontraste todas las parejas.');

                }, 500);

            }

        } else {

            card.classList.add('wrong');

            setTimeout(function() {

                card.classList.remove('wrong');

            }, 500);

        }

    });

});