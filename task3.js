const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  checkWinner();
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      statusText.textContent = `${currentPlayer} Wins! 🎉`;

      // 🎯 Highlight winner cells
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      // ❌ Disable all cells
      document.getElementById('board').classList.add("disabled");
      return;
    }
  }

  if (!board.includes("")) {
    isGameActive = false;
    statusText.textContent = "Match Draw!";
    document.getElementById('board').classList.add("disabled");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winner");
  });

  document.getElementById('board').classList.remove("disabled");
}

// 👇 Start it
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetGame();
