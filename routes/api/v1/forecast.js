var express = require('express');
var router = express.Router();
var location = require('../../../models').Location;
var ForecastFacade = require('../../../models').ForecastFacade;
var pry = require('pryjs');

/* GET forecast for location */
router.get('/', function(req, res, next){
  var forecast = new ForecastFacade(req.query.location)
  forecast.getForecast()
  .then(forecast => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(forecast));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({error}));
  });
});

module.exports = router;
