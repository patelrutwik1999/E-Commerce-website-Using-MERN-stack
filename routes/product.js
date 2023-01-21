const express = require('express')
const router = express.Router()

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch } = require("../controller/product");
const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById } = require("../controller/user");

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)
//used put when we need to update
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update)

router.get('/products', list)

router.get('/products/related/:productId', listRelated)

//Get Categories by products
router.get('/products/categories', listCategories)

router.post('/products/by/search', listBySearch)
router.get("/product/photo/:productId", photo)

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

//Whenever there will any request with product id, productById will make that product available there.
router.param("productId", productById);

router.get("/products/search", listSearch);

module.exports = router

