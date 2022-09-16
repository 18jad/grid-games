const game = document.querySelector('.game'),
    cards = document.querySelectorAll('.card'),
    playerTurn = document.getElementById('playerTurn'),
    winningStateGrid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

let currentPlayer = 'X',
    gameRunning = true,
    gameGrid = ["", "", "", "", "", "", "", ""];

const setCurrentPlayer = (player, modify = false) => {
    // modify currentPlayer variables if needed
    if (modify) currentPlayer = player;

    // show currentPlayer on screen
    playerTurn.textContent = player;
}

setCurrentPlayer('X')

const switchPlayer = () => {
    // switch player and set currentPlayer to the one desired
    setCurrentPlayer(currentPlayer = currentPlayer == 'X' ? 'O' : 'X', true);
}

