var express = require('express');
var router = express.Router();

var db = require('../sqlite');
var middleware = require('../middleware');


// get all camp grounds
router.get('/api/campground', function (req, res) {
	db.all('SELECT * FROM campgrounds', function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.send(rows);
		}
	});
});

// get create camp ground form
router.get('/campground/new', middleware.isLoggedIn, function (req, res) {
	res.render('campgrounds/new');
});

// create one camp ground
router.post('/campground', middleware.isLoggedIn, function (req, res) {
	var user_id = req.body.campground.user_id;
	var username = req.body.campground.username;

	var name = req.sanitize(req.body.campground.name);
	var image = req.sanitize(req.body.campground.image);
	var desc = req.sanitize(req.body.campground.description);

	var sql = "INSERT INTO campgrounds (name, image, description, user_id, username) VALUES ('" +
		name + "','" + image + "','" + desc + "','" + user_id + "','" + username + "')";

	db.run(sql, function (err, result) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.redirect('/');
		}
	});
});

// get one camp ground with comments
router.get('/api/campground/:id', function (req, res) {
	var campground = [],
		comments = [];

	var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;
	var commentQuery = 'SELECT * FROM comments WHERE campground_id = ' + req.params.id;

	db.all(campQuery, function (err, rows) {
		if (err) {
			req.flash('error', err);
		} else {
			campground = rows[0];

			db.all(commentQuery, function (err, rows) {
				if (err) {
					res.status(500).send({ message: err });
				} else {
					comments = rows;
					res.send({ campground: campground, comments: comments });
				}
			});
		}
	});
});

// get edit camp ground form
router.get('/campground/:id/edit', middleware.checkCampOwner, function (req, res) {
	var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

	db.all(campQuery, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
			res.redirect('/campground/' + req.params.id);
		} else {
			res.render('campgrounds/edit', { campground: rows[0] });
		}
	});
});

// edit one camp ground
router.put('/campground/:id', middleware.checkCampOwner, function (req, res) {
	var name = req.sanitize(req.body.campground.name);
	var image = req.sanitize(req.body.campground.image);
	var desc = req.sanitize(req.body.campground.description);

	var updateCampSQL = "UPDATE campgrounds SET " +
		"name = '" + name + "'," +
		"image = '" + image + "'," +
		"description = '" + desc + "'" +
		" WHERE id = " + req.params.id;

	db.run(updateCampSQL, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
			res.redirect('/');
		} else {
			res.redirect('/campground/' + req.params.id);
		}
	});
});

// delete one camp ground
router.delete('/campground/:id', middleware.checkCampOwner, function (req, res) {
	var deleteCampSQL = 'DELETE FROM campgrounds WHERE id = ' + req.params.id;
	db.run(deleteCampSQL, function (err) {
		if (err) {
			res.status(500).send({ message: err });
			res.redirect('/campground' + req.params.id);
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;
