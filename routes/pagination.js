const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/pagination');


router.get('/', paginationController.paginationProducts);

module.exports = router;