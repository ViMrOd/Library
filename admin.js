const express = require('express');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

app.get('/admin/:id', (req, res) => {
	const customerId = req.params.id;
    try {
        const customer = db.prepare('SELECT * FROM customers WHERE customer_id = ?').get(customerId);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(customer));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for customer.');
    }
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

