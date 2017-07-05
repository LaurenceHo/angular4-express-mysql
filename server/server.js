var express = require('express');
var session = require('express-session');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');

//initial database schema
require('./database/sqlite');
require('./passport')(passport);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/app', express.static(path.resolve(__dirname, '../dist/client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../dist/client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use(express.static(path.resolve(__dirname, '../node_modules')));

app.use(expressSanitizer());

app.use(session({
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//initial routes
var userRoutes = require('./routes/user.js');
var campgroundRoutes = require('./routes/campground.js');
var commentRoutes = require('./routes/comment.js');

app.use('/api', userRoutes);
app.use('/api', campgroundRoutes);
app.use('/api', commentRoutes);

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get("*", function (req, res) {
	res.send("Sorry, page not found!");
});

app.listen(8080, function () {
	console.log('This express angular app is listening on port:' + 8080);
});
module.exports = app;