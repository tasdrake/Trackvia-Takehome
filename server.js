'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.post('/geoCode', (req, res) => {
  // const lat = req.body.lat;
  // const lng = req.body.lng;
  console.log(req.body);
  res.send('success');
});
app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
