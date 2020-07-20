let Campground = require('../models/campground'),
	Comment = require('../models/comment');

let middlewareObject = {};

middlewareObject.checkOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCamp) => {
			if (err) {
				req.flash('error', err.message);
				res.redirect('/campgrounds');
			} else {
				//does user owns the campground?
				if (foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Access Denied..');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Please, Login to continue..');
		res.redirect('back');
	}
};

middlewareObject.commentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				req.flash('error', err.message);
				res.redirect('/campgrounds');
			} else {
				//does user owns the campground?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Access Denied');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Please, Login to continue...');
		res.redirect('back');
	}
};

middlewareObject.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please, Login to continue..');
	res.redirect('/login');
};

module.exports = middlewareObject;
