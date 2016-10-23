var express = require('express');
var session = require('express-session');
var parser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

require('./passport')(passport);

//initial database schema
var db = require('./db');
require('./db_schema.js')(db);

var app = express();
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    next();
});

app.get("/", function(req, res) {
    res.redirect('/campground');
});

require('./routes/user.js')(app, passport);
require('./routes/campground.js')(app, db);
require('./routes/comment.js')(app, db);

app.get("*", function(req, res) {
    res.send("Sorry, page not found!");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000!");
});
