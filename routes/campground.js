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

router.post('/campground', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampground = { name: name, image: image, description: description };

    db.getConnection((err, connection) => {
        if (err) {
            res.render('campgrounds/new');
        } else {
            connection.query('INSERT INTO campgrounds SET ?', newCampground, function(err, result) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    console.log('Create new campground:' + result.insertId);
                    res.redirect('/campground');
                }
            });
        }
    });
});

router.get('/campground/new', function(req, res) {
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

module.exports = router;
