//All the routes related to the payment
const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controller/auth');
const { userById } = require('../controller/user');
const { generateToken, processPayment } = require('../controller/braintree');

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment)

router.param('userId', userById)

module.exports = router