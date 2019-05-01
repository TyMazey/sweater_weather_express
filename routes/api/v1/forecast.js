var express = require('express');
var router = express.Router();
var location = require('../../../models').Location;
var ForecastFacade = require('../../../models').ForecastFacade;
var pry = require('pryjs');

/* GET forecast for location */
router.get('/', function(req, res, next){
  var forecast = new ForecastFacade(req.query.location)
  forecast.getLocation();
});

module.exports = router;
