var express = require('express');
var router = express.Router();



router.get('/', function(req, res){
	//destroy session log user out redirect mainpage
	req.session.destroy();
	res.redirect('/')
});



module.exports = router;