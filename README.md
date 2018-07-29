# Fullstack web application using Angular4, Bootstrap4, Primeng, Express, Mysql, Gulp and Passport.

## Introduction
This project demonstrates the basic CRUD functions combining Angular4, Bootstrap4, Primeng, Express, Mysql, Gulp4 and Passport. 
It also uses Gulp for running task and TsLint. You can use this web application doing user signup/login, campground create/edit/delete, 
and comment create/edit/delete.

![Screen Shot](https://bitbucket.org/repo/xbqg8L/images/3191778081-Screen%20Shot%202018-07-28%20at%2018.45.57.png)

## Prerequisites
1. The latest version of Nodejs need to be installed.
2. MySQL

### Docker MySQL container preparation
1. Run `docker pull mysql:5`
2. Run `docker run --name mysql5 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5`
3. Run `docker run -it --link mysql5:mysql --rm mysql:5 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'`
4. Setup database and user
    
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
10. signup              (POST)   http://localhost:8080/api/signup
11. login               (POST)   http://localhost:8080/api/login
12. logout              (GET)    http://localhost:8080/api/logout
13. profile             (GET)    http://localhost:8080/api/profile
```

### How do I get set up? ###

* Clone the repo: 
```
git clone https://LaurenceHo@bitbucket.org/LaurenceHo/angular4-express-mysql.git
```
or
```
git clone https://github.com/LaurenceHo/angular4-express-mysql.git
```

* Install npm package. Build and compile the dist folder: 
```
npm install
npm run build
```

* Launch the whole web application: 
```
npm run start-all
```

* If you want to run client and server separately:

Run `npm run start-server` and `npm run start-client`

* Visit in your browser: `http://localhost:8080`

### Reference
This project is based on https://github.com/moizKachwala/Angular2-express-mongoose-gulp-node-typescript. I learnt a lot from this project.

### Existing major issues:
1. browserSync cannot reload the browser automatically when modifying client side code.
2. When user refreshes the browser, the login session would be gone, and user needs to login again. 
