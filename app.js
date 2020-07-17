let express = require('express'),
	seedDB = require('./seed'),
	app = express(),
	bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	User = require('./models/user'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//middleware to make current user accessible on all routes
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
seedDB();

//Passport configuration
app.use(
	require('express-session')({
		secret: 'develop and develop daily',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
	res.render('landing');
});
app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allcamps) {
		if (err) {
			console.log(err);
		} else {
			res.render('./campground/index', { campgrounds: allcamps });
		}
	});
});
//to add a  new campground show form
app.get('/campgrounds/new', function(req, res) {
	res.render('./campground/new');
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
//to show a particular camp
app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render('./campground/show', { foundcamp: foundCamp });
		}
	});
});
//================
//comments route
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			res.render('./comments/new', { foundcamp: foundCamp });
		}
	});
});
app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					foundCamp.comments.push(comment);
					foundCamp.save();
					res.redirect('/campgrounds/' + foundCamp._id);
				}
			});
		}
	});
});
app.listen(3000, function() {
	console.log('The Yelpcamp Server started!!!');
});

//Authenticaton routes

//Sign Up
app.get('/register', (req, res) => {
	res.render('register');
});
//Sign up post route
app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
	res.render('login');
});
app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

//Logout route
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/campgrounds');
});

//login logic
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
// Restful Routes

// name       url                  verb   desc
// ==========================================================
// INDEX     /campgrounds			GET    Display all camps
// NEW       /campgrounds/new 		GET    Display a form to add a new camp
// CREATE    /campgrounds 			POST   Add new camp to database
// SHOW 	  /campgrounds/:id 		GET    Show info of particular camp
