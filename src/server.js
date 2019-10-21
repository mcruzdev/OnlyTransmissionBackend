const app = require("./app");
require("./job/index");

const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log("transmission_only_backend on at port " + port);
});
