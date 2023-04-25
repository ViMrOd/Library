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
        checkout_count integer default 0 check (checkout_count >= 0)
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
        where branch_id = (select branch_id from books where book_id = new.book_id);
    end;

    insert or replace into branches
        (branch_name)
        values('aurora');

    insert or replace into branches
        (branch_name)
        values('streetsboro');

    insert or replace into branches
        (branch_name)
        values('kent');

    insert or replace into users
        (username, password, is_admin)
        values ('bob', '1234', 0);

    insert or replace into users
        (username, password, is_admin)
        values ('shelly', '4321', 1);

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Blaming the User', 1, 'You''re a 10x hacker and it must be someone else''s fault', 'The Practical Dev', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Buzzword First Design', 1, 'Fashion-forward development', 'The Practical Dev', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Coding Drunk', 1, 'Make Programming Fun Again', 'N.E. Briated', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Googling the Error Message', 2, 'The internet will make those bad words go away', 'The Practical Dev', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Memorizing Six Git Commands', 2, 'The popular approach to version control', 'The Practical Dev', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Web Development With Assembly', 2, 'You might as well just yourself right now', 'Bob Johnson (with his therapist)', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Works on My Machine', 3, 'How to convince your manager', 'R. William', 'ORLY');

    insert or replace into books
        (title, branch_id, subtitle, author, publisher)
        values ('Writing Code That Nobody Else can Read', 3, 'Does it run? Just leave it alone.', 'The Practical Dev', 'ORLY');

    insert or replace into checkouts
        values (1, 2, DATE('2023-04-20'), DATE('2023-04-20'), 0);

    insert or replace into checkouts
        values (2, 1, DATE('2023-04-20'), DATE('2023-04-23'), 0);
`);
