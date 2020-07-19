let express = require('express'),
	seedDB = require('./seed'),
	app = express(),
	bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	User = require('./models/user');
//requiring routes
let commentRoutes = require('./routes/comment'),
	campgroundRoutes = require('./routes/campground'),
	indexRoutes = require('./routes/index');
//connecting to mongo database
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//using bodyParser for conversion of data coming from forms
app.use(bodyparser.urlencoded({ extended: true }));
//setting default view engine to automatically take ejs file types
app.set('view engine', 'ejs');
//setting up default search path in public directory
app.use(express.static(__dirname + '/public'));
//methodOverride use
app.use(methodOverride('_method'));
//function to remove all data and then add
//seedDB(); //seed the database

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
//middleware to make current user accessible on all routes
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

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
