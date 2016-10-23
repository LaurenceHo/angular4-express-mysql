module.exports = function(app, db) {
    app.get('/campground/:id/comments/new', function(req, res) {
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

    app.post('/campground/:id/comments', function(req, res) {
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
};
