'use strict';
var pry = require('pryjs');

module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    UserId: DataTypes.INTEGER,
  }, {});
  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User),
    Favorites.belongsTo(models.Location)
  };

  Favorites.getLocations = function(userid){
    var Favorites = this
    var Location = require('../models').Location;
    return new Promise(function (resolve, reject){
      Favorites.findAll({
        where: {UserId: userid}
      })
      .then(favorites => {
        locationArray(favorites)
        .then(locations => {
          forecastArray(locations)
          .then(forecast => {
            resolve(forecast) })
          .catch(error => {})
        })
        .catch(error => {});
      })
    })
  };

  function locationArray(favorites){
    var Location = require('../models').Location;
    return new Promise(function (resolve, reject){
      var locationArray = [];
      for (let i = 0; i < favorites.length; i++){
        let l = Location.findOne({
          where: { id: favorites[i].LocationId }
        })
        locationArray.push(l)
      }
      resolve(Promise.all(locationArray))
    })
  };

  function forecastArray(locations){
    var ForecastFacade = require('../models').ForecastFacade;
    return new Promise(function (resolve, reject){
      var locationForecastArray = [];
      for (let i = 0; i < locations.length; i++){
        var facade = new ForecastFacade(locations[i].citystate)
        let f = facade.getForecast()
        delete f.hourly;
        delete f.daily;
        locationForecastArray.push(f)
      }
      resolve(Promise.all(locationForecastArray))
    })
  };
  return Favorites;
};
