const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

app.use(cors());

app.get('/books', (req, res) => {
    try {
        const books = db.prepare(`select * from books natural join branches`).all();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(books));

    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for books.');
    }

});

app.get('/checkout/:bookID/:userID', (req, res) => {
    try {
        const bookID = req.params.bookID;
        const userID = req.params.userID;
        const checkout = db.prepare(`select book_id from checkouts where user_id = ? and book_id = ?`).get(userID, bookID);
        if (checkout) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify("You have already checked out this book"));
        } else {
            db.prepare(`
                INSERT INTO checkouts
                (user_id, book_id, checkout_date, return_date)
                VALUES (?, ?, CURRENT_DATE, date(CURRENT_DATE, '+10 days'));`).run(userID, bookID);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify("Successful checkout"));
        }

    } catch (error) {
        console.error(error);
		res.status(500).send('Error checking out.');
    }
});

app.get('/books/:branchName', (req, res) => {
    try {
        const branchName = req.params.branchName;
        const branch = db.prepare(`select branch_id from branches where branch_name = ?`).get(branchName);
        const books = db.prepare(`select * from books natural join branches where branch_id = ?`).all(branch.branch_id);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(books));

    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for books with branch name.');
    }
});

app.get('/user/:identifier', (req, res) => {
	const identifier = req.params.identifier;
    try {
        const user = db.prepare('select * from users natural join checkouts natural join books where user_id = ? or username = ?').all(identifier, identifier);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for user.');
    }
});

app.put('/user/:identifier/:bookID/:date', (req, res) => {
    const { identifier, date, bookID } = req.params;
    // date == '2023-04-27'
    console.log(identifier, date, bookID);
    try {
        const query = db.prepare(`UPDATE checkouts
            SET return_date = DATE(?)
            WHERE user_id IN (
                SELECT user_id FROM users natural join checkouts WHERE (user_id = ? OR username = ?) AND (book_id = ?)
            )`);
        query.run(date, identifier, identifier, bookID);
        res.status(200).send('Return date updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Updating return date for customer.');
    }
});

app.get('/login/:inputUsername/:inputPassword', (req, res) => {
    const inputUsername = req.params.inputUsername;
    try {
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(inputUsername);
        res.send(JSON.stringify(user));

    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for username.');
    }

});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
