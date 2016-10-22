module.exports = function(db) {

    var sql_user = 'CREATE TABLE IF NOT EXISTS `USER` (' +
        '`ID` int(11) NOT NULL AUTO_INCREMENT,' +
        '`USERNAME` varchar(255) NOT NULL,' +
        '`PASSWORD` varchar(255) NOT NULL,' +
        'PRIMARY KEY(`ID`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    var sql_camp = 'CREATE TABLE IF NOT EXISTS `CAMPGROUND` (' +
        '`ID` int(11) NOT NULL AUTO_INCREMENT,' +
        '`NAME` varchar(255) NOT NULL,' +
        '`IMAGE` varchar(255) NOT NULL,' +
        '`DESCRIPTION` TEXT,' +
        'PRIMARY KEY(`ID`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    var sql_commemt = 'CREATE TABLE IF NOT EXISTS `COMMENT` (' +
        '`ID` int(11) NOT NULL AUTO_INCREMENT,' +
        '`AUTHOR` varchar(255) NOT NULL,' +
        '`TEXT` TEXT NOT NULL,' +
        '`CAMPGROUND_ID` int(11) NOT NULL,' +
        'PRIMARY KEY(`ID`),' +
        'CONSTRAINT `FK_CAMPGROUND` FOREIGN KEY (`CAMPGROUND_ID`) REFERENCES `CAMPGROUND` (`ID`)' +
        ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql_user, (err, rows) => {});
            connection.query(sql_camp, (err, rows) => {});
            connection.query(sql_commemt, (err, rows) => {
                connection.release();
            });
        }
    });
};
