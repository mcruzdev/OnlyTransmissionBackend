const app = require("./app");
const { configureSocket } = require("./socket");

require("./job/index");

const http = require("http");

const server = http.createServer(app);
const port = process.env.PORT || 3333;

configureSocket(server);

server.listen(port, () => {
  console.log("transmission_only_backend on at port " + port);
});
