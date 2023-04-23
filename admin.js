const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('customers.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the library database.');
});

app.get('/customer/:id', (req, res) => {
	const customerId = req.params.id;

	db.all('SELECT * FROM customers WHERE id = ?', [customerId], (err, rows) => {
		if (err) {
			console.error(err.message);
			res.status(500).send('Error searching for customer.');
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(rows));
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

