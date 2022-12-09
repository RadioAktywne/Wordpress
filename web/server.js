const frontity = require("./build/server.js").default;
const http = require("http");

const server = http.createServer(frontity);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const port = process.env.WEB_PORT || 3000;

server.listen(port);
console.log(`Server running at http://localhost:${port}`);
