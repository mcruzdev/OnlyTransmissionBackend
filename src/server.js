const app = require("./app");
require("./job/index");

const http = require("http");
const server = http.createServer(app);

server.listen(process.env.PORT || 3333, () => {
  console.log("transmission_only_backend:::on");
});
