var express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });

// Campground.create(
// 	{
// 		name: 'Mountain resort',
// 		image:
// 			'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80',
// 		description: 'this is a huge granite hill awesome beautiful'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('Newly created campground: ');
// 			console.log(campground);
// 		}
// 	}
// );

// var campgrounds = [
// 	,
// 	{
// 		name: 'salmon creek',
// 		image:
// 			'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80'
// 	},
// 	{
// 		name: 'granite hill',
// 		image:
// 			'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
// 	},
// 	{
// 		name: 'Mountain resort',
// 		image:
// 			'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80'
// 	}
// ];

app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});
app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allcamps) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allcamps });
		}
	});
});
//to add a  new campground show form
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});
//post new added campground from that form
app.post('/campgrounds', function(req, res) {
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.description;
	var newcamp = {
		name: name,
		image: img,
		description: desc
	};

	Campground.create(newcamp, function(err, cam) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render('show', { foundcamp: foundCamp });
		}
	});
});

app.listen(3000, function() {
	console.log('The Yelpcamp Server started!!!');
});

// Restful Routes

// name       url                  verb   desc
// ==========================================================
// INDEX     /campgrounds			GET    Display all camps
// NEW       /campgrounds/new 		GET    Display a form to add a new camp
// CREATE    /campgrounds 			POST   Add new camp to database
// SHOW 	  /campgrounds/:id 		GET    Show info of particular camp
