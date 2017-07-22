/**
 * Created by laurence-ho on 21/07/17.
 */

import express = require('express');
import session = require('express-session');
const expressSanitizer = require('express-sanitizer');
import bodyParser = require('body-parser');
import path = require('path');

import passport = require('passport');

//initial database schema
require('./database/database');
require('./passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(expressSanitizer());

app.use(session({
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//initial routes
const userRoutes = require('./routes/user');
const campgroundRoutes = require('./routes/campground');
const commentRoutes = require('./routes/comment');

app.use('/api', userRoutes);
app.use('/api', campgroundRoutes);
app.use('/api', commentRoutes);

app.get('/', (req: any, res: any) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('*', (req: any, res: any) => {
	res.send('Sorry, page not found!');
});

app.listen(8080, () => {
	console.log('This express angular app is listening on port:' + 8080);
});

export = app;