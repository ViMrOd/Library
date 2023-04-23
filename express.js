const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('library.db');
const app = express();
const port = 3000;

app.use(cors());

app.get('/customer/:id', (req, res) => {
	const customerId = req.params.id;
    try {
        const customer = db.prepare('SELECT * FROM customers WHERE customer_id = ?').get(customerId);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify([customer]));
    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for customer.');
    }
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});


app.get('/customer/:inputUsername/:inputPassword', (req, res) => {
    const inputUsername = req.params.inputUsername;
    const inputPassword = req.params.inputPassword;
    try {
        const user = db.prepare('SELECT * FROM customers WHERE username = ?').get(inputUsername);
        // user = user object from query

        console.log(user.password);


    } catch (error) {
        console.error(error);
		res.status(500).send('Error searching for username.');
    }


});
