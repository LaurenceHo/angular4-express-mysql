var db = require('../db');
var express = require('express');
var router = express.Router();


router.get('/campground', function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('SELECT * FROM campgrounds', function(err, results, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    res.render('campgrounds/index', { campgrounds: results });
                }
            });
        }
    });
});

router.post('/campground', isLoggedIn, function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            res.render('campgrounds/new');
        } else {
            connection.query('INSERT INTO campgrounds SET ?', req.body.campground, function(err, result) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    console.log('Create new campground:' + req.body.campground);
                    res.redirect('/campground');
                }
            });
        }
    });
});

router.get('/campground/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

router.get('/campground/:id', function(req, res) {
    var campground = [],
        comments = [];

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    campground = result[0];
                }
            });
        }
    });

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('SELECT * FROM comments WHERE campground_id = ?', [req.params.id], function(err, result, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    comments = result;

                    res.render('campgrounds/one', {
                        campground: campground,
                        comments: comments
                    });
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

module.exports = router;
