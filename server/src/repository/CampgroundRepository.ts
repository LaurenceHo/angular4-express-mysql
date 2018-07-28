import { Campground } from '../model/Campground';
import { BaseRepository } from './BaseRepository';

const database = require('../database/DatabaseService');

export default class CampgroundRepository implements BaseRepository<Campground> {
	findAll(): any {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('SELECT * FROM campgrounds', (err: any, results: Campground[]) => {
					connection.release();

					if (err) {
						throw err;
					} else {
						return results;
					}
				});
			}
		});
	}

	findOneById(): any {
		return undefined;
	}

	createOne(campground: Campground): number {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('INSERT INTO campgrounds SET ?', campground, (err: any, result: any) => {
					connection.release();

					if (err) {
						throw err;
					} else {
						return ({ campgroundId: result.insertId });
					}
				});
			}
		});

		return undefined;
	}

	updateOne(): void {
	}

	deleteOne(): void {
	}

}
