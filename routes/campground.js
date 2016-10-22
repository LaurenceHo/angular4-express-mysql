module.exports = function(app, db) {

    app.get('/campground', function(req, res) {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query('SELECT * FROM CAMPGROUND', function(err, results, fields) {
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

    app.post('/campground', function(req, res) {
        var name = req.body.name;
        var image = req.body.image;
        var description = req.body.description;

        var newCampground = { NAME: name, IMAGE: image, DESCRIPTION: description };

        db.getConnection((err, connection) => {
            if (err) {
                res.render('campgrounds/new');
            } else {
                connection.query('INSERT INTO CAMPGROUND SET ?', newCampground, function(err, result) {
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

    app.get('/campground/new', function(req, res) {
        res.render('campgrounds/new');
    });

    app.get('/campground/:id', function(req, res) {
        var campground = [],
            comments = [];

        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query('SELECT * FROM CAMPGROUND WHERE ID = ?', [req.params.id], function(err, result, fields) {
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
                connection.query('SELECT * FROM COMMENT WHERE CAMPGROUND_ID = ?', [req.params.id], function(err, result, fields) {
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
};
