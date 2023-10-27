const frontity = require("./build/server.js").default;
const http = require("http");

const server = http.createServer(frontity);

const port = 20003;

server.listen(port);
console.log(`Server running at http://localhost:${port}`);
