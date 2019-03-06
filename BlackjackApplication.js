// DOM variables --------------------------------------------------------------- //
let btnNewGame = document.getElementById('btn-new-game');
let btnMoreCard = document.getElementById('btn-more-card');
let btnStay = document.getElementById('btn-stay');
let txtYourCards = document.getElementById('txt-your-cards');
let txtPlayerScore = document.getElementById('div-player-score');

// Card variables --------------------------------------------------------------- //
var suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
var values = ['King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two', 'Ace'];
var numberOfCards = suits.length * values.length;
var raffledIndex = []; 

// Game variables --------------------------------------------------------------- //
let GameStatus = {
    gameStarted: false,
    gameOver: false,
    playerWon: false,
    dealerCards: [],
    playerCards: [],
    dealerScore: 0,
    playerScore: 0,
    deck: createDeck()
};

btnMoreCard.style.display = 'none';
btnStay.style.display = 'none';
txtYourCards.style.display = 'none';

btnNewGame.addEventListener('click', function(){
    btnNewGame.style.display = 'none';
    btnMoreCard.style.display = 'inline';
    btnStay.style.display = 'inline';
    txtYourCards.style.display = 'inline';

    let playerCards = [getNewCard(), getNewCard()];
    txtYourCards.innerHTML += '<br>' + getCardString(playerCards[0]);
    txtYourCards.innerHTML += '<br>' + getCardString(playerCards[1]);

    GameStatus.playerScore += playerCards[0].score;
    GameStatus.playerScore += playerCards[1].score;

    txtPlayerScore.innerHTML = GameStatus.playerScore;
});

btnMoreCard.addEventListener('click', function(){
    let newCard = getNewCard();

    txtYourCards.innerHTML += '<br>' + getCardString(newCard);

    GameStatus.playerScore += newCard.score;

    txtPlayerScore.innerHTML = GameStatus.playerScore;
});

// --------------------------------------------------------------------------------------- //

// --------------------------------------------------------------------------------------- //

function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx],
                score: 13 - valueIdx
            };

            deck.push(card);
        }
    }
    return deck;
}

function getNewCard() {
    let index;
    do {
        if(deck.length == 0) {
            throw "There's no Card to raffle"
        }
        index = Math.floor(Math.random() * numberOfCards);
    } while(raffledIndex.includes(index));
    
    raffledIndex.push(index);
    let card = deck[index];
    deck.splice(index, 1);
    return card;
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

// --------------------------------------------------------------------------------------- //

