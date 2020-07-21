let express = require('express'),
	router = express.Router(),
	Campground = require('../models/campground'),
	middleware = require('../middleware');

//show all campgrounds
router.get('/', function(req, res) {
	Campground.find({}, function(err, allcamps) {
		if (err) {
			console.log(err);
		} else {
			res.render('./campground/index', { campgrounds: allcamps });
		}
	});
});
//to add a  new campground show form
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('./campground/new');
});

//post new added campground from that form
router.post('/', middleware.isLoggedIn, function(req, res) {
	let name = req.body.name,
		img = req.body.image,
		price = req.body.price,
		desc = req.body.description,
		author = {
			id: req.user._id,
			username: req.user.username
		};

	let newcamp = {
		name: name,
		image: img,
		price: price,
		description: desc,
		author: author
	};

	Campground.create(newcamp, function(err, camp) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});
//to show a particular camp
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render('./campground/show', { foundcamp: foundCamp });
		}
	});
});

//edit route
router.get('/:id/edit', middleware.checkOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		res.render('./campground/edit', { campground: foundCamp });
	});
});
router.put('/:id', middleware.checkOwnership, (req, res) => {
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
//destroy route
router.delete('/:id', middleware.checkOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds/' + req.params.id);
		}
		res.redirect('/campgrounds');
	});
});

module.exports = router;
