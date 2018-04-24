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
        'name': 'Andalusian',
        'desc': 'Throughout its history, the Andalusian has been known for its prowess as a war horse, and was prized by the nobility.',
        'img': 'img/andalusian_sm.jpg',
  },
    {
        'name': 'Arabian',
        'desc': 'has four legs',
        'img': 'img/arabian_sm.jpg',
  },
    {
        'name': 'Belgian',
        'desc': 'has four legs',
        'img': 'img/belgian.jpg',
  },
    {
        'name': 'Clydesdale',
        'desc': 'has four legs',
        'img': 'img/clydesdale_sm.jpg',
  },
    {
        'name': 'Gypsy',
        'desc': 'has four legs',
        'img': 'img/gypsy_sm.jpg',
  },
    {
        'name': 'Haflinger',
        'desc': 'has four legs',
        'img': 'img/haflinger_sm.jpg',
  },
    {
        'name': 'Mountain',
        'desc': 'has four legs',
        'img': 'img/mountain_sm.jpg',
  },
    {
        'name': 'Percheron',
        'desc': 'has four legs',
        'img': 'img/percheron_sm.jpg',
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
            desc,
            img
        } = item;

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;
        card.dataset.desc = desc;

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
            // don't click twice on a card
            clicked.parentNode.classList.contains('selected') ||
            // if already matched, do not click
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;

                console.log("first guess is: ", firstGuess);
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
        if (matches === 3) {
            setTimeout(gameOver, delay);
        }
    });

    // function for image zoom and info
    grid.addEventListener('click', event => {
        const newClick = event.target;
        // get the name of the horse clicked
        var test1 = newClick.parentNode.dataset.name;
        // get the description
        var test2 = newClick.parentNode.dataset.desc;

        // clicking allowed only on matched pairs
        if (newClick.parentNode.classList.contains('match')) {
            // make the modal window visible
            modal.style.display = "block";
            // write to the modal window
            document.getElementById('modal2').textContent = "This horse is the " + test1 +" " + test2;
        };
    });
}
// code a modal window to show more detail about a matched pair
// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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
