/**
 * Created by laurence-ho on 21/07/17.
 */

import * as express from 'express';
const router = express.Router();

const db = require('../database/database');
const authentication = require('../authentication');

// get all campgrounds
router.get('/campground', (req: any, res: any) => {
	db.all('SELECT * FROM campgrounds', (err: any, rows: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.send(rows);
		}
	});
});

// create one campground
router.post('/campground', authentication.isLoggedIn, (req: any, res: any) => {
	let user_id = req.body.user_id;
	let username = req.body.username;

	let name = req.sanitize(req.body.name);
	let image = req.sanitize(req.body.image);
	let desc = req.sanitize(req.body.description);
	let price = req.sanitize(req.body.price);

	let sql = 'INSERT INTO campgrounds (name, image, description, price, user_id, username) VALUES (\'' +
		name + '\',\'' + image + '\',\'' + desc + '\',\'' + price + '\',\'' + user_id + '\',\'' + username + '\')';

	db.run(sql, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({campground_id: this.lastID});// FIXME, cannot get "this" callback
		}
	});
});

// get one campground with comments
router.get('/campground/:id', (req: any, res: any) => {
	let campground: any = [],
		comments: any = [];

	let campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;
	let commentQuery = 'SELECT * FROM comments WHERE campground_id = ' + req.params.id;

	db.all(campQuery, (err: any, rows: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			campground = rows[0];

			db.all(commentQuery, (err: any, rows: any) => {
				if (err) {
					res.status(500).send({message: err});
				} else {
					comments = rows;
					res.status(200).send({campground: campground, comments: comments});
				}
			});
		}
	});
});

// get campground without comment for edit
router.get('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	let campQuery = 'SELECT * FROM campgrounds WHERE id = ' + req.params.id;

	db.all(campQuery, (err: any, rows: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({campground: rows[0]});
		}
	});
});

// edit one campground
router.put('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	let name = req.sanitize(req.body.name);
	let image = req.sanitize(req.body.image);
	let desc = req.sanitize(req.body.description);
	let price = req.sanitize(req.body.price);

	let updateCampSQL = 'UPDATE campgrounds SET ' +
		'name = \'' + name + '\',' +
		'image = \'' + image + '\',' +
		'description = \'' + desc + '\',' +
		'price = \'' + price + '\' ' +
		'WHERE id = ' + req.body.id;

	db.run(updateCampSQL, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({campground_id: req.body.id});
		}
	});
});

// delete one campground
router.delete('/campground/:id', authentication.checkCampOwner, (req: any, res: any) => {
	let deleteCampSQL = 'DELETE FROM campgrounds WHERE id = ' + req.params.id;

	db.run(deleteCampSQL, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({campground_id: req.params.id});
		}
	});
});

export = router;
