var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var crypto = require("crypto");
var path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: './public/images/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })


router.get('/event', function(req, res, next) {
	var examsAndResults ;
	var extraCurricular ;
	var others ;
	
	Event.getAllEvents(function(err, events){
		if(err) console.log('Some Error Occur in Geting all events');
		if(err) throw err;
		res.render('event',{
			"allEvents" : events ,
			title: 'Events'
		});
	
	});
	
});

router.post('/delete',function(req, res, next){
	console.log("event to be delted is "+req.body.eventToDelete);
	var eventId = req.body.eventToDelete;
	Event.deleteEvent(eventId,function(err,event){
		if(err) console.log('Error occur during deleting the event');
		if(err) throw err;
		console.log('Event deleted Successfully');
	
	});
	Event.getAllEvents(function(err, events){
		if(err) console.log('------------');
		if(err) throw err;
		res.render('event',{
			"allEvents" : events ,
			title: 'Events'
		});
	
	});
});

router.post('/addevent', upload.single('eventFile'), function(req, res, next) {

	var eventName = req.body.eventName.toUpperCase();
	var eventDescription = req.body.eventDescription;
	var eventCategory = req.body.category;

	
	if(req.file){
	console.log('Uploading file');
	//all file info
	
	var fileName = req.file.filename;
	
  }else{
	//set default image
	var fileName = 'noimage.png';
  }  
  
   //form validate
  req.checkBody('eventName','Event name is Required').notEmpty();
  req.checkBody('eventDescription','Event Description is Required').notEmpty();
  //check for errors
  var errors = req.validationErrors();
  if(errors){
	console.log('Some Error Occur in Event Form');
	res.render('event',{
	errors: errors
	/* eventName: eventName,
	eventDescription: eventDescription,
	category: eventCategory */
	})
  }else{
	var newEvent = new Event({
		name: eventName ,
		desc: eventDescription ,
		category: eventCategory ,
		date : "30 05 2016",
		filename : fileName
	});
	//creating Event
	Event.createEvent(newEvent,function(err,event){
		if(err) console.log('error occur in create event');
		if(err) throw err ;		
	}); 
	req.flash('success','New Event Created Successfully');  
	Event.getAllEvents(function(err, events){
		if(err) console.log('------------');
		if(err) throw err;
		res.render('event',{
			"allEvents" : events ,
			title: 'Events'
		});
	
	});
	
}});

module.exports = router;