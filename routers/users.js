var express = require('express');
var router = express.Router();

//to-do make profile pages and make it possible to edit profile
router.get('/', function(req, res){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    //select name of all users
    connection.query('SELECT name FROM users', function(err, users){
      if(err){ return next(err); }
        //put usernames to render 
        res.render('users', {users: users});



    });
  }); 
});


//router with parametrs
router.get('/:id', function(req, res){
	//Personal page
  
  var profilename = req.params.id;
  //console.log(req.params.id + "profielname  :" + profilename);
  req.getConnection(function(err, connection){
    if(err){return next(err);}

    connection.query('SELECT * FROM users WHERE name = ?',[profilename], function(err, users){
      res.render('profilepage', {users: users});
      console.log(err);
      console.log(users);
      //console.log(users[0].name);
    });

  });


});







module.exports = router;