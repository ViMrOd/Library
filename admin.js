const express = require('express');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

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

