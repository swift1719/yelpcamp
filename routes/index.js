let express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');
//root route
router.get('/', (req, res) => {
	res.render('landing');
});

//Authenticaton routes

//Sign Up form
router.get('/register', (req, res) => {
	res.render('register');
});
//Sign up post route
router.post('/register', (req, res) => {
	let newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/register');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', 'Welcome to YelpCamp ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

//Login
router.get('/login', (req, res) => {
	res.render('login');
});
//handling login logic
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

//Logout route
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;
