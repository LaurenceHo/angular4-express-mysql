/**
 * Created by laurence-ho on 21/07/17.
 */

import { Passport } from 'passport';
let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require('bcrypt-nodejs');
let db = require('./database/database');

export = (passport: Passport) => {
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser((user: any, done: any) => {
		done(null, user.username);
	});

	// used to deserialize the user
	passport.deserializeUser((username, done) => {
		let query = 'SELECT * FROM users WHERE username = \'' + username + '\'';
		db.all(query, (err: any, rows: any) => {
			if (err) {
				console.error('error', err);
			} else {
				done(err, rows[0]);
			}
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup',
		new LocalStrategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req: any, username: string, password: string, done: any) => {
				console.log('---- User Signup: ' + username + ' ----');

				let query = 'SELECT * FROM users WHERE username = \'' + username + '\'';

				db.all(query, (err: any, rows: any) => {
					if (err) {
						return done(err);
					}

					if (rows.length) {
						return done(null, false, {message: 'This username is already taken.'});
					} else {
						// if there is no user with that username, create the user
						let newUserMysql = {
							username: username,
							password: bcrypt.hashSync(password, null, null) // use the generateHash function in our user model
						};

						let insertQuery = 'INSERT INTO users ( username, password ) values (\'' + newUserMysql.username + '\',\'' + newUserMysql.password + '\')';

						db.run(insertQuery, (err: any) => {
							if (err) {
								return done(err);
							}
							return done(null, newUserMysql);
						});
					}
				});
			})
	);

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login',
		new LocalStrategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req: any, username: string, password: string, done: any) => { // callback with email and password from our form
				console.log('---- User login: ' + username + ' ----');

				var query = 'SELECT * FROM users WHERE username = \'' + username + '\'';

				db.all(query, (err: any, rows: any) => {
					if (err) {
						return done(err);
					}

					if (!rows.length) {
						return done(null, false, {message: 'Unknown user: ' + username});
					} else {
						// if the user is found but the password is wrong
						if (!bcrypt.compareSync(password, rows[0].password)) {
							return done(null, false, {message: 'Invalid password'}); // create the loginMessage and save it to session as flashdata
						} else { // all is well, return successful user
							return done(null, rows[0]);
						}
					}
				});
			})
	);
};
