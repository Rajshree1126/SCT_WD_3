const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');
const modeButton = document.getElementById('mode-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");
let playWithComputer = false;

const winConditions = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

// Initialize the board
function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
  statusText.textContent = "Player X's turn";
  currentPlayer = 'X';
  gameActive = true;
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (playWithComputer && currentPlayer === 'O' && gameActive) {
    setTimeout(computerMove, 500); // delay for better UX
  } else {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for win
function checkWin() {
  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

// Computer makes a move
function computerMove() {
  let emptyIndices = gameState
    .map((val, idx) => val === "" ? idx : null)
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = board.querySelector(`.cell[data-index='${randomIndex}']`);

  gameState[randomIndex] = 'O';
  cell.textContent = 'O';

  if (checkWin()) {
    statusText.textContent = `Player O wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
  statusText.textContent = `Player X's turn`;
}

// Reset game
resetButton.addEventListener('click', createBoard);

// Switch game mode
modeButton.addEventListener('click', () => {
  playWithComputer = !playWithComputer;
  modeButton.textContent = playWithComputer ? '2 Players Mode' : 'Play with Computer';
  createBoard();
});

// Start the game
createBoard();
