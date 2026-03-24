import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'

/*
// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

*/
// Place order (COD) — kept as fallback
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
            statusUpdates: { 'Order Placed': Date.now() }
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Place order via Razorpay — creates Razorpay order + saves to DB
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        // Save order to DB first (payment: false until verified)
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'RAZORPAY',
            payment: false,
            date: Date.now(),
            statusUpdates: { 'Order Placed': Date.now() }
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        // Create Razorpay order (amount in paise)
        const razorpayOrder = await razorpayInstance.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: newOrder._id.toString()
        })

        res.json({
            success: true,
            order: razorpayOrder,
            orderId: newOrder._id
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify Razorpay payment signature and mark order as paid
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, userId } = req.body

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex')

        if (expectedSign !== razorpay_signature) {
            return res.json({ success: false, message: 'Payment verification failed' })
        }

        // Mark order as paid
        await orderModel.findByIdAndUpdate(orderId, { payment: true })

        // Clear user cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Payment verified successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get orders for a specific user
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// List all orders (admin)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update order status (admin)
const updateStatus = async (req, res) => {
    try {
        const { orderId, status, expectedDelivery } = req.body
        const order = await orderModel.findById(orderId)
        const updatedStatusUpdates = { ...(order.statusUpdates || {}), [status]: Date.now() }
        const updateFields = { status, statusUpdates: updatedStatusUpdates }
        if (expectedDelivery !== undefined) updateFields.expectedDelivery = expectedDelivery
        await orderModel.findByIdAndUpdate(orderId, updateFields)
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderRazorpay, verifyRazorpay, userOrders, allOrders, updateStatus }
