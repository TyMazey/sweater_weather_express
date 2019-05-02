'use strict';
var pry = require('pryjs');
var fetch = require('node-fetch');



module.exports = () => {
  const ForecastFacade = function(params){
    this.citystate = params
  };

  /* Instance Methods */

  ForecastFacade.prototype.getForecast = function(){
    var Location = require('../models').Location;
    var citystate = this.citystate
    return new Promise(function(resolve, reject){
      Location.findOne({
        where: {
          citystate: citystate
        }
      })
      .then(location => {
        fetchForecast(location.latitude, location.longitude)
        .then(forecast => { resolve(forecast); })
        .catch(error => { reject(error); })
      })
      .catch(error => {
        fetchLocation(citystate)
        .then(forecast => { resolve(forecast); })
        .then(error => { reject(error); })
      });
    })
  };

  /* Private Methods */

  function fetchLocation(citystate) {
    var Location = require('../models').Location;
    return new Promise(function(resolve, reject){
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${citystate}&key=${process.env.GOOGLE_KEY}`)
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
          fetchForecast(location.latitude, location.longitude)
          .then(forecast => { resolve(forecast); })
          .catch(error => { reject(error); })
        })
        .catch(error => {
          reject(error);
        });
      })
    })
  };

  function fetchForecast(lat, lng) {
    var Forecast = require('./forecast')
    return new Promise(function(resolve, reject){
      fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonData){
        var forecastData = new Forecast(this.citystate, jsonData)
        forecastData.setForecast()
        resolve(forecastData)
      })
      .catch(error => {
        reject(error)
      });
    })
  };


  return ForecastFacade
};
