let express = require('express'),
	router = express.Router({ mergeParams: true }),
	Campground = require('../models/campground'),
	Comment = require('../models/comment');

//================
//comments new
router.get('/new', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			res.render('./comments/new', { foundcamp: foundCamp });
		}
	});
});
//comments create
router.post('/', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					foundCamp.comments.push(comment);
					foundCamp.save();
					res.redirect('/campgrounds/' + foundCamp._id);
				}
			});
		}
	});
});
//comment edit
router.get('/:comment_id/edit', commentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.render('./comments/edit', { campground_id: req.params.id, comment: foundComment });
		}
	});
});
//comment update
router.put('/:comment_id', commentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
//comment delete
router.delete('/:comment_id', commentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
function commentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				console.log(err);
				res.redirect('/campgrounds');
			} else {
				//does user owns the campground?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}
module.exports = router;
