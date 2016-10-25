var middlewareObj = {};

middlewareObj.checkCampOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection((err, connection) => {
            if (err) {
                res.redirect('back');
            } else {
                connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function(err, result, fields) {
                    connection.release();

                    if (err) {
                        console.log(err);
                        res.redirect('back');
                    } else {
                        if (result[0].user_id === req.user.id) {
                            next();
                        } else {
                            res.redirect('back');
                        }
                    }
                });
            }
        });
    } else {
        res.redirect('/login');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection((err, connection) => {
            if (err) {
                res.redirect('back');
            } else {
                connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], function(err, result, fields) {
                    connection.release();

                    if (err) {
                        console.log(err);
                        res.redirect('back');
                    } else {
                        if (result[0].user_id === req.user.id) {
                            next();
                        } else {
                            res.redirect('back');
                        }
                    }
                });
            }
        });
    } else {
        res.redirect('/login');
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

module.exports = middlewareObj;
