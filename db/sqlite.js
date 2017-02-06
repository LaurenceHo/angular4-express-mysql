/**
 * Created by Laurence Ho on 06/02/2017
 * This is file is for SQLite3 configuration
 */

var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/camp.sqlite');

var sql_user = 'CREATE TABLE IF NOT EXISTS users (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'username TEXT NOT NULL,' +
    'password TEXT NOT NULL' +
    ')';

var sql_camp = 'CREATE TABLE IF NOT EXISTS campgrounds (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'name TEXT NOT NULL,' +
    'image TEXT NOT NULL,' +
    'username TEXT NOT NULL,' +
    'user_id INTEGER NOT NULL,' +
    'description TEXT,' +
    'FOREIGN KEY (user_id) REFERENCES users (id)' +
    ')';

var sql_commemt = 'CREATE TABLE IF NOT EXISTS comments (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'username TEXT NOT NULL,' +
    'user_id INTEGER NOT NULL,' +
    'text TEXT NOT NULL,' +
    'campground_id INTEGER NOT NULL,' +
    'FOREIGN KEY (user_id) REFERENCES users (id),' +
    'FOREIGN KEY (campground_id) REFERENCES campgrounds (id)' +
    ')';

db.serialize(function () {
    db.run(sql_user);
    db.run(sql_camp);
    db.run(sql_commemt);
});

module.exports = db;
