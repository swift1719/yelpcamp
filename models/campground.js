var mongoose = require('mongoose');

var campgroundsSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = new mongoose.model('Campground', campgroundsSchema);

module.exports = Campground;
