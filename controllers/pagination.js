const fs = require('fs');


let products = [];

fs.readFile('./db/products.json', 'utf-8', (err, data) => {
	if (err) throw err;
	products = JSON.parse(data);
});

const paginationProducts = (req, res) => {
	const page = +req.query.page;
	const limit = +req.query.limit;

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const result = {};

	if (endIndex < products.length) {
		result.next = {
			page: page + 1,
			limit: limit,
		}
	}

	if (startIndex > 0) {
		result.previous = {
			page: page - 1,
			limit: limit,
		}
	}

	result.productsPage = products.slice(startIndex, endIndex);

	res.send(result);
}

module.exports = {
	paginationProducts,
}