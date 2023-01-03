const express = require('express')
const router = express.Router()

const { create, categoryById, read, update, remove, list } = require("../controller/category");
const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById } = require("../controller/user");

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.get('/category/:categoryId', read)
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.get('/categories', list)

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

router.param("categoryId", categoryById)

module.exports = router

