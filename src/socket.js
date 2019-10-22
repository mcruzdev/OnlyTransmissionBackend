const socketio = require("socket.io");
let io = {};

const configure = server => {
  io = socketio(server);
  io.origins("*:*");
  io.on("connect", () => console.log("onconnection"));
};

module.exports = {
  configureSocket: server => configure(server),
  emit: (message, data) => {
    io.emit(message, data);
  }
};
