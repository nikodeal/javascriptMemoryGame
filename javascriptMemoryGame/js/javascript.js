

const cards = document.querySelectorAll('.cardsClass');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockboard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}
function unflipCards() {
    lockboard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function randomShuffleCards() {
   let fullarray = ['tl', 'tm1', 'tm2', 'tr' , 'ml', 'mm1', 'mm2', 'mr' ,'bl', 'bm1', 'bm2', 'br' ]
    fullarray = shuffle(fullarray);
    let rowOne = fullarray.slice (0, 4);
    let rowTwo = fullarray.slice (4, 8);
    let rowThre = fullarray.slice (8, 12);
    rowOne = rowOne.toString()
    rowTwo = rowTwo.toString()
    rowThre = rowThre.toString()
    let fullBoard =  `"${rowOne}" "${rowTwo}" "${rowThre}"`
    fullBoard = shuffle(fullBoard)
    fullBoard = `${fullBoard}`
    for ( let i = 0 ; i < fullBoard.length ; i++){
        fullBoard= fullBoard.replace(',', ' ');
    }
    console.log(fullBoard)
    let board = document.getElementById("board");
    board.style.gridTemplateAreas =fullBoard;
})();

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
cards.forEach(card => card.addEventListener('click', flipCard));
