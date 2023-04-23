const db = require('better-sqlite3')('library.db');

db.exec(`
    create table if not exists customers (
        customer_id integer NOT NULL primary key autoincrement,
        customer_name varchar(20) NOT NULL,
        fine integer
    );
    insert or replace into customers
        (customer_name, fine)
        values ('bob', 20);

`);
