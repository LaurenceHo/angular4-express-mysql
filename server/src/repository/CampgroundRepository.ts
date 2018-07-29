import { Campground } from '../model/Campground';
import { Comment } from '../model/Comment';
import { BaseRepository } from './BaseRepository';

const database = require('../database/DatabaseService');

export default class CampgroundRepository implements BaseRepository<Campground> {
	findAll(callback: any): void {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('SELECT * FROM campgrounds', (err: any, results: Campground[]) => {
					connection.release();

					if (err) {
						throw err;
					} else {
						callback(results);
					}
				});
			}
		});
	}

	findOneById(id: number, callback: any): void {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				let campground: any = [],
					comments: any = [];

				connection.query('SELECT * FROM campgrounds WHERE id = ?', [id], (err: any, result: Campground) => {
					if (err) {
						throw err;
					} else {
						campground = result[0];
					}
				});

				connection.query('SELECT * FROM comments WHERE campground_id = ?', [id], (err: any, result: Comment[]) => {
					connection.release();

					if (err) {
						throw err;
					} else {
						comments = result;
						callback({ campground: campground, comments: comments });
					}
				});
			}
		});
	}

	createOne(campground: Campground, callback: any): void {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('INSERT INTO campgrounds SET ?', campground, (err: any, result: any) => {
					connection.release();

					if (err) {
						throw err;
					} else {
						callback({ campground_id: result.insertId });
					}
				});
			}
		});
	}

	updateOne(campground: Campground): void {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('UPDATE campgrounds SET ? WHERE id = ?', [campground, campground.id], (err: any) => {
					connection.release();

					if (err) {
						throw err;
					}
				});
			}
		});
	}

	deleteOne(id: number): void {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('DELETE FROM campgrounds WHERE id = ?', [id], (err: any) => {
					connection.release();

					if (err) {
						throw err;
					}
				});
			}
		});
	}
}
