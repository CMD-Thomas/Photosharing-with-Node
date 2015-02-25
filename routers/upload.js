var express = require('express');
var router = express.Router();

//check if user is loggedin else send error
router.get('/', function(req, res){
	if(req.session.userId){
  		res.render('upload');
  	}
 	else {
 		res.send('log eerst in');
 	}
});

//router with parametrs
router.get('/:id', function(req, res){
	//save photo_id in session to use later in comment
	req.session.photo_id = req.params.id;

    req.getConnection(function(err, connection){
        if(err){ return next(err); }
        //select a picture join on id so comments have the good picture
        connection.query('SELECT * FROM photos INNER JOIN comments ON photos.id = comments.photo_id WHERE photos.id = ?', [req.params.id, req.params.id], function(err, photos){
          if(err){ return next(err); } 
          //render a single picture add the photos object    
          res.render('singlePhoto', {photos: photos,   req: req});
        });
    });
});


//POST upload 
router.post('/', function(req, res){
	req.getConnection(function(err, connection){

    if(err){ next(err); }
    //beautiful nested queries.
   	connection.query('INSERT INTO photos (filename, user_id, caption) VALUES (?) ',[[req.files.imageFile.name, req.session.userId, req.body.comment_title]],  function(err, result) {
   		connection.query('INSERT INTO comments (comment, photo_id) VALUES (?)',[[req.body.comment_title, result.insertId]],  function(err, comment_result) {
     	});
  
      res.redirect('/');

    });
 	});
});


module.exports = router;

