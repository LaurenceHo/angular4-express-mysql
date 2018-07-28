/**
 * Created by laurence-ho on 22/07/17.
 */

import * as express from 'express';

const router = express.Router();

const database = require('../database/DatabaseService');
const authentication = require('../Authentication');

// get one comment for edit
router.get('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
	database.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], (err: any, result: any) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({comment: result[0]});
				}
			});
		}
	});
});

// create a new comment by campground id
router.post('/comment', authentication.isLoggedIn, (req: any, res: any) => {
	req.body.text = req.sanitize(req.body.text);

	database.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('INSERT INTO comments SET ?', req.body, (err: any, result: any) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({comment_id: result.insertId});
				}
			});
		}
	});
});

// edit one comment by comment id
router.put('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
	req.body.text = req.sanitize(req.body.text);

	database.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.comment_id], (err: any) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({comment_id: req.params.comment_id});
				}
			});
		}
	});
});

// delete one comment
router.delete('/comment/:comment_id', authentication.checkCommentOwner, (req: any, res: any) => {
	database.getConnection((err: any, connection: any) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('DELETE FROM comments WHERE id = ?', [req.params.comment_id], (err: any) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({comment_id: req.params.comment_id});
				}
			});
		}
	});
});

export = router;
