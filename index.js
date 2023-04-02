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
const isThereAWinner = (data) => {
	return 0
}

let id = "12345"

io.on("connection", (socket) => {
  
  socket.on("game", arg => {
    console.log(arg); // world
  });

  socket.on(id, arg => {
    socket.emit(arg)
  })

  socket.on("queue", arg => {
    socket.emit("game", "here is your shit: " + arg)
  });

});

io.listen(5000);
