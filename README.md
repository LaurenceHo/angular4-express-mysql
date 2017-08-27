# Fullstack web application using Angular4, Primeng, Express, Mysql, Gulp and Passport.

## Introduction
This project demonstrates the basic CRUD functions combining Angular4, Primeng, Express, Mysql, Gulp and Passport. You can use this project creating and editing campground. It also uses Gulp for running task and TsLint. The seed application is built over node and uses latest node packages. This is my first fullstack Angular4 with nodejs web application, and it's still ongoing.

![Screen Shot 2016-10-22 at 19.41.26.png](https://bitbucket.org/repo/xbqg8L/images/3489819545-Screen%20Shot%202016-10-22%20at%2019.41.26.png)

## Prerequisites
The latest version of Nodejs need to be installed.

## Global packages
```
npm install ts-node -g
npm install typescript-node -g
```
    
## Api Document (from Express's view)
```
1. getAllCampgrounds    (GET)    http://localhost:8080/api/campground
2. createCampground     (POST)   http://localhost:8080/api/campground
3. getOneCampground     (GET)    http://localhost:8080/api/campground/:id
4. getOneCampground     (GET)    http://localhost:8080/api/campground/:id/edit
5. editCampground       (PUT)    http://localhost:8080/api/campground/:id/edit
5. deleteCampground     (DELETE) http://localhost:8080/api/campground/:id
6. createComment        (POST)   http://localhost:8080/api/comment
7. getComment           (GET)    http://localhost:8080/api/comment/:comment_id/edit
8. editComment          (PUT)    http://localhost:8080/api/comment/:comment_id/edit
9. deleteComment        (DELETE) http://localhost:8080/api/comment/:comment_id
10. signup               (POST)   http://localhost:8080/api/signup
11. login               (POST)   http://localhost:8080/api/login
12. logout              (GET)    http://localhost:8080/api/logout
13. profile             (GET)    http://localhost:8080/api/profile
```

### How do I get set up? ###

1.Clone the repo: 
```
git clone https://LaurenceHo@bitbucket.org/LaurenceHo/angular4-express-mysql.git
```
or
```
git clone https://github.com/bluegray1015/angular4-express-mysql.git
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