let express = require('express'),
	router = express.Router({ mergeParams: true }),
	Campground = require('../models/campground'),
	Comment = require('../models/comment'),
	middleware = require('../middleware');

//================
//comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			res.render('./comments/new', { foundcamp: foundCamp });
		}
	});
});
//comments create
router.post('/', middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					req.flash('error', 'Something went wrong...');
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					foundCamp.comments.push(comment);
					foundCamp.save();
					req.flash('success', 'Successfully added comment!!');
					res.redirect('/campgrounds/' + foundCamp._id);
				}
			});
		}
	});
});
//comment edit
router.get('/:comment_id/edit', middleware.commentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.render('./comments/edit', { campground_id: req.params.id, comment: foundComment });
		}
	});
});
//comment update
router.put('/:comment_id', middleware.commentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
//comment delete
router.delete('/:comment_id', middleware.commentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment Deleted ');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
