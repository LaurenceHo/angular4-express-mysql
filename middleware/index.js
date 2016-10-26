var db = require('../db');
var middlewareObj = {};

middlewareObj.checkCampOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection((err, connection) => {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            } else {
                connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                    connection.release();

                    if (err) {
                        req.flash('error', err);
                        res.redirect('back');
                    } else {
                        if (result[0].user_id === req.user.id) {
                            next();
                        } else {
                            req.flash('error', 'You have no permission!');
                            res.redirect('back');
                        }
                    }
                });
            }
        });
    } else {
        req.flash('error', 'Please Login First!');
        res.redirect('/login');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection((err, connection) => {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            } else {
                connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], function(err, result, fields) {
                    connection.release();

                    if (err) {
                        req.flash('error', err);
                        res.redirect('back');
                    } else {
                        if (result[0].user_id === req.user.id) {
                            next();
                        } else {
                            req.flash('error', 'You have no permission!');
                            res.redirect('back');
                        }
                    }
                });
            }
        });
    } else {
        req.flash('error', 'Please Login First!');
        res.redirect('/login');
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    req.flash('error', 'Please Login First!')
    res.redirect('/login');
}

module.exports = middlewareObj;
