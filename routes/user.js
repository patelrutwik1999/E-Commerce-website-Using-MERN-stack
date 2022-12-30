const express = require('express');
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controller/auth')
const { userById } = require("../controller/user");

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

//When there is a parameter call, we need to call userById method.
router.param("userId", userById);

module.exports = router