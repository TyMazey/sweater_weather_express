'use strict';
var bcrypt = require('bcrypt');
var hat = require('hat');
var saltRounds = 10;
var pry = require('pryjs');
var fetch = require('node-fetch');


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
        .then(message => { resolve(message) })
        .catch(error => { reject({status: 500, message: error}) })
      })
      .catch(error => {
        reject({
          status: 401,
          message: 'Unauthorized Request'
        })
      });
    })
  };

  User.removeFavorite = function(request) {
    return new Promise(function (resolve, reject){
      User.findOne({
        where: { api_key: request.api_key }
      })
      .then(user => {
        user.deleteFavorite(request.location)
        .then(success => { resolve() })
        .catch(error => { reject({status: 500, message: error}) })
      })
      .catch(error => {
        reject({
          status: 401,
          message: 'Unauthorized Request'
        })
      });
    })
  };

  User.getFavorites = function(request) {
    return new Promise(function (resolve, reject){
      User.findOne({
        where: { api_key: request.api_key }
      })
      .then(user => {
        user.listFavorites()
        .then(favorites => { resolve(favorites) })
        .catch(error => { reject({status: 500, message: error})})
      })
      .catch(error => {
        reject({
          status: 401,
          message: 'Unauthorized Request'
        })
      });
    })
  };

  User.prototype.listFavorites = function() {
    var Favorites = require('../models').Favorites;
    var ForecastFacade = require('../models').ForecastFacade;
    var user = this;
    return new Promise(function (resolve, reject){
      Favorites.getLocations(user.id)
      .then(favorites => {
        resolve(favorites);
      })
      .catch(error => { reject(error) });
    })
  };

  User.prototype.deleteFavorite = function(location) {
    var Location = require('../models').Location;
    var Favorites = require('../models').Favorites;
    var user = this;
    var location = location;
    return new Promise(function (resolve, reject){
      Location.findOne({
        where: {citystate: location}
      })
      .then(locationObject => {
        Favorites.destroy({
          where: {
            UserId: user.id,
            LocationId: locationObject.id
          }
        })
        .then(success => { resolve() })
        .catch(error => { reject(error) });
      })
      .catch(error => {
        reject(error)
      });
    })
  };

  User.prototype.createFavorite = function(location) {
    var Location = require('../models').Location;
    var Favorites = require('../models').Favorites;
    var user = this
    var location = location
    return new Promise(function (resolve, reject){
      Location.findOne({
        where: { citystate: location}
      })
      .then(location => {
        Favorites.create({
          UserId: this.id,
          LocationId: location.id
        })
        .then(favorite => {
          resolve(`${location.citystate} has been added to your favorites`)
        })
        .catch(error => reject(error))
      })
      .catch(error => {
        fetchLocation(location)
        .then(location => {
          Favorites.create({
            UserId: user.id,
            LocationId: location.id
          })
          .then(favorite => {
            resolve(`${location.citystate} has been added to your favorites`)
          })
          .catch(error => reject(error));
        })
        .catch(error => reject(error))
      });
    })
  };

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
          resolve(location);
        })
        .catch(error => {
          reject(error);
        });
      })
    })
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
