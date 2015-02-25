var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    //select all photos and make them appear on mainpage
    connection.query('SELECT * FROM photos', function(err, photos){
      if(err){ return next(err); }
      if(req.session.userId){
        //if logged in render a view which doesn't have login/register on it s
        res.render('index', {photos: photos, username: req.session.username});

      }
      else
      {
        //render a view which has buttons to login/register on them but not upload
        res.render('nologinhome', {photos: photos});
      }
    });
  }); 
});

module.exports = router;


