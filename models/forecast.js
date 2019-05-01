'use strict';
var pry = require('pryjs');
var fetch = require('node-fetch');



module.exports = (citystate) => {
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
        fetchLocation(citystate);
      });
    })
  };

  function fetchLocation(citystate) {
    var Location = require('../models').Location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${citystate}&key=AIzaSyBaqtLB9Q2wj1saLFU8W7AAtPf852nPg3E`)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      var locationData = jsonData.results[0].geometry.location
      var location = Location.create({
        citystate: citystate,
        latitude: locationData.lat,
        longitude: locationData.lng
      })
      .then(location => {
        fetchWeather(location.latitude, location.longitude)
      })
      .catch(error => {
        reject(error);
      });
    })
  };

  function fetchWeather(lat, lng) {
    eval(pry.it)
    fetch(`https://api.darksky.net/forecast/#{ENV['DARKSKY_KEY']}/${lat},${lng}`)
  };


  return ForecastFacade
};
