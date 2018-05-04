let firstGuess = '';
let secondGuess = '';
let count = 0;
let matches = 0;
let tries = 0;
let delay = 1200;
let test4 = '';

let myImage = '';

var gameGrid = [];

//Some variables to hold the buttons
var playGameButton = document.getElementById("playGame-button");
var gameOverButton = document.getElementById("gameOver-button");
var playAgainButton = document.getElementById("playAgain-button");

const cardsArray = [{
        'name': 'Andalusian',
        'desc': 'The Andalusian is from the Iberian Peninsula of Spain, where its ancestors have lived for thousands of years. Throughout its history, the Andalusian has been known as a great war horse, and was prized by kings and princes.',
        'img': 'img/andalusian_sm.jpg',
  },
    {
        'name': 'Arabian',
        'desc': 'The Arabian is from the Arabian Peninsula in the Middle East. With a distinctive head and high tail carriage, the Arabian is one of the most easily recognizable horses in the world and is also one of the oldest breeds dating back 4,500 years.',
        'img': 'img/arabian_sm.jpg',
  },
    {
        'name': 'Belgian',
        'desc': 'The Belgian, also known as the Belgian Heavy Horse, is a draft horse from the Brabant region of Belgium. It is one of the strongest of the heavy breeds. Belgians are still used as working animals, but have also become popular as show horses, and pleasure riding horses.',
        'img': 'img/belgian.jpg',
  },
    {
        'name': 'Clydesdale',
        'desc': 'The Clydesdale is a draught horse from the county of Clydesdale in Scotland. Clydesdales are used for farming and hauling loads but they are also used as drum horses by the British Household Cavalry!',
        'img': 'img/clydesdale.jpg',
  },
    {
        'name': 'Gypsy',
        'desc': 'The Gypsy Horse is a type of domestic horse from the British Isles. It is small, solidly-built and often, but not always, has white splashes on its sides and underbelly and long hair on its legs.',
        'img': 'img/gypsy_sm.jpg',
  },
    {
        'name': 'Haflinger',
        'desc': 'The Haflinger came from Austria and northern Italy during the late 19th century. Haflinger horses are relatively small and are always chestnut coloured with flaxen coloured manes. Haflingers have many uses including light draft and harness work as well as endurance riding, dressage, equestrian vaulting and therapeutic riding.',
        'img': 'img/haflinger_sm.jpg',
  },
    {
        'name': 'Mountain',
        'desc': 'The Mountain Pleasure Horse comes from the Appalachian Mountains of Eastern Kentucky in the 17th century. They have a smooth ambling gait which made them favorite mounts for traveling between the sparsely settled colonies, especially in rugged terrain.',
        'img': 'img/mountain_sm.jpg',
  },
    {
        'name': 'Percheron',
        'desc': 'The Percheron is a breed of draft horse that came from France. Percherons are used for parades, sleigh rides and hayrides, as well as being used to pull carriages in large cities.',
        'img': 'img/percheron_lg.jpg',
  },
    {
        'name': 'Quarter',
        'desc': 'The Quarter Horse, is an American breed of horse that excels at sprinting short distances. Its name came from its ability to outdistance other horses in races of a quarter mile or less; some have been clocked at speeds up to 88 km/h. The Quarter Horse is well known both as a race horse and for its performance in rodeos, horse shows and as a working ranch horse.',
        'img': 'img/quarter.jpg',
  },
    {
        'name': 'Shetland',
        'desc': 'The Shetland pony is from the Shetland Isles. Shetland ponies have heavy coats, short legs and are quite intelligent. They are a very strong ponies, used for riding, driving and carrying loads.',
        'img': 'img/shetland_sm.jpg',
  },
    {
        'name': 'Thoroughbred',
        'desc': 'The Thoroughbred was developed in England in the 17th and 18th centuries. Thoroughbreds are used mainly for racing, but are also used for show jumping, combined training, dressage and polo.',
        'img': 'img/thoroughbred_sm.jpg',
  },
   ];
//Random generator
const random = (n) => {
    return Math.floor(Math.random() * n);
}

//Get the images for this game
const getSomeImages = () => {
    var imagescopy = cardsArray.slice();
    var randomImages = [];

    // this is where we pick 12 images (two sets of 6)
    for (var i = 0; i < 6; i++) {
        var index = random(imagescopy.length);
        randomImages.push(imagescopy.splice(index, 1)[0]);
    }

    // this doubles the selected images in random order
    gameGrid = randomImages.concat(randomImages).sort(() => 0.5 - Math.random());

    return gameGrid;
}

const initialize = () => {

    getSomeImages();

    const game = document.getElementById('game');

    grid = document.createElement('section');

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
        card.dataset.img = img;

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
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
                tries++;
            }
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    matches++;
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
        }
        if (matches === 6) {
            setTimeout(gameOver, delay);
        }
    });

    // function for image zoom and info
    grid.addEventListener('click', event => {

        const newClick = event.target;
        // get the name of the horse clicked
        var modal_name = newClick.parentNode.dataset.name;
        // get the description
        var modal_desc = newClick.parentNode.dataset.desc;
        //get the image
        var modal_img = newClick.parentNode.dataset.img;

        // clicking allowed only on matched pairs
        if (newClick.parentNode.classList.contains('match')) {
            // make the modal window visible
            modal.style.display = "flex";

            // write to the modal window
            myImage = new Image();
            myImage.src = modal_img;

            //Show the image
            test4 = document.getElementById('horse_image');
            test4.appendChild(myImage);

            //Show name and description
            document.getElementById('modal2').textContent = modal_desc;
        };
    });
};

//Code a modal window to show more detail about a matched pair
//Get the modal
var modal = document.getElementById('myModal');
//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//When the user clicks on <span> (x), close the modal
span.onclick = function () {
    clearModal();
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        clearModal();
    }
}

const clearModal = () => {
    modal.style.display = "none";
    test4.removeChild(myImage);
}

const gameOver = () => {
    // hide the game screen
    document.getElementById("game").style.display = "none";
    // show the game over screen
    document.getElementById("gameOver-screen").style.display = "flex";
    document.getElementById('score').textContent = "Your score was " + tries + " tries!";
}

const playGame = () => {
    // hide the welcome screen
    document.getElementById("gameStart-screen").style.display = "none";
    //reset the matches counter
    matches = 0;
    count = 0;
    tries = 0;
    //show the game screen
    document.getElementById("game").style.display = "flex";
    //start the game
    initialize();
}

const playAgain = () => {
    // hide the game over screen
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the counters
    matches = 0;
    count = 0;
    tries = 0;
    //clear the old grid
    grid.parentNode.removeChild(grid);
    // show the game screen
    document.getElementById("game").style.display = "flex";
    //start the game
    initialize();
}

function quitGame() {
    // hide the game over screen
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the counters
    matches = 0;
    count = 0;
    tries = 0;
    //clear the old grid
    grid.parentNode.removeChild(grid);
    gameOver - screen.close();
}

playGameButton.addEventListener("click", playGame);

playAgainButton.addEventListener("click", playAgain);

//gameOverButton.addEventListener("click", quitGame);
