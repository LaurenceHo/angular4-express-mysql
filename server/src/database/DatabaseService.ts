import * as mysql from 'mysql';

export default class DatabaseService {
	pool: any = {};

	constructor() {
		this.pool = mysql.createPool({
			connectionLimit: 12,
			host: 'localhost',
			user: 'sa',
			password: '(IJN8uhb',
			database: 'yelpcamp',
			charset: 'utf8'
		});
	}

	query = (sql: string, values: any) => new Promise((resolve, reject) => {
		this.pool.getConnection((err: any, connection: any) => {
			if (err) {
				reject(err);
				throw err;
			} else {
				connection.query(sql, values, (err: any, results: any) => {
					console.log('SQL: ', sql);
					console.log('Query values: ', values);
					connection.release();

					if (err) {
						reject(err);
						throw err;
					} else {
						resolve(results);
					}
				});
			}
		});
	});
}

export const database = (() => {
	this.pool = mysql.createPool({
		connectionLimit: 12,
		host: 'localhost',
		user: 'sa',
		password: '(IJN8uhb',
		database: 'yelpcamp',
		charset: 'utf8'
	});

	this.getConnection = (cb: any) => {
		this.pool.getConnection(cb);
	};

	this.query = (sql: string, values: any) => new Promise((resolve, reject) => {
		this.pool.getConnection((err: any, connection: any) => {
			if (err) {
				reject(err);
				throw err;
			} else {
				connection.query(sql, values, (err: any, results: any) => {
					console.log('SQL: ', sql);
					console.log('Query values: ', values);
					connection.release();

					if (err) {
						reject(err);
						throw err;
					} else {
						resolve(results);
					}
				});
			}
		});
	});

	return this;
})();
