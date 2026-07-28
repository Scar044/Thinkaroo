(function() {
    
    const images = [
        '../IMG/pinguino_memoria.png',
        '../IMG/conejito_memoria.png',
        '../IMG/Koala_memoria.png',
       '../IMG/sapito_memoria.png',
       '../IMG/ballena_memoria.png',
       '../IMG/pollito_memoria.png',
       '../IMG/zorrito_memoria.png',
       '../IMG/osito_memoria.png',
    ];

    let cards = [...images, ...images]; 


    cards.sort(() => Math.random() - 0.5);

    const gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    
    cards.forEach(imgSrc => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Memory Card";

        card.appendChild(img);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    function flipCard() {
        if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkMatch();
    }

    function checkMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            resetTurn();
            if (matchedPairs === images.length) {
                setTimeout(() => alert('🎉 ¡Excelente trabajo! Encontraste todas las parejas!'), 300);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetTurn();
            }, 800);
        }
    }

    function resetTurn() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
})();