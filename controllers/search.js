const fs = require('fs');


let products = [];

fs.readFile('./db/products.json', 'utf-8', (err, data) => {
	if (err) throw err;
	products = JSON.parse(data);
});

const filterProducts = (req, res) => {
	const textSearch = req.query.q;
	const brand = req.query.brand;
	const category = req.query.category;
	const minPrice = req.query.minPrice;
	const maxPrice = req.query.maxPrice;
	const minRating = req.query.minRating;
	const maxRating = req.query.maxRating;

	const filteredProducts = products.filter(product => {
		const isTextSearch = textSearch ? product.title.includes(textSearch) : true;
		const isBrand = brand ? product.brand === brand : true;
		const isCategory = category ? product.category === category : true;
		const isInPriceRange = (minPrice && maxPrice)
			? (product.price >= minPrice && product.price <= maxPrice)
			: true;
		const isInRatingRange = (minRating && maxRating)
			? (product.rating >= minRating && product.rating <= maxRating)
			: true;

		if (isTextSearch && isBrand && isCategory && isInPriceRange && isInRatingRange) {
			return product;
		}
	})
	res.send(filteredProducts);
}

module.exports = {
	filterProducts,
}