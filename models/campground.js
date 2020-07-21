var mongoose = require('mongoose');

var campgroundsSchema = new mongoose.Schema({
	name: String,
	price: Number,
	image: String,
	description: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	location: String,
	lat: Number,
	lng: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

var Campground = new mongoose.model('Campground', campgroundsSchema);

module.exports = Campground;
