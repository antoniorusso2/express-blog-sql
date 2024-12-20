const posts = require('./posts.js');

const categories = [];

posts.forEach((post) => post.tags.forEach((tag) => !categories.includes(tag) && categories.push(tag)));

module.exports = categories;
