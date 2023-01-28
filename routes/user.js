const express = require('express');
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById, read, update, purchaseHistory } = require("../controller/user");

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignIn, isAuth, read)
router.put('/user/:userId', requireSignIn, isAuth, update)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

module.exports = router