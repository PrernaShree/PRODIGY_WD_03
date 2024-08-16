document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                message.textContent = `${currentPlayer} Wins!`;
                cells[a].style.backgroundColor = 'lightgreen';
                cells[b].style.backgroundColor = 'lightgreen';
                cells[c].style.backgroundColor = 'lightgreen';
                return true;
            }
        }
        if (!gameState.includes('')) {
            message.textContent = "It's a Draw!";
            return true;
        }
        return false;
    };

    const handleClick = (event) => {
        const index = event.target.dataset.index;
        if (gameState[index] || checkWinner()) return;
        
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const resetGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#fff';
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});