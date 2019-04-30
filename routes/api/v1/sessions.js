var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var pry = require('pryjs');

/* POST login user */
router.post('/', function(req, res, next){
  User.findOne({
    where: {
      email: req.body.email
    }
  }).validateLogin(req.body.password)
  .then(user => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(user));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});


module.exports = router;
