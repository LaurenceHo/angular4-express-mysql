/**
 * Created by laurence-ho on 21/07/17.
 */

import { database } from './database/DatabaseService';

let authentication: any = {};

authentication.checkCampOwner = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], (err: any, rows: any) => {
					connection.release();

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
			}
		});
	} else {
		res.status(403).send({ message: 'Please Login First' });
	}
};

authentication.checkCommentOwner = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], (err: any, rows: any) => {
					connection.release();

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
			}
		});
	} else {
		res.status(403).send({ message: 'Please Login First' });
	}
};

authentication.isLoggedIn = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(403).send({ message: 'Please Login First' });
};

export = authentication;

