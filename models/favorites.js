'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    UserId: DataTypes.INTEGER,
  }, {});
  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User),
    Favorites.belongsTo(models.Location)
  };

  Favorites.getLocation = function(userid){
    var Favorites = this
    var Location = require('../models').Location;
    var ForecastFacade = require('../models').ForecastFacade;
    return new Promise(function (resolve, reject){
      this.findAll({
        where: {UserId: userid}
      })
      .then(favorites => {
        Location.findAll({
          where: { id: favorites }
        })
        .then(locations => {
          var locationForecast = {};

        })
        .catch(error => { reject(error) });
      })
      .catch(error => { reject(error) });
    })
  };
  return Favorites;
};
