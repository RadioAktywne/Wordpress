const frontity = require("./build/server.js").default;
const http = require("http");

const server = http.createServer(frontity);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Frontity is not maintained anymore and it uses old cryptographic libraries
// They are not secure anymore, but we can't update them as their versions are constrained
// So if we want to run with newer Node.js versions, we need to use the legacy provider
process.env.NODE_OPTIONS = "--openssl-legacy-provider";

const port = process.env.WEB_PORT || 3000;

server.listen(port);
console.log(`Server running at http://localhost:${port}`);
