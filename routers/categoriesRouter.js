const express = require('express');

const categoriesController = require('../controllers/categoriesController.js');
const { sendCategories } = categoriesController;

console.log(sendCategories);
//router
const router = express.Router();

router.get('/', sendCategories);

module.exports = router;
