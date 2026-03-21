import express from 'express'
import { placeOrder, placeOrderRazorpay, verifyRazorpay, userOrders, allOrders, updateStatus } from '../controllers/orderController.js'
import authUser from '../middleware/authUser.js'
import authAdmin from '../middleware/authAdmin.js'

const orderRouter = express.Router()

// User routes
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)
orderRouter.post('/userorders', authUser, userOrders)

// Admin routes
orderRouter.post('/list', authAdmin, allOrders)
orderRouter.post('/status', authAdmin, updateStatus)

export default orderRouter
