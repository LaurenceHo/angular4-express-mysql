module.exports = function(db) {

    var sql_user = 'CREATE TABLE IF NOT EXISTS `users` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT,' +
        '`username` varchar(255) NOT NULL,' +
        '`password` varchar(255) NOT NULL,' +
        'PRIMARY KEY(`id`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    var sql_camp = 'CREATE TABLE IF NOT EXISTS `campgrounds` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT,' +
        '`name` varchar(255) NOT NULL,' +
        '`image` varchar(255) NOT NULL,' +
        '`username` varchar(255) NOT NULL,' +
        '`user_id` int(11) NOT NULL,' +
        '`description` TEXT,' +
        'PRIMARY KEY(`id`),' +
        'CONSTRAINT `FK_USER_CAMP` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    var sql_commemt = 'CREATE TABLE IF NOT EXISTS `comments` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT,' +
        '`username` varchar(255) NOT NULL,' +
        '`user_id` int(11) NOT NULL,' +
        '`text` TEXT NOT NULL,' +
        '`campground_id` int(11) NOT NULL,' +
        'PRIMARY KEY(`id`),' +
        'CONSTRAINT `FK_USER_COMMENT` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),' +
        'CONSTRAINT `FK_CAMP_COMMENT` FOREIGN KEY (`campground_id`) REFERENCES `campgrounds` (`id`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql_user, (err, rows) => {
                if (err) {
                    console.log(err);
                }
            });
            connection.query(sql_camp, (err, rows) => {
                if (err) {
                    console.log(err);
                }
            });
            connection.query(sql_commemt, (err, rows) => {
                if (err) {
                    console.log(err);
                }
            });

            connection.release();
        }
    });
};
