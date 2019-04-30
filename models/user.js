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
    // associations can be defined here
  };

  // class methods
  User.validateNew = function(body) {
    if (body.password === body.password_confirmation) {
      var user = User.create({
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        api_key: hat()
      })
    }
    return user
  };

  /* lat line */
  return User;
};
