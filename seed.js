const db = require('better-sqlite3')('library.db');

db.exec(`
    create table if not exists users (
        user_id integer NOT NULL primary key autoincrement,
        username varchar(20) NOT NULL,
        password varchar(20) NOT NULL,
        isAdmin bool default 0,
        fine integer
    );

    insert or replace into users
        (username, password, isAdmin, fine)
        values ('bob', 0, '1234', 50);

    insert or replace into users
        (username, password, isAdmin, fine)
        values ('shelly', 1,'43210000', 50);

`);
