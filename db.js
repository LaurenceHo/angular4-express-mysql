const mysql = require('mysql');

const db = (function() {
    this.pool = mysql.createPool({
        connectionLimit: 12,
        host: 'localhost',
        user: 'sa',
        password: '(IJN8uhb',
        database: 'demo',
        charset: 'utf8'
    });

    this.getConnection = function(cb) {
        this.pool.getConnection(cb)
    };

    this.query = (sql, values) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql, values, (err, results) => {
                    connection.release();

                    if (err) {
                        console.log(err);
                    } else {
                        resolve(results);
                    }
                })
            }
        })
    });

    return this;
})();

module.exports = db;
