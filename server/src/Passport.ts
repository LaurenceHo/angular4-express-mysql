/**
 * Created by laurence-ho on 21/07/17.
 */

import * as bcrypt from 'bcrypt-nodejs';
import { Passport } from 'passport';
import { Strategy } from 'passport-local';
import { database } from './database/DatabaseService';

export = (passport: Passport) => {
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser((user: any, done: any) => {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser((id: any, done: any) => {
		database.getConnection((err: any, connection: any) => {
			if (err) {
				console.error('error', err);
				return done(err);
			} else {
				connection.query('SELECT * FROM users WHERE id = ?', [id], (err: any, rows: any) => {
					connection.release();

					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						done(null, rows[0]);
					}
				});
			}
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup',
		new Strategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req: any, username: string, password: string, done: any) => {
				console.log('---- User Signup: ' + username + ' ----');

				database.getConnection((err: any, connection: any) => {
					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						connection.query('SELECT * FROM users WHERE username = ?', [username], (err: any, rows: any) => {
							if (err) {
								console.error('error', err);
								return done(err);
							}

							if (rows.length) {
								return done(err, false, { message: 'This username is already taken.' });
							} else {
								// if there is no user with that username, create the user
								let newUserMysql = {
									username: username,
									password: bcrypt.hashSync(password, null) // use the generateHash function in our user model
								};

								let insertQuery = 'INSERT INTO users ( username, password ) values (?,?)';

								connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], (err: any, rows: any) => {
									connection.release();
									if (err) {
										console.error('error', err);
										return done(err);
									}

									newUserMysql = rows;

									return done(null, newUserMysql);
								});
							}
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
		new Strategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req: any, username: string, password: string, done: any) => { // callback with email and password from our form
				console.log('---- User login: ' + username + ' ----');

				database.getConnection((err: any, connection: any) => {
					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						connection.query('SELECT * FROM users WHERE username = ?', [username], (err: any, rows: any) => {
							connection.release();

							if (err) {
								console.error('error', err);
								return done(err);
							}

							if (rows.length) {
								// if the user is found but the password is wrong
								if (!bcrypt.compareSync(password, rows[0].password)) {
									return done(err, false, { message: 'User name or password is wrong' });
								} else {
									// all is well, return successful user
									return done(null, rows[0]);
								}
							} else {
								return done(err, false, { message: 'User name or password is wrong' });
							}
						});
					}
				});
			})
	);
};
