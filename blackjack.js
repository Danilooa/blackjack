let textArea = document.getElementById("text-area"),
    newGameButton = document.getElementById("new-game-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

let suits = [
  'Hearts',
  'Clubs',
  'Diamonds',
  'Spades'
];

let values = [
  { value: 'Ace', points: [1, 11]},
  { value: 'King', points: [10]},
  { value: 'Queen', points: [10]},
  { value: 'Jack', points: [10]},
  { value: 'Ten', points: [10]},
  { value: 'Nine', points: [9]},
  { value: 'Eight', points: [8]},
  { value: 'Seven', points: [7]},
  { value: 'Six', points: [6]},
  { value: 'Five', points: [5]},
  { value: 'Four', points: [4]},
  { value: 'Three', points: [3]},
  { value: 'Two', points: [2]}
];

function getScore(cards) {
  let score = 0;
  for (let cardIdx = 0; cardIdx < cards.length; cardIdx++) {
    let card = cards[cardIdx];
    let isAce = card.value.points.length === 2;
    let calculatedScorePlusEleven = card.value.points[1] + score;
    if (isAce &&  calculatedScorePlusEleven <= 21) {
      score += card.value.points[1];
      continue;
    }
    score += card.value.points[0];
  }
  return score;
}

function createDeck() {
  let deck = [];
  for (let suitsIdx = 0; suitsIdx < suits.length; suitsIdx++) {
    for (let valuesIdx = 0; valuesIdx < values.length; valuesIdx++) {
      deck.push(
        {
          value: values[valuesIdx],
          suit: suits[suitsIdx]
        }
      );
    }
  }
  return deck;
}

function getNextCard() {
  return deck.shift();
}

function showStatus() {
  let dealerDisplay = document.getElementById('dealer-display');
  let playerDisplay = document.getElementById('player-display');
  if (!gameStarted) {
    textArea.innerText = "Welcome to blackjack!!!";
    dealerDisplay.innerHtml = '';
    playerDisplay.innerHtml = '';
  } else {
    dealerDisplay.innerHtml = getHtmlScore('Dealer', dealerCards);
    playerDisplay.innerHtml = getHtmlScore('Player', playerCards);
  }
}

function shuffleDeck(deckToShuffle) {
  for (let toIdx = 0; toIdx < deckToShuffle.length; toIdx++) {
      toCard = deckToShuffle[toIdx];
      fromIdx = Math.floor((Math.random() * (deckToShuffle.length - 1)) + 1);
      fromCard = deckToShuffle[fromIdx];
      deckToShuffle[toIdx] = fromCard;
      deckToShuffle[fromIdx] = toCard;        
  }
}

newGameButton.addEventListener('click', function() {
  gameStarted = true;

  deck = createDeck();
  shuffleDeck(deck);

  console.log(deck);

  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';

  showStatus();
});

function getCardFullName(card) {
  return card.value + " of " + card.suit;
}

function getHtmlScore(playerName, cards) {
  let htmlScore = playerName + ' has: <br/><br/>';
  for (let cardIdx = 0; cardIdx < cards.length; cardIdx++) {
    htmlScore =+ getCardFullName(cards[cardIdx]) + '<br/>';
  }
  htmlScore += '<br/> Score: ' + getScore(cards);
  return htmlScore;
}