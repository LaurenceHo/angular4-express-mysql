var db = require('../db');
var express = require('express');
var router = express.Router();
var middleware = require('../middleware/index');


// get create comment form
router.get('/campground/:id/comments/new', middleware.isLoggedIn, function(req, res) {
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

// create a new comment by campground id
router.post('/campground/:id/comments', middleware.isLoggedIn, function(req, res) {
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

// get edit comment form
router.get('/campground/:id/comments/:comment_id/edit', middleware.checkCommentOwner, function(req, res) {
    var campground = [],
        comments = [];

    db.getConnection((err, connection) => {
        if (err) {
            res.redirect('back');
        } else {
            db.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                } else {
                    connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground = result[0];
                        }
                    });

                    connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], function(err, result, fields) {
                        connection.release();

                        if (err) {
                            console.log(err);
                            res.redirect('/campground/' + req.params.id);
                        } else {
                            comment = result[0];

                            res.render('comments/edit', {
                                campground: campground,
                                comment: comment
                            });
                        }
                    });
                }
            });
        }
    });
});

//edit one comment by campground id
router.put('/campground/:id/comments/:comment_id', middleware.checkCommentOwner, function(req, res) {
    req.body.comment.text = req.sanitize(req.body.comment.text);

    db.getConnection((err, connection) => {
        if (err) {
            res.redirect('/campground' + req.params.id);
        } else {
            connection.query('UPDATE comments SET ? WHERE id = ?', [req.body.comment, req.params.comment_id], function(err, result) {
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

// delete one comment
router.delete('/campground/:id/comments/:comment_id', middleware.checkCommentOwner, function(req, res) {
    db.getConnection((err, connection) => {
        if (err) {
            res.redirect('back');
        } else {
            connection.query('DELETE FROM comments WHERE id = ?', [req.params.comment_id], function(err, result, fields) {
                connection.release();

                res.redirect('/campground/' + req.params.id);
            });
        }
    });
});

module.exports = router;
