// ======== VARIABLES ========
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Jugadores guardados en sessionStorage
const player1 = sessionStorage.getItem("player1") || "Jugador1";
const player2 = sessionStorage.getItem("player2") || "Jugador2";

// ======== ESTADÍSTICAS ========
function actualizarEstadisticas(usuario, resultado) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === usuario);

  if (user) {
    if (!user.stats) user.stats = { victorias: 0, derrotas: 0, empates: 0 };

    if (resultado === "victoria") user.stats.victorias++;
    if (resultado === "derrota") user.stats.derrotas++;
    if (resultado === "empate") user.stats.empates++;

    localStorage.setItem("users", JSON.stringify(users));
  }
}

function manejarVictoria(ganador) {
  if (ganador === "X") {
    actualizarEstadisticas(player1, "victoria");
    actualizarEstadisticas(player2, "derrota");
    alert(`${player1} (X) ha ganado 🎉`);
  } else if (ganador === "O") {
    actualizarEstadisticas(player2, "victoria");
    actualizarEstadisticas(player1, "derrota");
    alert(`${player2} (O) ha ganado 🎉`);
  }
}

function manejarEmpate() {
  actualizarEstadisticas(player1, "empate");
  actualizarEstadisticas(player2, "empate");
  alert("¡Es un empate 🤝!");
}

// ======== FUNCIONES PRINCIPALES ========
function makeMove(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  document.getElementById("b" + (index + 1)).innerText = currentPlayer;

  if (checkWinner(board, currentPlayer)) {
    manejarVictoria(currentPlayer);
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    manejarEmpate();
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Si es turno de la máquina
  if (currentPlayer === "O") {
    let mode = document.getElementById("gameMode").value;
    if (mode === "pvc") {
      machineMove(); // fácil
    } else if (mode === "pvcmid") {
      mediumMachineMove(); // medio
    } else if (mode === "pvchard") {
      hardMachineMove(); // difícil con Minimax
    }
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  for (let i = 1; i <= 9; i++) {
    document.getElementById("b" + i).innerText = "";
  }
}

// ======== CHECK WINNER ========
function checkWinner(board, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

// ======== MÁQUINA FÁCIL ========
function machineMove() {
  let emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(move);
}

// ======== MÁQUINA MEDIO ========
function mediumMachineMove() {
  // Regla especial: si jugador puso en 0 y 6, la máquina pone en 3
  if (board[0] === "X" && board[6] === "X" && board[3] === "") {
    makeMove(3);
    return;
  }

  // Regla especial: si jugador puso en 2 y 8, la máquina pone en 5
  if (board[2] === "X" && board[8] === "X" && board[5] === "") {
    makeMove(5);
    return;
  }

  // Regla especial: si jugador puso en 1 y 7, la máquina pone en 4
  if (board[1] === "X" && board[7] === "X" && board[4] === "") {
    makeMove(4);
    return;
  }

  // Si no aplica ninguna regla → juega aleatorio
  machineMove();
}

// ======== MÁQUINA DIFÍCIL (MINIMAX) ========
function hardMachineMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O"; // máquina es O
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  makeMove(move);
}

function minimax(newBoard, depth, isMaximizing) {
  if (checkWinner(newBoard, "O")) return 1;
  if (checkWinner(newBoard, "X")) return -1;
  if (newBoard.every(cell => cell !== "")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "X";
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
