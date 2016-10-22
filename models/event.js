//loading the mongoose module in our program
var mongoose = require('mongoose');
//connection to our database using the DB server URL.
mongoose.connect('mongodb://localhost/agsdb');
var db = mongoose.connection;
var Schema = mongoose.Schema;
/**
 * Lets define our Model for Event entity. This model represents a collection in the database.
 * We define the possible schema of Event document and data types of each field.
 * */
/* var Event = mongoose.model('Event', {name: String, desc: String, category: String, date: String}); */

var eventSchema = new Schema({
	name:{
		type: String
	},
	desc:{ 
		type: String
	},
	category:{
		type: String
	},
	date:{
		type: String
	},
	filename:{
		type: String
	}
})

var Event =  module.exports = mongoose.model('Event',eventSchema);

module.exports.getAllEvents = function(callback) {
  
  Event.find({},callback);
};


module.exports.deleteEvent = function(eventId,callback) {
  // delete  event 
  Event.find({'_id': eventId}).remove(callback);
  
};

module.exports.createEvent = function(newEvent,callback) {
  // add new event 
  newEvent.save(callback);
  
};






