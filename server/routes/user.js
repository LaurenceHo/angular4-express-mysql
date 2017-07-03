var express = require('express');
var router = express.Router();
var passport = require('passport');
var authentication = require('../authentication');

router.post('/login',
	function (req, res, next) {
		passport.authenticate('local-login', function (err, user, info) {
			if (err) {
				return res.status(401).send({ message: err.message });
			}
			if (!user) {
				return res.status(401).send({ message: info.message });
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.status(401).send({ message: err.message });
				}
				return res.status(200).json(req.user);
			});
		})(req, res, next);
	},
	function (req, res) {
		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.redirect('/');
	});

router.post('/signup', function (req, res, next) {
		passport.authenticate('local-signup',
			function (err, user, info) {
				if (err) {
					return res.status(403).send({ 'message': err.message });
				}

				if (!user) {
					return res.status(403).send({ 'message': info.message });
				}

				return res.status(200).send({ 'message': 'OK' });
			})(req, res, next);
	}
);

router.get('/profile', authentication.isLoggedIn, function (req, res) {
	res.json(req.user);
});

router.get('/logout', function (req, res) {
	req.logout();
});

module.exports = router;
