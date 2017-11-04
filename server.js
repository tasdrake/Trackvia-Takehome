'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/geoCode', (req, res) => {
  const elevations = [];
  const key = process.env.KEY;
  const locations = req.body.locations;

  locations.map(city => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${key}`;

    fetch(url).then(res => res.json()).then(geoCode => {
      const lat = geoCode.results[0].geometry.location.lat;
      const lng = geoCode.results[0].geometry.location.lng;
      const url2 = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${key}`;


      fetch(url2).then(response => response.json()).then(elev => {
        const elevations = this.state.elevations;
        const elevation = elev.results[0].elevation;
        elevations.push([city, elevation]);
      });
    });
  });
  console.log(elevations);
  res.send(elevations);
});
app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
