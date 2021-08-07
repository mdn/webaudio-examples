const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const serveIndex = require('serve-index');

const PROTOCOL = process.env.PROTOCOL || 'http'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || (PROTOCOL === 'https' ? 443 : 8000)
const URL = PROTOCOL + '://' + HOST + (PORT !== 80 ? ':' + PORT : '')

const sslOpts = PROTOCOL === 'https' ? {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT),
} : {};

const options = PROTOCOL === 'https' ? sslOpts : {};
const httpServer = PROTOCOL === 'https' ? https : http

app.use(express.static('./'));
app.use('/', serveIndex('./'));

// append livereload
app.use((_, res, next) => {
  res.send(`
  <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
  `);
  next();
});

httpServer.createServer(options, app).listen(PORT, HOST, function(){
  console.log("Express server listening on %s", URL);
});