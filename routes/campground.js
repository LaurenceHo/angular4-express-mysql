var db = require('../db');
var express = require('express');
var router = express.Router();


// get all camp grounds
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

// get create camp ground form
router.get('/campground/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// create one camp ground
router.post('/campground', isLoggedIn, function(req, res) {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    req.body.campground.description = req.sanitize(req.body.campground.description);

    db.getConnection((err, connection) => {
        if (err) {
            res.render('campgrounds/new');
        } else {
            connection.query('INSERT INTO campgrounds SET ?', req.body.campground, function(err, result) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    console.log('Create new campground:' + req.body.campground.name);
                    res.redirect('/campground');
                }
            });
        }
    });
});

// get one camp ground with comments
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

// get edit camp ground form
router.get('/campground/:id/edit', isLoggedIn, function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            res.redirect('/campground');
        } else {
            connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                    res.redirect('/campground/' + req.params.id);
                } else {
                    res.render('campgrounds/edit', { campground: result[0] });
                }
            });
        }
    });
});

// edit one camp ground
router.put('/campground/:id', isLoggedIn, function(req, res) {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    req.body.campground.description = req.sanitize(req.body.campground.description);

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.redirect('/campground/' + req.params.id);
        } else {
            connection.query('UPDATE campgrounds SET ? WHERE id = ?', [req.body.campground, req.params.id], function(err, result, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                    res.redirect('/campground');
                } else {
                    res.redirect('/campground/' + req.params.id);
                }
            });
        }
    });
});

// delete one camp ground
router.delete('/campground/:id', isLoggedIn, function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            res.redirect('/campground' + req.params.id);
        } else {
            connection.query('DELETE FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                connection.release();

                res.redirect('/campground');
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
