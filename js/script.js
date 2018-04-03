// some variables to hold the buttons
var playGameButton = document.getElementById("playGame-button");
var gameOverButton = document.getElementById("gameOver-button");
var playAgainButton = document.getElementById("playAgain-button");

const cardsArray = [{
        'name': 'shell',
        'img': 'img/blueshell.png',
  },
    {
        'name': 'star',
        'img': 'img/star.png',
  },
    {
        'name': 'bobomb',
        'img': 'img/bobomb.png',
  },
    {
        'name': 'mario',
        'img': 'img/mario.png',
  },
    {
        'name': 'luigi',
        'img': 'img/luigi.png',
  },
    {
        'name': 'peach',
        'img': 'img/peach.png',
  },
    {
        'name': '1up',
        'img': 'img/1up.png',
  },
    {
        'name': 'mushroom',
        'img': 'img/mushroom.png',
  },
    {
        'name': 'thwomp',
        'img': 'img/thwomp.png',
  },
    {
        'name': 'bulletbill',
        'img': 'img/bulletbill.png',
  },
    {
        'name': 'coin',
        'img': 'img/coin.png',
  },
    {
        'name': 'goomba',
        'img': 'img/goomba.png',
  },
];

const gameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let matches = 0;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
    const {
        name,
        img
    } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

// function to record a match of two cards
const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

// function to reset the cards if no match was made
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', event => {
    const clicked = event.target;
    if (
        // if click was not on a card
        clicked.nodeName === 'SECTION' ||

        // if already matched, do not click
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                matches++;
                setTimeout(match, delay);
                console.log(matches);
            }
            setTimeout(resetGuesses, delay);
        }
    }
    if(matches === 2) {
        setTimeout(gameOver, 2000);
    }

});

function gameOver() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameOver-screen").style.display = "flex";
}

function playAgain() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the matches counter
    matches = 0;
}
playAgainButton.addEventListener("click", playAgain);
