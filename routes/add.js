var express = require('express');
var router = express.Router();
var Base64 = require('js-base64').Base64;


// Get Homepage
router.get('/add', function(req, res){
  var account ={
      "username":"ask",
      "password":"askask"
    };
	res.render('add');

});


module.exports = router;
