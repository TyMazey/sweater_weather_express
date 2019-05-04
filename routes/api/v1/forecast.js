var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var location = require('../../../models').Location;
var ForecastFacade = require('../../../models').ForecastFacade;
var pry = require('pryjs');

/* GET forecast for location */
router.get('/', function(req, res, next){
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(response => {
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
  })
  .catch(error => {
    res.status(401).send(JSON.stringify({'Unauthorized Request': {}}));
  });
});

module.exports = router;
