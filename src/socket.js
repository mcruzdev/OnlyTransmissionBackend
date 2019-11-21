const socketio = require("socket.io");
let io = null;

const configure = server => {
  io = socketio(server);
  io.origins("*:*");
  io.on("connect", () => console.log("onconnection"));
};

module.exports = {
  configureSocket: server => configure(server),
  emit: (message, data) => {
    if (io) {
      io.emit(message, data);
    } else {
      throw new Error("Socket not configured");
    }
  }
};