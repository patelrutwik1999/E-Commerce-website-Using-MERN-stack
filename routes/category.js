const express = require('express')
const router = express.Router()

const { create } = require("../controller/category");
const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById } = require("../controller/user");

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create)

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

module.exports = router

