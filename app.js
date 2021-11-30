const express = require("express");
const bodyParser = require("body-parser")

let products = require('./routes/products');
let productsFavorite = require('./routes/products-favorite');
let search = require('./routes/search');
let pagination = require('./routes/pagination')

const app = express();

const port = 5000;

function checkUrl(req, res, next) {
	console.log('current url: http://localhost:5000' + req.url);
	next();
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(checkUrl);

app.use('/products', products);
app.use('/favorites', productsFavorite);
app.use('/search', search);
app.use('/pagination', pagination);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
