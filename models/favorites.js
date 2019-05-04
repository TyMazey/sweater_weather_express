'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    UserId: DataTypes.INTEGER
  }, {});
  Favorites.associate = function(models) {
    // associations can be defined here
  };
  return Favorites;
};