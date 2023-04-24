const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

app.use(cors());

app.get('/customer/:inputUsername/:inputPassword', (req, res) => {
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

app.get('/customer/:id', (req, res) => {
	const user = req.params.id;
    try {
        const user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify([user]));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for customer.');
    }
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
