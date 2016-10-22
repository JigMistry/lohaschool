var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login',{title:'LogIn'});
});

router.post('/login',function(req, res, next){
	console.log('i am in log in post');
	var adminUsername = "school@admin" ;
	var adminPassword = "letmein#1234$";
	var providedUsername = req.body.username;
	var providedPassword = req.body.password;
	if(adminPassword === providedPassword && adminUsername === providedUsername ){
	console.log('Authneticated user');
	req.session.user = 'admin';
	/* req.session.name = 'admin'; */
	console.log("value in session ---"+req.session.user); 
	res.redirect('/');
	}else{
	res.redirect('login');
	console.log('UnAuhtenticate User try to Access');
	}
	console.log("email-"+req.body.username+ "password is ---"+req.body.password);

});

router.get('/logout',function(req, res, next){
	delete req.session.user;
	res.redirect('login');
});

module.exports = router;
