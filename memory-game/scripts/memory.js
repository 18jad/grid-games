// select all cards
const cards = document.querySelectorAll('.card');
// select game frame
const game = document.querySelector('.game');

// condtion check variables
let firstCard = null;
let cardsClicked = 0;
let cardsLeft = 12;

const checkWin = () => {
    const checkCards = cardsLeft == 0;
    if (checkCards) {
        setTimeout(() => {

            game.style.display = "block";
            game.innerHTML = "<div class='win'><h1>YOU WON</h1></div>";
        }, 700)
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
        firstCard = null;
        cardsClicked = 0;
        checkWin();
    }, 700)
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