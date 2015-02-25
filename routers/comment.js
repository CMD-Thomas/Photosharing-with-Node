var express = require('express');
var router = express.Router();

//comment is only used to put comments into the table, so redirect
router.get('/', function(req, res){
	res.redirect('/');
});

router.post('/', function(req, res){
  req.getConnection(function(err, connection){
      if(err){ next(err); }

	  //add comment in comment table and add photid so comments know which picture it is 
	  connection.query('INSERT INTO comments (comment, photo_id) VALUES (?)',[[req.body.comment, req.session.photo_id]],  function(err, result) {
	  //redirect to own picture
      res.redirect('/upload/'+req.session.photo_id);


      });
  });
});


module.exports = router;
