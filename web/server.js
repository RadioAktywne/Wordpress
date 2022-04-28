const frontity = require("./build/server.js").default;
const http = require("http");

const server = http.createServer(frontity);

server.listen(3000);
console.log("Listening on port 3000");
