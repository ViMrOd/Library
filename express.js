const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

app.use(cors());

app.get('/books', (req, res) => {
    try {
        // user = user object from query
        const books = db.prepare(`select * from books`).all();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(books));

    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for books.');
    }

});

app.get('/user/:identifier', (req, res) => {
	const identifier = req.params.identifier;
    try {
        const user = db.prepare('SELECT * FROM users WHERE user_id = ? or username = ?').get(identifier, identifier);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify([user]));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for user.');
    }
});

app.put('/user/:identifier/:date', (req, res) => {
    const { identifier, date } = req.params;
    try {
        const query = db.prepare('UPDATE users SET return_date = ? WHERE user_id = ? OR username = ?');
        const result = query.run(date, identifier, identifier);
        res.status(200).send('Return date updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating return date for customer.');
    }
});

app.get('/login/:inputUsername/:inputPassword', (req, res) => {
    const inputUsername = req.params.inputUsername;
    const inputPassword = req.params.inputPassword;
    try {
        // user = user object from query
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify());

    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for username.');
    }

});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
