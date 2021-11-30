const fs = require('fs');


let products = [];

fs.readFile('./db/products.json', 'utf-8', (err, data) => {
	if (err) throw err;
	products = JSON.parse(data);
});


const getProductById = (req, res) => {
	const { id } = req.params;
	const product = products.filter((product) => product.id === id);
	res.send(product);
}

const getAllProducts = (req, res) => {
	res.send(products)
}


module.exports = {
	getAllProducts,
	getProductById,
}