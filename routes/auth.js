var express = require('express');
var router = express.Router();
var passport = require('passport');
var middleware = require('../middleware/index');


router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }),
    function(req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

router.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/profile', middleware.isLoggedIn, function(req, res) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
