const categories = require('../categories.js');

function sendCategories(req, res) {
  console.log(req, res);
  res.json(categories);
}

module.exports = { sendCategories };
