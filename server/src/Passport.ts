/**
 * Created by laurence-ho on 21/07/17.
 */

import * as bcrypt from 'bcrypt-nodejs';
import { Passport } from 'passport';
import { Strategy } from 'passport-local';
import UserRepository from './repository/UserRepository';

const userRepository = new UserRepository();

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
		try {
			userRepository.findOneById(id, (result: any) => {
				done(null, result);
			});
		} catch (err) {
			return done(err);
		}
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup',
		new Strategy({
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req: any, username: string, password: string, done: any) => {
				try {
					userRepository.findOneByUsername(username, (result: any) => {
						if (result) {
							return done(false, { message: 'This username is already taken.' });
						} else {
							// if there is no user with that username, create the user
							let newUser = {
								id: 0,
								username: username,
								password: bcrypt.hashSync(password, null)
							};
							userRepository.createOne(newUser, (result: any) => {
								newUser.id = result.user_id;
								done(null, newUser)
							});
							return done;
						}
					});
				} catch (err) {
					return done(err);
				}
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
				try {
					userRepository.findOneByUsername(username, (result: any) => {
						if (result) {
							// if the user is found but the password is wrong
							if (!bcrypt.compareSync(password, result.password)) {
								return done(null, false, { message: 'User name or password is wrong' });
							} else {
								// all is well, return successful user
								return done(null, result);
							}
						} else {
							return done(null, false, { message: 'User name or password is wrong' });
						}
					});
				} catch (err) {
					return done(err);
				}
			})
	);
};
