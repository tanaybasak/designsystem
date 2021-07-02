/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const ip = require('ip').address();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=7776000; includeSubdomains'
  );
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// set up a config object
const serverConfig = {
  key: fs.readFileSync(
    `./ssl-certificate/${ip === '10.115.95.40' ? `server` : `server`}.key`
  ),
  cert: fs.readFileSync(
    `./ssl-certificate/${ip === '10.115.95.40' ? `server` : `server`}.cert`
  )
};

if (ip !== '10.134.37.8') {
  http.createServer(app).listen(8000, function (err) {
    if (err) {
      console.error(err);
    }
  });
} else {
  https.createServer(serverConfig, app).listen(8000, function (err) {
    if (err) {
      console.error(err);
    }
  });

  http.createServer(function (req, res) {
    // 301 redirect (reclassifies google listings)
    res.writeHead(301, {
      Location: 'https://' + req.headers.host + req.url
    });
    res.end();
  });
}
