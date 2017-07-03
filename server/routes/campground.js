var express = require('express');
var router = express.Router();

var db = require('../sqlite');
var middleware = require('../middleware');


// get all campgrounds
router.get('/api/campground', function (req, res) {
	db.all('SELECT * FROM campgrounds', function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.send(rows);
		}
	});
});

// create one campground
router.post('/api/campground', middleware.isLoggedIn, function (req, res) {
	var user_id = req.body.user_id;
	var username = req.body.username;

	var name = req.sanitize(req.body.name);
	var image = req.sanitize(req.body.image);
	var desc = req.sanitize(req.body.description);
	var price = req.sanitize(req.body.price);

	var sql = "INSERT INTO campgrounds (name, image, description, price, user_id, username) VALUES ('" +
		name + "','" + image + "','" + desc + "','" + price + "','" + user_id + "','" + username + "')";

	db.run(sql, function (err, result) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ message: 'OK' });
		}
	});
});

// get one campground with comments
router.get('/api/campground/:id', function (req, res) {
	var campground = [],
		comments = [];

	var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;
	var commentQuery = 'SELECT * FROM comments WHERE campground_id = ' + req.params.id;

	db.all(campQuery, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			campground = rows[0];

			db.all(commentQuery, function (err, rows) {
				if (err) {
					res.status(500).send({ message: err });
				} else {
					comments = rows;
					res.status(200).send({ campground: campground, comments: comments });
				}
			});
		}
	});
});

// get campground without comment for edit
router.get('/api/campground/:id/edit', middleware.checkCampOwner, function (req, res) {
	var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

	db.all(campQuery, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ campground: rows[0] });
		}
	});
});

// edit one campground
router.put('/api/campground/:id/edit', middleware.checkCampOwner, function (req, res) {
	var name = req.sanitize(req.body.name);
	var image = req.sanitize(req.body.image);
	var desc = req.sanitize(req.body.description);
	var price = req.sanitize(req.body.price);

	var updateCampSQL = "UPDATE campgrounds SET " +
		"name = '" + name + "'," +
		"image = '" + image + "'," +
		"description = '" + desc + "'," +
		"price = '" + price + "' " +
		"WHERE id = " + req.body.id;

	db.run(updateCampSQL, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ message: 'OK', id: req.body.id });
		}
	});
});

// delete one campground
router.delete('/api/campground/:id', middleware.checkCampOwner, function (req, res) {
	var deleteCampSQL = 'DELETE FROM campgrounds WHERE id = ' + req.params.id;
	db.run(deleteCampSQL, function (err) {
		if (err) {
			res.status(500).send({ message: err, id: req.params.id });
		} else {
			res.status(200).send({ message: 'OK' });
		}
	});
});

module.exports = router;
