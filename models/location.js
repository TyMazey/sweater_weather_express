'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    citystate: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Favorites)
  };
  return Location;
};
