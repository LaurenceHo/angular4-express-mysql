var db = require('./sqlite');
var middlewareObj = {};

middlewareObj.checkCampOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		var campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

		db.all(campQuery, function (err, rows) {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				if (rows[0].user_id === req.user.id) {
					next();
				} else {
					res.status(403).send({ message: 'You have no permission' });
				}
			}
		});
	} else {
		res.status(403).send({ message: 'Please Login First' });
	}
};

middlewareObj.checkCommentOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		var commentQuery = 'SELECT * FROM comments WHERE id = ' + req.params.comment_id;
		db.all(commentQuery, function (err, rows) {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				if (rows[0].user_id === req.user.id) {
					next();
				} else {
					res.status(403).send({ message: 'You have no permission' });
				}
			}
		});
	} else {
		res.status(403).send({ message: 'Please Login First' });
	}
};

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(403).send({ message: 'Please Login First' });
};

module.exports = middlewareObj;
