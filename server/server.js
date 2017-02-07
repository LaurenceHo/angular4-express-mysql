var express = require('express');
var session = require('express-session');
var expressSanitizer = require('express-sanitizer');
var methodOverride = require('method-override');
var parser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

//initial database schema
require('./sqlite');
require('./passport')(passport);

var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cookieParser());
app.use(parser.urlencoded({ extended: true }));

app.use('/app', express.static(path.resolve(__dirname, '../dist/client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../dist/client/libs')));
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use(express.static(path.resolve(__dirname, '../node_modules')));

app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');

    next();
});

//initial routes
var authRoutes = require('./routes/auth.js');
var campgroundRoutes = require('./routes/campground.js');
var commentRoutes = require('./routes/comment.js');

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found!");
});

app.listen(8080, function() {
    console.log('This express angular app is listening on port:' + 8080);
});
module.exports = app;