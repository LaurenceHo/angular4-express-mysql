/**
 * Created by laurence-ho on 21/07/17.
 */

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./dist/server/database/yelpcamp.sqlite');

const sql_user = 'CREATE TABLE IF NOT EXISTS users (' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
	'username TEXT NOT NULL,' +
	'password TEXT NOT NULL' +
	')';

const sql_camp = 'CREATE TABLE IF NOT EXISTS campgrounds (' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
	'name TEXT NOT NULL,' +
	'image TEXT NOT NULL,' +
	'username TEXT NOT NULL,' +
	'user_id INTEGER NOT NULL,' +
	'description TEXT VARCHAR(255),' +
	'price INTEGER NOT NULL,' +
	'FOREIGN KEY (user_id) REFERENCES users (id)' +
	')';

const sql_commemt = 'CREATE TABLE IF NOT EXISTS comments (' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
	'username TEXT NOT NULL,' +
	'user_id INTEGER NOT NULL,' +
	'text TEXT VARCHAR(255) NOT NULL,' +
	'campground_id INTEGER NOT NULL,' +
	'FOREIGN KEY (user_id) REFERENCES users (id),' +
	'FOREIGN KEY (campground_id) REFERENCES campgrounds (id)' +
	')';

database.serialize(() => {
	database.run(sql_user);
	database.run(sql_camp);
	database.run(sql_commemt);
});

export = database;