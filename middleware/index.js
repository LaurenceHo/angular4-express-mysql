var db = require('../db/sqlite');
var middlewareObj = {};

middlewareObj.checkCampOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

        db.all(campQuery, function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            } else {
                if (rows[0].user_id === req.user.id) {
                    next();
                } else {
                    req.flash('error', 'You have no permission!');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please Login First!');
        res.redirect('/login');
    }
}

middlewareObj.checkCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        var commentQuery = 'SELECT * FROM comments WHERE id = ' + req.params.comment_id;
        db.all(commentQuery, function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            } else {
                if (rows[0].user_id === req.user.id) {
                    next();
                } else {
                    req.flash('error', 'You have no permission!');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please Login First!');
        res.redirect('/login');
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash('error', 'Please Login First!')
    res.redirect('/login');
}

module.exports = middlewareObj;
