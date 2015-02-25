var express = require('express');
var router = express.Router();



//render login form
router.get('/', function(req, res){
  res.render('login');
});


//POST login 
router.post('/', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  req.getConnection(function(err, connection){
    if(err){ next(err); }
    //select user who has the correct username and password
    connection.query("SELECT * FROM users WHERE name = ? AND password = ?", [username, password], function(err, records){
      if(err){ next(err); }
      //only one user has a match so 0
      if(records.length > 0){
        //put it in a session for later use, id is used for photos/comments while username is used to check whether
        //a user is logged in ot not
        req.session.userId = records[0].id;
        req.session.username = records[0].name;
        //redirecting user after a succesful login visual cue is giving on mainpage
        res.redirect("/");

      } 
      //this data isn't used yet to-do: use it in future to give user knowledge he failed
      else {
        var data = {
          req: req,
          error: "Oh noes!"
        }
        //render login again after failure
        res.render("login");
      }
    });
  });
});

module.exports = router;
