import { BaseRepository } from './BaseRepository';
import { Campground } from '../model/Campground';
import { Comment } from '../model/Comment';
import { database } from '../database/DatabaseService';

export default class CampgroundRepository implements BaseRepository<Campground> {
	findAll(callback: any): void {
		database.query('SELECT * FROM campgrounds').then((results: Campground[]) => callback(results));
	}

	findOneById(id: number, callback: any): void {
		database.query('SELECT * FROM campgrounds WHERE id = ?', [id]).then((campResult: Campground) => {
			let campground: any = [],
				comments: any = [];

			database.query('SELECT * FROM comments WHERE campground_id = ?', [id]).then((commentResult: Comment[]) => {
				campground = campResult[0];
				comments = commentResult;

				callback({ campground: campground, comments: comments });
			});
		});
	}

	createOne(campground: Campground, callback: any): void {
		database.query('INSERT INTO campgrounds SET ?', campground).then((result: any) => callback({ campground_id: result.insertId }));
	}

	updateOne(campground: Campground): void {
		database.query('UPDATE campgrounds SET ? WHERE id = ?', [campground, campground.id]);
	}

	deleteOne(id: number): void {
		database.query('DELETE FROM campgrounds WHERE id = ?', [id]);
	}
}
