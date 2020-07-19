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
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, () => {
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
	res.redirect('/campgrounds');
});

//middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
module.exports = router;
