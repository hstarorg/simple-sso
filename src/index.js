const http = require('http');

const app = require('./app');
const config = require('./config');
const server = http.createServer(app);

process.on('uncaughtException', err => {
  console.error('uncaughtException:', err);
});

server.listen(config.port, err => {
  if (err) {
    return console.error(err);
  }
  let addr = server.address();
  console.log(`Server started, Listening on ${addr.address}:${addr.port}`);
});
