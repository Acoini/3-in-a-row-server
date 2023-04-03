const { Server } = require("socket.io");

const io = new Server({
  cors: {
    orgin: "*"
  }
});

/**
 * isThereAWinner returns true if there is a winner in the match
 * other ways returns false.
 *
 * This receives memoizated data and counts every contained node
 * if the count is greater than 2, it means there is a winner returning
 * true, any ways it returns false.
 * */
const checkForWinner = (data) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
    [0, 4, 8], [2, 4, 6]                // Diagonals
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
}

// Current game board state
let gameState = ['', '', '', '', '', '', '', '', ''];

io.on("connection", (socket) => {
  console.log('New client connected');

  // Send current game state to player who just connected
  socket.emit('gameState', gameState);

  // Listen for player move events
  socket.on('move', (data) => {
    // Update game state with player's move
    gameState[data.index] = data.symbol;

    // Broadcast updated game state to other player
    socket.broadcast.emit('gameState', gameState);

    // Check for winner
    const winner = checkForWinner(gameState);
    if (winner) {
      io.emit('winner', winner);
    }
  });
});

io.listen(5000);
