'use strict';
var bcrypt = require('bcrypt');
var hat = require('hat');
var saltRounds = 10;
var pry = require('pryjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Favorites)
  };

  // class methods
  User.validateNew = function(body) {
    if (body.password === body.password_confirmation) {
      var user = User.create({
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        api_key: hat()
      })
      return user
    }
    else {
      reject(error)
    }
  };

  User.validateLogin = function(body) {
    return new Promise(function (resolve, reject){
      User.findOne({
        where: {
          email: body.email
        }
      })
      .then(user => {
        resolve(validatePassword(body, user))
      })
      .catch(error => {
        reject(error);
      });
    })
  };

  User.addFavorite = function(request) {
    return new Promise(function (resolve, reject){
      User.findOne({
        where: { api_key: request.api_key }
      })
      .then(user => {
        user.createFavorite(request.location)
      })
      .catch(error => {
        reject({
          status: 401,
          message: 'Unauthorized Request'
        })
      });
    })
  };

  User.prototype.createFavorite = function(location) {
    var Location = require('./location').Location;
    var Favorites = require('./favorites').Favorites;
    Location.findOne({
      where: { citystate: location}
    })
    .then(location => {
      Favorites.create({
        UserId: this.id,
        LocationId: location.id
      })
    })
    .catch(error => {
      //fetch a new location object
    });
  };

  function validatePassword(body, user) {
    return new Promise(function (resolve, reject){
      if (bcrypt.compareSync(body.password, user.password)) {
        resolve(user);
      }
      else {
        reject(error);
      }
    })
  };

  /* lat line */
  return User;
};
