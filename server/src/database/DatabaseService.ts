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

	getConnection = (callback: any) => {
		this.pool.getConnection(callback);
	};

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
						console.log('Query results:', JSON.stringify(results));
						resolve(results);
					}
				});
			}
		});
	});

	destroy = () => {
		this.pool.end((err: any) => console.error(err));
	}
}
