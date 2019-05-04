'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {});
  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User),
    Favorites.belongsTo(models.Location)
  };
  return Favorites;
};
