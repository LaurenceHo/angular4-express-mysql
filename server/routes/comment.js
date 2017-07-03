var express = require('express');
var router = express.Router();

var db = require('../sqlite');
var authentication = require('../authentication');

// get one comment for edit
router.get('/comment/:comment_id/edit', authentication.checkCommentOwner, function (req, res) {
	var commentQuery = 'SELECT * FROM comments WHERE id = ' + req.params.comment_id;

	db.all(commentQuery, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ comment: rows[0] });
		}
	});
});

// create a new comment by campground id
router.post('/comment', authentication.isLoggedIn, function (req, res) {
	var campId = req.body.campground_id;
	var userId = req.body.user_id;
	var userName = req.body.username;
	var text = req.sanitize(req.body.text);

	var insertSQL = "INSERT INTO comments (campground_id, user_id, username, text) VALUES ('" +
		campId + "','" + userId + "','" + userName + "','" + text + "')";

	db.run(insertSQL, function (err, result) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ message: 'OK' });
		}
	});
});

// FIXME edit one comment by comment id
router.put('/comment/:comment_id/edit', authentication.checkCommentOwner, function (req, res) {
	var text = req.sanitize(req.body.text);
	var updateSQL = "UPDATE comments SET " +
		"text = '" + text + "' WHERE id = " + req.params.comment_id;

	db.run(updateSQL, function (err, rows) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			rres.status(200).send({ message: 'OK' });
		}
	});
});

// delete one comment
router.delete('/comment/:comment_id', authentication.checkCommentOwner, function (req, res) {
	var deleteSQL = 'DELETE FROM comments WHERE id = ' + req.params.comment_id;
	db.run(deleteSQL, function (err) {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(200).send({ message: 'OK' });
		}
	});
});

module.exports = router;
