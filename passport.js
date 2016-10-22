var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');
var db = require('./db');

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query('SELECT * FROM USER WHERE ID = ?', [id], function(err, rows) {
                    connection.release();

                    if (err) {
                        console.log(err);
                    } else {
                        done(err, rows[0]);
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
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                console.log('-- User Signup --');
                console.log('username:' + username);
                console.log('password:' + password);

                db.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                    } else {
                        connection.query("SELECT * FROM USER WHERE USERNAME = ?", [username], function(err, rows) {
                            if (err)
                                return done(err);
                            if (rows.length) {
                                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                            } else {
                                // if there is no user with that username
                                // create the user
                                var newUserMysql = {
                                    username: username,
                                    password: bcrypt.hashSync(password, null, null) // use the generateHash function in our user model
                                };

                                var insertQuery = "INSERT INTO USER ( username, password ) values (?,?)";

                                connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function(err, rows) {
                                    newUserMysql.id = rows.insertId;

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
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                console.log('-- User login --');
                console.log('username:' + username);
                console.log('password:' + password);

                db.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                    } else {
                        connection.query("SELECT * FROM USER WHERE USERNAME = ?", [username], function(err, rows) {
                            if (err)
                                return done(err);
                            if (!rows.length) {
                                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                            }

                            // if the user is found but the password is wrong
                            if (!bcrypt.compareSync(password, rows[0].password))
                                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                            // all is well, return successful user
                            return done(null, rows[0]);
                        });
                    }
                });
            })
    );
};
