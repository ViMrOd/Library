const db = require('better-sqlite3')('library.db');

db.prepare('drop table if exists test').run();
db.prepare('create table test (message varchar(20), numb int)').run();
const testString = "Hello world";
const testNum = 5;
db.prepare('insert into test values(?, ?)').run(testString, testNum);
db.prepare('insert into test values(?, 5)').run("Goodbye world");

const row = db.prepare('select * from test').get();
console.log(row);

