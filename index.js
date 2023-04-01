const { Server } = require("socket.io");

const io = new Server({
  cors: {
    orgin: "*"
  }
});

let numConnections = 0
let id = "12345"

io.on("connection", (socket) => {
  numConnections++
  console.log("connections: " + numConnections)
  
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