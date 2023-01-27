//All the routes related to the payment
const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById, addOrderToHistory } = require('../controller/user');
const { create, listOrders, getStatusValue, orderById, updateOrderStatus } = require('../controller/order');
const { decreaseQuantity } = require('../controller/product');

router.post('/order/create/:userId', requireSignIn, isAuth, addOrderToHistory, decreaseQuantity, create)
router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requireSignIn, isAdmin, isAuth, getStatusValue)
router.put('/order/:orderId/status/:userId', requireSignIn, isAuth, isAdmin, updateOrderStatus)


router.param('userId', userById)
router.param('orderId', orderById)

module.exports = router