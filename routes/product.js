const express = require('express')
const router = express.Router()

const { create, productById, read, remove } = require("../controller/product");
const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById } = require("../controller/user");

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

//Whenever there will any request with product id, productById will make that product available there.
router.param("productId", productById);

module.exports = router

