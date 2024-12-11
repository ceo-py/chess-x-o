const gameState = {
  winner: false,
  moves: 0,
  players: []
};

const WINNING_PATTERNS = [
  // Rows
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]], 
  [[2,0], [2,1], [2,2]],
  // Columns
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  // Diagonals
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]]
];

function initGame() {
  const elements = {
    board: document.querySelector('#board'),
    cells: Array.from(document.querySelectorAll('.cell')),
    turnIndicator: document.querySelector('#turn-indicator'),
    resetBtn: document.querySelector('#resetButton'),
    newGameBtn: document.querySelector('#newGame'),
    players: [
      {
        input: document.querySelector('#player1'),
        name: document.querySelector('#player1-name'), 
        score: document.querySelector('#score1'),
        symbol: 'X'
      },
      {
        input: document.querySelector('#player2'),
        name: document.querySelector('#player2-name'),
        score: document.querySelector('#score2'), 
        symbol: 'O'
      }
    ]
  };

  gameState.players = elements.players;
  
  setupEventListeners(elements);
}

function checkWinner(board, symbol) {
  return WINNING_PATTERNS.some(pattern => 
    pattern.every(([row, col]) => 
      board[row * 3 + col].textContent === symbol
    )
  );
}

function handleMove(elements, cell) {
  if (gameState.winner || cell.textContent) return;

  const currentPlayer = gameState.players[0];
  cell.textContent = currentPlayer.symbol;
  gameState.moves++;

  if (checkWinner(elements.cells, currentPlayer.symbol)) {
    gameState.winner = true;
    currentPlayer.score.textContent = parseInt(currentPlayer.score.textContent) + 1;
    elements.turnIndicator.textContent = `${currentPlayer.name.textContent} wins!`;
    return;
  }

  if (gameState.moves === 9) {
    elements.turnIndicator.textContent = 'Tie game!';
    return;
  }

  gameState.players.push(gameState.players.shift());
  elements.turnIndicator.textContent = `${gameState.players[0].name.textContent}'s turn`;
}

function setupEventListeners(elements) {
  elements.cells.forEach(cell => 
    cell.addEventListener('click', () => handleMove(elements, cell))
  );

  elements.players.forEach(player => 
    player.input.addEventListener('input', 
      () => player.name.textContent = player.input.value)
  );

  elements.resetBtn.addEventListener('click', () => location.reload());
  elements.newGameBtn.addEventListener('click', () => resetGame(elements));
}

function resetGame(elements) {
  gameState.winner = false;
  gameState.moves = 0;
  elements.cells.forEach(cell => cell.textContent = '');
  gameState.players = elements.players.slice(0,2);
  elements.turnIndicator.textContent = `${elements.players[0].name.textContent}'s turn`;
}

initGame();





// solution 2
// const gameState = {
//   winner: false,
//   moves: 0,
//   players: [],
//   currentPlayerIndex: 0,
//   get currentPlayer() {
//     return this.players[this.currentPlayerIndex];
//   },
//   switchPlayer() {
//     this.currentPlayerIndex = 1 - this.currentPlayerIndex;
//   },
//   reset() {
//     this.winner = false;
//     this.moves = 0;
//     this.currentPlayerIndex = 0;
//   }
// };

// // Winning patterns for rows, columns, and diagonals
// const WINNING_PATTERNS = [
//   // Rows
//   [[0, 0], [0, 1], [0, 2]],
//   [[1, 0], [1, 1], [1, 2]],
//   [[2, 0], [2, 1], [2, 2]],
//   // Columns
//   [[0, 0], [1, 0], [2, 0]],
//   [[0, 1], [1, 1], [2, 1]],
//   [[0, 2], [1, 2], [2, 2]],
//   // Diagonals
//   [[0, 0], [1, 1], [2, 2]],
//   [[0, 2], [1, 1], [2, 0]]
// ];

// // Initialize the game and set up DOM elements
// function initGame() {
//   const elements = {
//     board: document.querySelector('#board'),
//     cells: Array.from(document.querySelectorAll('.cell')),
//     turnIndicator: document.querySelector('#turn-indicator'),
//     resetBtn: document.querySelector('#resetButton'),
//     newGameBtn: document.querySelector('#newGame'),
//     players: [
//       {
//         input: document.querySelector('#player1'),
//         name: document.querySelector('#player1-name'), 
//         score: document.querySelector('#score1'),
//         symbol: 'X'
//       },
//       {
//         input: document.querySelector('#player2'),
//         name: document.querySelector('#player2-name'),
//         score: document.querySelector('#score2'), 
//         symbol: 'O'
//       }
//     ]
//   };

//   // Initialize game state
//   gameState.players = elements.players;

//   // Set up event listeners
//   setupEventListeners(elements);
// }

// // Check if a player has won
// function checkWinner(board, symbol) {
//   return WINNING_PATTERNS.some(pattern =>
//     pattern.every(([row, col]) => 
//       board[row * 3 + col].textContent === symbol
//     )
//   );
// }

// // Handle a move in the game
// function handleMove(elements, cell) {
//   if (gameState.winner || cell.textContent) return;

//   const currentPlayer = gameState.currentPlayer;
//   cell.textContent = currentPlayer.symbol;
//   gameState.moves++;

//   if (checkWinner(elements.cells, currentPlayer.symbol)) {
//     gameState.winner = true;
//     currentPlayer.score.textContent = parseInt(currentPlayer.score.textContent) + 1;
//     elements.turnIndicator.textContent = `${currentPlayer.name.textContent} wins!`;
//     return;
//   }

