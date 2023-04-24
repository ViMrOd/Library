const db = require('better-sqlite3')('library.db');

db.exec(`
    create table if not exists users (
        user_id integer NOT NULL primary key autoincrement,
        username varchar(256) unique NOT NULL,
        password varchar(256) NOT NULL,
        is_admin bool default 0
    );

    create table if not exists books (
        book_id integer NOT NULL primary key autoincrement,
        branch_id integer references branches(branch_id),
        title varchar(256) NOT NULL,
        subtitle varchar(256),
        author varchar(256),
        publisher varchar(256)
    );

    create table if not exists checkouts (
        user_id integer references users(user_id),
        book_id integer references books(book_id),
        checkout_date date DEFAULT CURRENT_DATE,
        return_date date NOT NULL check(return_date >= checkout_date),
        fine integer default 0,
        primary key(user_id, book_id)
    );

    create table if not exists branches (
        branch_id integer NOT NULL primary key autoincrement,
        branch_name varchar(20) NOT NULL,
        checkout_count integer default 0 check (checkout_count >= 0),
    );

    create table if not exists user_addresses (
        user_id integer NOT NULL primary key references users(user_id),
        street varchar(256),
        city varchar(256),
        state varchar(256)
    );

    create trigger increment_checkout_count
    after insert on checkouts
    begin
        update branches
        set checkout_count = checkout_count + 1
        where branch_id = (select branch_id from books where book_id = new.book_id)
    end;

    insert or replace into users
        (username, password, is_admin)
        values ('bob', '1234', 0);

    insert or replace into users
        (username, password, is_admin)
        values ('shelly', '4321', 1);

    insert or replace into books
        (title, author, publisher)
        values ('test1', 'test11', 'test111');

    insert or replace into books
        (title, author, publisher)
        values ('test2', 'test22', 'test222');

    insert or replace into checkouts
        values (1, 2, DATE('2023-04-20'), DATE('2023-04-20'), 0);

    insert or replace into checkouts
        values (2, 1, DATE('2023-04-20'), DATE('2023-04-23'), 0);
`);
