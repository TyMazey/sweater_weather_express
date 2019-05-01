'use strict';
var pry = require('pryjs');
var fetch = require('node-fetch');



module.exports = () => {
  const ForecastFacade = function(params){
    this.citystate = params
  };

  ForecastFacade.prototype.getLocation = function(){
    var Location = require('../models').Location;
    var citystate = this.citystate
    return new Promise(function(resolve, reject){
      Location.findOne({
        where: {
          citystate: citystate
        }
      })
      .then(location => {
        fetchWeather(location.latitude, location.longitude);
      })
      .catch(error => {
        fetchLocation(citystate, reject);
      });
    })
  };

  function fetchLocation(citystate, reject) {
    var Location = require('../models').Location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${citystate}&key=AIzaSyBaqtLB9Q2wj1saLFU8W7AAtPf852nPg3E`)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      var locationData = jsonData.results[0].geometry.location
      Location.create({
        citystate: citystate,
        latitude: locationData.lat,
        longitude: locationData.lng
      })
      .then(location => {
        fetchWeather(location.latitude, location.longitude)
      })
      .catch(error => {
        return reject(error);
      });
    })
  };

  function fetchWeather(lat, lng) {
    fetch(`https://api.darksky.net/forecast/b0d2ec981f7d8e69000e14dbf6f264c4/${lat},${lng}`)
    .then(function(response){
      return response.json();
    })
    .then(function(jsonData){
      /*have json object with current weather data at this point*/
    })
  };


  return ForecastFacade
};