//   if (gameState.moves === 9) {
//     elements.turnIndicator.textContent = 'Tie game!';
//     return;
//   }

//   // Switch players after a move
//   gameState.switchPlayer();
//   elements.turnIndicator.textContent = `${gameState.currentPlayer.name.textContent}'s turn`;
// }

// // Set up event listeners for game interactions
// function setupEventListeners(elements) {
//   // Event listener for clicks on board cells
//   elements.board.addEventListener('click', (e) => {
//     if (e.target.classList.contains('cell')) {
//       handleMove(elements, e.target);
//     }
//   });

//   // Event listeners for player name inputs
//   elements.players.forEach(player => 
//     player.input.addEventListener('input', () => {
//       player.name.textContent = player.input.value;
//     })
//   );

//   // Event listeners for reset and new game buttons
//   elements.resetBtn.addEventListener('click', resetGame.bind(null, elements));
//   elements.newGameBtn.addEventListener('click', newGame.bind(null, elements));
// }

// // Reset the current game (without resetting the player scores)
// function resetGame(elements) {
//   gameState.reset();
//   elements.cells.forEach(cell => cell.textContent = '');
//   elements.turnIndicator.textContent = `${elements.players[0].name.textContent}'s turn`;
// }

// // Start a new game (reset the game and scores)
// function newGame(elements) {
//   gameState.reset();
//   elements.players.forEach(player => player.score.textContent = '0');
//   elements.cells.forEach(cell => cell.textContent = '');
//   elements.turnIndicator.textContent = `${elements.players[0].name.textContent}'s turn`;
// }

// // Initialize the game on page load
// initGame();




// solution 3
// var winner = false;
// var moves = 0;
// function selectFields() {
//   return {
//     playerOne: {
//       input: document.querySelector("#player1"),
//       name: document.querySelector("#player1-name"),
//       score: document.querySelector("#score1"),
//     },
//     playerTwo: {
//       input: document.querySelector("#player2"),
//       name: document.querySelector("#player2-name"),
//       score: document.querySelector("#score2"),
//     },
//     resetBtn: document.querySelector("#resetButton"),
//     newGameBtn: document.querySelector("#newGame"),
//     turnIndicator: document.querySelector("#turn-indicator"),
//     boardCells: Array.from(document.querySelectorAll("#board div")).reduce(
//       (matrix, cell, index) => {
//         const row = Math.floor(index / 3);
//         if (!matrix[row]) matrix[row] = [];
//         matrix[row][index % 3] = cell;
//         return matrix;
//       },
//       []
//     ),
//   };
// }

// function writePlayerName(player) {
//   player.input.addEventListener("input", () => {
//     player.name.textContent = player.input.value;
//   });
// }

// function checkForWin(currentCell, board) {
//   const [row, col] = [
//     currentCell.getAttribute("data-row"),
//     currentCell.getAttribute("data-col"),
//   ];
//   const rowCheck = board[row].every(
//     (cell) => cell.textContent === currentCell.textContent
//   );
//   const colCheck = board[row].every(
//     (_, i) => board[i][col].textContent === currentCell.textContent
//   );
//   const leftDiagonal = board.every(
//     (row, index) => row[index].textContent === currentCell.textContent
//   );
//   const rightDiagonal = board.every(
//     (row, index) =>
//       row[board.length - index - 1].textContent === currentCell.textContent
//   );
//   return [rowCheck, colCheck, leftDiagonal, rightDiagonal].some(
//     (check) => check
//   );
// }

// function isWinner(players, cell, board, turnIndicator) {
//   moves++;
//   if (cell.textContent !== "") return;
//   const currentPlayer = players.shift();
//   cell.textContent = currentPlayer.input.getAttribute("data-content");
//   winner = checkForWin(cell, board);
//   turnIndicator.textContent = `${players[0].name.textContent}'s turn`;
//   if (winner) {
//     turnIndicator.textContent = `${currentPlayer.name.textContent} wins!`;
//     currentPlayer.score.textContent =
//       parseInt(currentPlayer.score.textContent) + 1;
//   }
//   players.push(currentPlayer);
//   if (moves === 9 && !winner) {
//     turnIndicator.textContent = `Tie game!`;
//   }
// }

// function addCellFunctionality(fields, players) {
//   fields.boardCells.flat().forEach((cell) => {
//     cell.addEventListener("click", () => {
//       if (winner) return;
//       isWinner(players, cell, fields.boardCells, fields.turnIndicator);
//     });
//   });
// }

// function seeChess() {
//   const htmlFields = selectFields();
//   const players = [htmlFields.playerOne, htmlFields.playerTwo];
//   htmlFields.resetBtn.addEventListener("click", () => window.location.reload());
//   htmlFields.newGameBtn.addEventListener("click", () => {
//     winner = false;
//     moves = 0;
//     htmlFields.boardCells.flat().forEach((cell) => {
//       cell.textContent = "";
//     });
//     players.length = 0;
//     players.push(htmlFields.playerOne, htmlFields.playerTwo);
//     htmlFields.turnIndicator.textContent = `${htmlFields.playerOne.name.textContent}'s turn`;
//   });
//   players.forEach((player) => writePlayerName(player));
//   addCellFunctionality(htmlFields, players);
// }

// seeChess();
