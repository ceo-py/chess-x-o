var winner = false;
function selectFields() {
  return {
    playerOne: {
      input: document.querySelector("#player1"),
      name: document.querySelector("#player1-name"),
      score: document.querySelector("#score1"),
    },
    playerTwo: {
      input: document.querySelector("#player2"),
      name: document.querySelector("#player2-name"),
      score: document.querySelector("#score2"),
    },
    resetBtn: document.querySelector("#resetButton"),
    newGameBtn: document.querySelector("#newGame"),
    turnIndicator: document.querySelector("#turn-indicator"),
    boardCells: Array.from(document.querySelectorAll("#board div")).reduce(
      (matrix, cell, index) => {
        const row = Math.floor(index / 3);
        if (!matrix[row]) matrix[row] = [];
        matrix[row][index % 3] = cell;
        return matrix;
      },
      []
    ),
  };
}

function writePlayerName(player) {
  player.input.addEventListener("input", () => {
    player.name.textContent = player.input.value;
  });
}

function checkForWin(currentCell, board) {
  const [row, col] = [
    currentCell.getAttribute("data-row"),
    currentCell.getAttribute("data-col"),
  ];
  const rowCheck = board[row].every(
    (cell) => cell.textContent === currentCell.textContent
  );
  const colCheck = board[col].every(
    (cell) => cell.textContent === currentCell.textContent
  );
  const leftDiagonal = board.every(
    (row, index) => row[index].textContent === currentCell.textContent
  );
  const rightDiagonal = board.every(
    (row, index) =>
      row[board.length - index - 1].textContent === currentCell.textContent
  );
  return [rowCheck, colCheck, leftDiagonal, rightDiagonal].some(
    (check) => check
  );
}

function isWinner(players, cell, board, turnIndicator) {
  if (cell.textContent !== "") return;
  const currentPlayer = players.shift();
  cell.textContent = currentPlayer.input.getAttribute("data-content");
  winner = checkForWin(cell, board);
  turnIndicator.textContent = `${players[0].name.textContent}'s turn`;
  if (winner) {
    turnIndicator.textContent = `${currentPlayer.name.textContent} wins!`;
    currentPlayer.score.textContent =
      parseInt(currentPlayer.score.textContent) + 1;
  } else {
    players.push(currentPlayer);
  }
}

function addCellFunctionality(fields, players) {
  fields.boardCells.flat().forEach((cell) => {
    cell.addEventListener("click", () => {
      if (winner) return;
      isWinner(players, cell, fields.boardCells, fields.turnIndicator);
    });
  });
}

function seeChess() {
  const htmlFields = selectFields();
  const players = [htmlFields.playerOne, htmlFields.playerTwo];
  htmlFields.resetBtn.addEventListener("click", () => window.location.reload());
  htmlFields.newGameBtn.addEventListener("click", () => {
    winner = false;
    htmlFields.boardCells.flat().forEach((cell) => {
      cell.textContent = "";
    });
  });
  players.forEach((player) => writePlayerName(player));
  addCellFunctionality(htmlFields, players);
}

seeChess();
