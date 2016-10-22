var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/gallery', function(req, res, next) {
console.log('calling gallery');
  res.render('gallery', { title: 'Gallary' });
});
router.get('/contact', function(req, res, next) {
	console.log('calling contact');
  res.render('contact', { title: 'Contact' });
});

router.get('/about', function(req, res, next) {
  console.log('calling about');
  res.render('about', { title: 'AboutUs' });
});

module.exports = router;
