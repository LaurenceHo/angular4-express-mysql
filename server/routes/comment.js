var express = require('express');
var router = express.Router();

var db = require('../sqlite');
var middleware = require('../middleware');


// get create comment form
router.get('/campground/:id/comments/new', middleware.isLoggedIn, function (req, res) {
    var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

    db.all(campQuery, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.redirect('/campground/' + req.params.id);
        } else {
            res.render('comments/new', { campground: rows[0] });
        }
    });
});

// create a new comment by campground id
router.post('/campground/:id/comments', middleware.isLoggedIn, function (req, res) {
    var campId = req.body.comment.campground_id;
    var userId = req.body.comment.user_id;
    var userName = req.body.comment.username;
    var text = req.sanitize(req.body.comment.text);

    var insertSQL = "INSERT INTO comments (campground_id, user_id, username, text) VALUES ('" +
        campId + "','" + userId + "','" + userName + "','" + text + "')";

    db.run(insertSQL, function (err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            res.redirect('/campground/' + req.params.id);
        }
    });
});

// get edit comment form
router.get('/campground/:id/comments/:comment_id/edit', middleware.checkCommentOwner, function (req, res) {
    var campground = [],
        comment = [];

    var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;
    var commentQuery = 'SELECT * FROM comments WHERE id = ' + req.params.comment_id;

    db.all(campQuery, function (err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            campground = rows[0];

            db.all(commentQuery, function (err, rows) {
                if (err) {
                    req.flash('error', err);
                } else {
                    comment = rows[0];

                    res.render('comments/edit', {
                        campground: campground,
                        comment: comment
                    });
                }
            });
        }
    });
});

//edit one comment by comment id
router.put('/campground/:id/comments/:comment_id', middleware.checkCommentOwner, function (req, res) {
    var text = req.sanitize(req.body.comment.text);
    var updateSQL = "UPDATE comments SET " +
        "text = '" + text + "' WHERE id = " + req.params.comment_id;

    db.run(updateSQL, function (err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            res.redirect('/campground/' + req.params.id);
        }
    });
});

// delete one comment
router.delete('/campground/:id/comments/:comment_id', middleware.checkCommentOwner, function (req, res) {
    var deleteSQL = 'DELETE FROM comments WHERE id = ' + req.params.comment_id;
    db.run(deleteSQL, function (err) {
        if (err) {
            req.flash('error', err);
            res.redirect('/campground' + req.params.id);
        } else {
            res.redirect('/campground');
        }
    });
});

module.exports = router;
