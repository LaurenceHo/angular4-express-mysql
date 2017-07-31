/**
 * Created by laurence-ho on 22/07/17.
 */

import * as express from 'express';
const router = express.Router();

const db = require('../database/database');
const authentication = require('../authentication');

// get one comment for edit
router.get('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
	let commentQuery = 'SELECT * FROM comments WHERE id = ' + req.params.comment_id;

	db.all(commentQuery, (err: any, rows: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({comment: rows[0]});
		}
	});
});

// create a new comment by campground id
router.post('/comment', authentication.isLoggedIn, (req: any, res: any) => {
	let campId = req.body.campground_id;
	let userId = req.body.user_id;
	let userName = req.body.username;
	let text = req.sanitize(req.body.text);

	let insertSQL = 'INSERT INTO comments (campground_id, user_id, username, text) VALUES (\'' +
		campId + '\',\'' + userId + '\',\'' + userName + '\',\'' + text + '\')';

	db.run(insertSQL, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({comment_id: this.lastID});// FIXME, cannot get "this" callback
		}
	});
});

// edit one comment by comment id
router.put('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
	let text = req.sanitize(req.body.text);
	let updateSQL = 'UPDATE comments SET text = \'' + text + '\' WHERE id = ' + req.params.comment_id;

	db.run(updateSQL, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({comment_id: req.params.comment_id});
		}
	});
});

// delete one comment
router.delete('/comment/:comment_id', authentication.checkCommentOwner, (req, res) => {
	let deleteSQL = 'DELETE FROM comments WHERE id = ' + req.params.comment_id;

	db.run(deleteSQL, (err: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			res.status(200).send({comment_id: req.params.comment_id});
		}
	});
});

export = router;
