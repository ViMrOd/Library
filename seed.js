import { database } from "./globals.js"

database.prepare('drop table if exists test').run();
database.prepare('create table test (message varchar(20), numb int)').run();
const testString = "Hello world";
const testNum = 5;
database.prepare('insert into test values(?, ?)').run(testString, testNum);
database.prepare('insert into test values(?, 5)').run("Goodbye world");

const row = database.prepare('select * from test').get();
console.log(row);

