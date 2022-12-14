// select all cards
const cards = document.querySelectorAll('.card');
// select game frame
const game = document.querySelector('.game');
// score span
const scoreText = document.getElementById('score');

// condtion check variables
let firstCard    = null,
    cardsClicked = 0,
    cardsLeft    = 12,
    score        = localStorage.getItem('score') ? localStorage.getItem('score') : 0;

// check if local storage have score key if yes set score equal to it
scoreText.textContent = localStorage.getItem('score') ? localStorage.getItem('score') : score;

// check if player won
const checkWin = () => {
    // check if there's no more cards left to match
    const checkCards = (cardsLeft == 0);
    if (checkCards) {
        setTimeout(() => {
            // clear grid displat and displat a new winning div
            // increase score
            score++;

            // set new score in local storage
            localStorage.setItem('score', score)
            game.style.display = "block";
            game.innerHTML     = "<div class='win'><h1>YOU WON</h1><button class='restart' onclick='restartGame()'>Play again</button></div>";
            // update score text on screen
            scoreText.textContent = localStorage.getItem('score') ? localStorage.getItem('score') : score;
        }, 700)
    }
}

const shuffleCards = () => {
    // moving a card from a position to another by appending it to parent
    for (let i = game.children.length; i >= 0; i--) {
        game.appendChild(game.children[Math.random() * i | 0]);
    }
}

// if we are clearing matched cards do first condition, if we are clearing unmatched cards do second condition
const clearCard = (card1, card2, matched = true) => {
    // i added 700ms just for the animation of flipping have time to finish and reveal the card
    setTimeout(() => {
        if (matched) {
            // if card1 match card2, hide the cards and decrease left cards 
            card1.classList.add('hide')
            card2.classList.add('hide');
            cardsLeft -= 2;
        } else {
            // if the card1 doesn't match card2 flip back cards to back side and clear first card and cards clicked 
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        // clear fist card and cards clicked 
        firstCard    = null;
        cardsClicked = 0;
        checkWin();
    }, 700)
}

const restartGame = () => {
    window.location.reload()
}

// add event listener for each card
[...cards].forEach((card) => {
    card.addEventListener('click', (e) => {
        // if there's no main flipped card choose one and increase clicked card amount
        if (firstCard == null && cardsClicked == 0) {
            // add flipped class, for card flip animation
            card.classList.add('flipped');

            // assign the card chose to be the first one, and the one you want to match
            firstCard = card;

            // increase clicked card amount to move to next card
            cardsClicked++;

            // if first card is chosen now choose the second one
        } else if (cardsClicked == 1 && firstCard != card) {
            // grab the image of first card
            let firstCardImg = firstCard.querySelector('img');

            // grab the image of second card
            let secondCardImg = card.querySelector('img');

            // flip second card
            card.classList.add('flipped');

            // incraese cards clicked to know that second card has been clicked
            cardsClicked++;

            // check if image of first card match the image of second card
            if (firstCardImg.src == secondCardImg.src) {
                clearCard(firstCard, card)
            } else {
                clearCard(firstCard, card, false)
            }
            // if more than two cards have been clicked do nothing
        } else if (cardsClicked >= 2) return;

    });
});

window.onload = shuffleCards;