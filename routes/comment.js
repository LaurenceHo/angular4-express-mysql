var db = require('../db');
var express = require('express');
var router = express.Router();


router.get('/campground/:id/comments/new', isLoggedIn, function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    res.render('comments/new', { campground: result[0] });
                }
            });
        }
    });
});

router.post('/campground/:id/comments', isLoggedIn, function(req, res) {
    req.body.comment.text = req.sanitize(req.body.comment.text);

    db.getConnection((err, connection) => {
        if (err) {
            res.render('campgrounds/new');
        } else {
            connection.query('INSERT INTO comments SET ?', req.body.comment, function(err, result) {
                connection.release();

                if (err) {
                    console.log(err);
                } else {
                    console.log('Create new comment:' + result.insertId);
                    res.redirect('/campground/' + req.params.id);
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
