var express = require('express');
var router = express.Router();



//render the register form
router.get('/', function(req, res){
	res.render('register');
});

router.post('/', function(req, res){
  req.getConnection(function(err, connection){
      if(err){ next(err); }
      //Insert name and pass into db from form
      connection.query('INSERT INTO users (name, password) VALUES (?)',[[req.body.username, req.body.password]],  function(err, result) {
      //redirect to mainpage to-do: add message that user succesfully registered and log user in
      res.redirect('/');
    });
  });
});

module.exports = router;
