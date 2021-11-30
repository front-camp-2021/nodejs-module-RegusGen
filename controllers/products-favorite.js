const fs = require('fs');


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



const getAllFavoriteProducts = (req, res) => {
	let productsFavorite = products.filter(product => product.isFavorite === true);
	res.send(productsFavorite);
}

const addToFavoriteProducts = (req, res) => {
	const { id } = req.params;

	products = products.map(product => {
		if (product.id === id) {
			return {
				...product,
				isFavorite: true,
			}
		}
		return product
	})
	writeToFile(products, res);
}

const deleteFavoriteProductById = (req, res) => {
	const { id } = req.params;

	products = products.map(product => {
		if (product.id === id) {
			return {
				...product,
				isFavorite: false,
			}
		}
		return product;
	})
	writeToFile(products, res);
}

const deleteAllFavoriteProducts = (req, res) => {
	products = products.map(product => {
		if (product.isFavorite) {
			return {
				...product,
				isFavorite: false,
			}
		}
		return product;
	})
	writeToFile(products, res);
}


module.exports = {
	getAllFavoriteProducts,
	addToFavoriteProducts,
	deleteFavoriteProductById,
	deleteAllFavoriteProducts,
}