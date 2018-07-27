/**
 * Created by laurence-ho on 21/07/17.
 */

import * as express from 'express';
import CampgroundRepository from '../repository/campgroundRepository';

const router = express.Router();

const db = require('../database/db.service');
const authentication = require('../authentication');

// get all campgrounds
router.get('/campground', (req: any, res: any) => {
	const campgroundRepository = new CampgroundRepository();
	try {
		res.send(campgroundRepository.findAll());
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

// create one campground
router.post('/campground', authentication.isLoggedIn, (req: any, res: any) => {
	req.body.name = req.sanitize(req.body.name);
	req.body.image = req.sanitize(req.body.image);
	req.body.description = req.sanitize(req.body.description);
	req.body.price = req.sanitize(req.body.price);

	db.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			connection.query('INSERT INTO campgrounds SET ?', req.body, (err: any, result: any) => {
				connection.release();

				if (err) {
					res.status(500).send({ message: err });
				} else {
					res.status(200).send({ campground_id: result.insertId });
				}
			});
		}
	});
});

// get one campground with comments
router.get('/campground/:id', (req: any, res: any) => {
	let campground: any = [],
		comments: any = [];

	db.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], (err: any, result: any) => {
				if (err) {
					res.status(500).send({ message: err });
				} else {
					campground = result[0];
				}
			});

			connection.query('SELECT * FROM comments WHERE campground_id = ?', [req.params.id], (err: any, result: any) => {
				connection.release();

				if (err) {
					res.status(500).send({ message: err });
				} else {
					comments = result;
					res.status(200).send({ campground: campground, comments: comments });
				}
			});
		}
	});
});

// get campground without comment for edit
router.get('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	db.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], (err: any, result: any) => {
				connection.release();

				if (err) {
					res.status(500).send({ message: err });
				} else {
					res.status(200).send({ campground: result[0] });
				}
			});
		}
	});
});

// edit one campground
router.put('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	req.body.name = req.sanitize(req.body.name);
	req.body.image = req.sanitize(req.body.image);
	req.body.description = req.sanitize(req.body.description);
	req.body.price = req.sanitize(req.body.price);

	db.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			connection.query('UPDATE campgrounds SET ? WHERE id = ?', [req.body, req.params.id], (err: any) => {
				connection.release();

				if (err) {
					res.status(500).send({ message: err });
				} else {
					res.status(200).send({ campground_id: req.params.id });
				}
			});
		}
	});
});

// delete one campground
router.delete('/campground/:id', authentication.checkCampOwner, (req: any, res: any) => {
	db.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			connection.query('DELETE FROM campgrounds WHERE id = ?', [req.params.id], (err: any) => {
				connection.release();

				if (err) {
					res.status(500).send({ message: err });
				} else {
					res.status(200).send({ campground_id: req.params.id });
				}
			});
		}
	});
});

export = router;
