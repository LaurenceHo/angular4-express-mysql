import { campground } from '../model/campground';
import { BaseRepository } from './baseRepository';

const db = require('../database/db.service');

export default class CampgroundRepository implements BaseRepository {
	findAll(): any {
		db.getConnection((err: any, connection: any) => {
			if (err) {
				throw err;
			} else {
				connection.query('SELECT * FROM campgrounds', (err: any, results: campground[]) => {
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

	createOne(): number {
		return undefined;
	}

	updateOne(): void {
	}

	deleteOne(): void {
	}

}
