var express = require('express');
var router = express.Router();
var pry = require('pryjs');

/* POST create favorites */
router.post('/', function(req, res, next) {
  User.addFavorite(req.body)
  .then(message => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(message));
  })
  .catch(error => {
    res.status(error.status).send(JSON.stringify(error.message))
  });
});