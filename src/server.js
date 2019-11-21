require("dotenv/config");

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

require("./socket").configureSocket(server);
require("./job/index");

server.listen(process.env.PORT);
