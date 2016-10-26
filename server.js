var express = require('express');
var session = require('express-session');
var expressSanitizer = require('express-sanitizer');
var methodOverride = require('method-override');
var parser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

//initial database schema
var db = require('./db');
require('./db_schema.js')(db);
require('./passport')(passport);

var app = express();
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));
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

app.get("/", function(req, res) {
    res.redirect('/campground');
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found!");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000!");
});
