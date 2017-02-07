var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');
var db = require('./sqlite');

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function (username, done) {
        var query = "SELECT * FROM users WHERE username = '" + username + "'";
        db.all(query, function (err, rows) {
            if (err) {
                req.flash('error', err);
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
            function (req, username, password, done) {
                console.log('---- User Signup ----');
                console.log('username:' + username);

                var query = "SELECT * FROM users WHERE username = '" + username + "'";

                db.all(query, function (err, rows) {
                    if (err) {
                        return done(err);
                    }

                    if (rows.length) {
                        return done(null, false, req.flash('error', 'That username is already taken.'));
                    } else {
                        // if there is no user with that username, create the user
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null) // use the generateHash function in our user model
                        };

                        var insertQuery = "INSERT INTO users ( username, password ) values ('" + newUserMysql.username + "','" + newUserMysql.password + "')";

                        db.run(insertQuery, function (err) {
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
            function (req, username, password, done) { // callback with email and password from our form
                console.log('---- User login ----');
                console.log('username:' + username);

                var query = "SELECT * FROM users WHERE username = '" + username + "'";

                db.all(query, function (err, rows) {
                    if (err) {
                        return done(err);
                    }

                    if (!rows.length) {
                        return done(null, false, req.flash('error', 'No user found.'));
                    } else {
                        // if the user is found but the password is wrong
                        if (!bcrypt.compareSync(password, rows[0].password)) {
                            return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                        } else { // all is well, return successful user
                            return done(null, rows[0], req.flash('success', 'Welcome to YelpCamp ' + username));
                        }
                    }
                });
            })
    );
};
