const express = require('express');
const router = express.Router();

const productsFavoriteController = require('../controllers/products-favorite');




router.get('/', productsFavoriteController.getAllFavoriteProducts);

router.post('/:id', productsFavoriteController.addToFavoriteProducts);

router.delete('/:id', productsFavoriteController.deleteFavoriteProductById);
router.delete('/', productsFavoriteController.deleteAllFavoriteProducts);

module.exports = router;