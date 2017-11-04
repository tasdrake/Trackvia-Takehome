'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use('/elevation', (req, res, next) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  console.log(lat, lng);
  res.send('success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
