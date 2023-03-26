const { Server } = require("socket.io");

const io = new Server();

let numConnections = 0

io.on("connection", (socket) => {
    console.log(socket)
    numConnections++

    socket.on("hello", (arg) => {
        console.log(arg); // world
      });

    console.log("connections: " + numConnections)
});

io.listen(3000);