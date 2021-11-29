const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser")

const app = express();

const port = 5000;

let products = [];

fs.readFile('./db/products.json', 'utf-8', (err, data) => {
	if (err) throw err;
	products = JSON.parse(data);
});

const writeToFile = (list, res) => {
	fs.writeFile('./db/products.json', JSON.stringify(list), err => {
		if (err) throw err;
		res.send(list);
	});
};

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/products', (req, res) => {
	res.send(products);
});

app.get('/products/:id', (req, res) => {
	const { id } = req.params;

	const product = products.filter((product) => product.id === id);

	res.send(product);
});

app.post('/products', (req, res) => {
	const { product } = req.body;

	products.push(product);

	writeToFile(products, res);
});

app.put('/products/:id', (req, res) => {
	const { id } = req.params;
	const { product } = req.body;

	products = products.map((existingProduct) => (
		existingProduct.id === id ? product : existingProduct
	));
	writeToFile(products, res);
});

app.delete('/products/:id', (req, res) => {
	const { id } = req.params;

	products = products.filter((product) => product.id !== id);

	writeToFile(products, res);
});

app.delete('/products', (req, res) => {
	products = [];

	writeToFile(products, res);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
