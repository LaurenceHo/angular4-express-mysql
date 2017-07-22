/**
 * Created by laurence-ho on 22/07/17.
 */

import * as express from 'express';
const router = express.Router();

const passport = require('passport');
const authentication = require('../authentication');

router.post('/login', (req: any, res: any, next: any) => {
	passport.authenticate('local-login', (err: any, user: any, info: any) => {
		if (err) {
			return res.status(401).send({message: err.message});
		}
		if (!user) {
			return res.status(401).send({message: info.message});
		}
		req.logIn(user, (err: any) => {
			if (err) {
				return res.status(401).send({message: err.message});
			}

			let milliseconds = 0;
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

router.post('/signup', (req: any, res: any, next: any) => {
		passport.authenticate('local-signup', (err: any, user: any, info: any) => {
			if (err) {
				return res.status(403).send({'message': err.message});
			}

			if (!user) {
				return res.status(403).send({'message': info.message});
			}

			return res.status(200).send({'message': 'OK'});
		})(req, res, next);
	}
);

router.get('/profile', authentication.isLoggedIn, (req: any, res: any) => {
	res.json(req.user);
});

router.get('/logout', (req: any) => {
	req.session.destroy((err: any) => {
		console.error(err);
	});
	req.logout();
});

export = router;
