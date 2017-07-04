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

				var milliseconds = 0;
				if (req.body.remember) {
					milliseconds = 1000 * 60 * 30; // 30 minutes

					req.session.cookie.expires = new Date(Date.now() + milliseconds);
					req.session.cookie.maxAge = milliseconds;
				} else {
					milliseconds = 1000 * 60 * 60 * 24; // 1 day

					req.session.cookie.expires = new Date(Date.now() + milliseconds);
					req.session.cookie.maxAge = milliseconds;
				}
				return res.status(200).json(req.user);
			});
		})(req, res, next);
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
	req.session.destroy();
	req.logout();
});

module.exports = router;
