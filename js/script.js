let firstGuess = '';
let secondGuess = '';
let count = 0;
let matches = 0;
let tries = 0;
let delay = 1200;

// some variables to hold the buttons
var playGameButton = document.getElementById("playGame-button");
var gameOverButton = document.getElementById("gameOver-button");
var playAgainButton = document.getElementById("playAgain-button");

const cardsArray = [{
        'name': 'andalusian',
        'img': 'img/andalusian_sm.jpg',
  },
    {
        'name': 'arabian',
        'img': 'img/arabian_sm.jpg',
  },
    {
        'name': 'belgian',
        'img': 'img/belgian.jpg',
  },
    {
        'name': 'clydesdale',
        'img': 'img/clydesdale_sm.jpg',
  },
    {
        'name': 'gypsy',
        'img': 'img/gypsy_sm.jpg',
  },
    {
        'name': 'haflinger',
        'img': 'img/haflinger_sm.jpg',
  },
    {
        'name': 'mountain',
        'img': 'img/mountain_sm.jpg',
  },
    {
        'name': 'percheron',
        'img': 'img/percheron_sm.jpg',
  },
    {
        'name': 'quarab',
        'img': 'img/quarab_sm.jpg',
  },
    {
        'name': 'quarter',
        'img': 'img/quarter_sm.jpg',
  },
    {
        'name': 'shetland',
        'img': 'img/shetland_sm.jpg',
  },
    {
        'name': 'thoroughbred',
        'img': 'img/thoroughbred_sm.jpg',
  },
];
// start the game
initialize();

function initialize(firstTime) {
    const gameGrid = cardsArray
        .concat(cardsArray)
        .sort(() => 0.5 - Math.random());
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
                tries++;
                console.log("Tries: ", tries);
            }
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    matches++;
                    setTimeout(match, delay);
                    // console.log(matches);
                }
                setTimeout(resetGuesses, delay);
            }
        }
        if (matches === 2) {
            setTimeout(gameOver, delay);
        }
    });
}

function gameOver() {
    // hide the game screen
    document.getElementById("game").style.display = "none";
    // show the game over screen
    document.getElementById("gameOver-screen").style.display = "flex";
    document.getElementById('score').textContent = "Your score was " + tries + " tries!";
}

function playAgain() {
    // hide the game over screen
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the matches counter
    matches = 0;
    count = 0;
    tries = 0;
    // show the game screen
    document.getElementById("game").style.display = "flex";
    // reload the game
    document.location.reload();
}
playAgainButton.addEventListener("click", playAgain);
