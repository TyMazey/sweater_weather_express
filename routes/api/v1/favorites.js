var express = require('express');
var router = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;


/* POST create favorites */
router.post('/', function(req, res, next) {
  User.addFavorite(req.body)
  .then(message => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({'message': message}));
  })
  .catch(error => {
    res.status(error.status).send(JSON.stringify(error.message))
  });
});

/* GET favorite locations*/
router.get('/', function(req, res, next) {
  User.getFavorites(req.body)
  .then(favorites => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(favorites);
  })
  .catch(error => {
    res.status(error.status).send(JSON.stringify(error.message));
  });
});

/* DELETE favorite location */
router.delete('/', function(req, res, next) {
  User.removeFavorite(req.body)
  .then(success => {
    res.setHeader('Content-Type', 'application/json');
    res.status(204).send();
  })
  .catch(error => {
    res.status(error.status).send(JSON.stringify(error.message));
  });
});

module.exports = router;
