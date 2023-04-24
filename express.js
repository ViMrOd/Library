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

app.get('/customer/:id', (req, res) => {
	const user = req.params.id;
    try {
        const user = db.prepare('SELECT * FROM users WHERE user_id = ? or username = ?').get(userId);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify([user]));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for customer.');
    }
});

app.put('/customer/:id/:date', (req, res) => {
    const { id, date } = req.params;
    try {
        const query = db.prepare('UPDATE users SET return_date = ? WHERE user_id = ? OR username = ?');
        const result = query.run(date, id, id);
        res.status(200).send('Return date updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating return date for customer.');
    }
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
