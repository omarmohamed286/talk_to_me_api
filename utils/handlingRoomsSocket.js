module.exports = (socket, io) => {
  socket.on("createRoom", (data) => {
    io.emit("roomCreated");
  });
};
