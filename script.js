document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'red', img: "https://i.pinimg.com/564x/e3/27/bd/e327bd58eeee655b8103bf72e6c832fc.jpg" },
        { name: 'blue', img: 'https://i.pinimg.com/736x/4e/b1/d6/4eb1d64b63bce2454f674031299c8ca6.jpg' },
        { name: 'green', img: 'https://i.pinimg.com/564x/f7/e4/10/f7e4102b958a07b29666b65263baca46.jpg' },
        { name: 'yellow', img: 'https://i.pinimg.com/564x/8b/0b/6e/8b0b6ec260a4c1d2b3e579f96590bb7f.jpg' },
        { name: 'purple', img: 'https://i.pinimg.com/564x/a9/f6/2d/a9f62d3ff95676d340fb314f65fa27aa.jpg' },
        { name: 'orange', img: 'https://i.pinimg.com/564x/b5/f6/ff/b5f6ff39c3e33fca924d042540eb5d45.jpg' },
        { name: 'pink', img: 'https://i.pinimg.com/564x/5e/4f/16/5e4f16e911445d63f79fa0ff8f10502b.jpg' },
        { name: 'brown', img: 'https://i.pinimg.com/564x/83/33/be/8333beeaed9ab42f0fc590e26f2b6986.jpg' }
    ];

    const gameGrid = document.getElementById('gameGrid');
    const moveCounter = document.getElementById('moveCounter');
    const restartButton = document.getElementById('restartButton');

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundColor = '#2e3a4a'; // Front side color

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url(${card.img})`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener('click', handleCardClick);

        return cardElement;
    }

    function handleCardClick(event) {
        if (lockBoard) return;
        const clickedCard = event.currentTarget;

        if (clickedCard === firstCard) return;

        clickedCard.classList.add('flipped');

        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        secondCard = clickedCard;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
        moves++;
        moveCounter.textContent = moves;
    }

    function disableCards() {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function initializeGame() {
        moves = 0;
        moveCounter.textContent = moves;
        gameGrid.innerHTML = '';
        const shuffledCards = shuffle([...cardsArray, ...cardsArray]);
        shuffledCards.forEach(card => {
            const cardElement = createCardElement(card);
            gameGrid.appendChild(cardElement);
        });
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});
