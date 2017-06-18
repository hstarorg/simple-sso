const fs = require('fs');
const path = require('path');
const http = require('http');
const spdy = require('spdy');

const app = require('./app');
const config = require('./config');
// const server = http.createServer(app);
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.pem'))
};
let server;
if (config.useHttp2) {
  server = spdy.createServer(options, app);
} else {
  server = http.createServer(app);
}

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


