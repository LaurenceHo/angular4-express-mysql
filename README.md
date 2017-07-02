# Fullstack web application using Angular4, Primeng, Express, Sqlite3, Gulp and Passport.

## Introduction
This project demonstrates the basic CRUD functions combining Angular4, Primeng, Express, Sqlite3, Gulp and Passport. You can use this project creating and editing campground. It also uses Gulp for running task and TsLint. The seed application is built over node and uses latest node packages. This is my first fullstack Angular4 with nodejs web application, and it's still ongoing.

![Screen Shot 2016-10-22 at 19.41.26.png](https://bitbucket.org/repo/xbqg8L/images/3489819545-Screen%20Shot%202016-10-22%20at%2019.41.26.png)

## Prerequisites
The latest version of Nodejs need to be installed.

## Global packages
```
npm install ts-node -g
npm install typescript-node -g
```
    
## Api Document (from Express)
```
1. getAllCampgrounds    (GET)    http://localhost:8080/api/campground
2. getOneCampground     (GET)    http://localhost:8080/api/campground/detail/:id
3. createCampground     (POST)   http://localhost:8080/api/campground
4. editCampground       (PUT)    http://localhost:8080/api/campground/detail/:id
5. deleteCampground     (DELETE) http://localhost:8080/api/campground/:id
6. createComment        (POST)   http://localhost:8080/api/campground/detail/:id/comments
7. editComment          (PUT)    http://localhost:8080/api/campground/detail/:id/comments/:comment_id
8. deleteComment        (DELETE) http://localhost:8080/api/campground/detail/:id/comments/:comment_id
9. signup               (POST)   http://localhost:8080/api/signup
10. login               (POST)   http://localhost:8080/api/login
11. logout              (GET)    http://localhost:8080/api/logout
12. profile             (GET)    http://localhost:8080/api/profile
```

### How do I get set up? ###

1.Clone the repo: 
```
git clone https://LaurenceHo@bitbucket.org/LaurenceHo/angular2-express-sqlite3.git
```
or
```
git clone https://github.com/bluegray1015/angular2-express-sqlite3.git
```

2.Install npm package. Build and compile the dest folder: 
```
npm install
npm run build
```

3.Launch the server: 
```
npm run deploy
```

4.Visit in your browser: http://localhost:8080

### Reference
This project is based on https://github.com/moizKachwala/Angular2-express-mongoose-gulp-node-typescript. I learn a lot from this project.