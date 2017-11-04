'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const async = require('async');

require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


app.post('/geoCode', (req, res, next) => {
  const elevations = [];
  const key = process.env.KEY;
  const locations = req.body.locations;

  function search() {
    return new Promise((resolve, reject) => {
      const elevations = locations.map(city => {
        // build first url with key and location data
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${key}`;

        return fetch(url).then(res => res.json()).then(geoCode => {
          // take values for latitude and longitude and build url with them
          const lat = geoCode.results[0].geometry.location.lat;
          const lng = geoCode.results[0].geometry.location.lng;
          const url2 = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${key}`;
          return fetch(url2).then(response => response.json()).then(elev => {
            const elevation = elev.results[0].elevation;
            return [city, elevation];
          });
        });
      });

      setTimeout(function(){
        resolve(elevations);
      }, 1000);
    });
  }

  search().then((elevations) => {
    console.log(elevations.map(e => e.promise));
    res.send(JSON.stringify(elevations));
  });
});

app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
