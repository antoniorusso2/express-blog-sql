//import express
const express = require('express');

//import file posts
// const posts = require('../posts.js');

//controller import
const postsController = require('../controllers/postController.js');
//middleware import per trasformare l'id inserito in url in un numero o uno slug
const numerifyId = require('../middlewares/numerifyId.js');

//destructuring oggetto esportato dal file posts controller
const { index, show, store, update, modify, destroy } = postsController;

//router
const router = express.Router();

//CRUD
//INDEX
router.get('/', index);

//SHOW
router.get('/:id', numerifyId, show);

//STORE
router.post('/', store);

//UPDATE
router.put('/:id', numerifyId, update);

//MODIFY
router.patch('/:id', numerifyId, modify);

//DESTROY
router.delete('/:id', numerifyId, destroy);

//export
module.exports = router;
