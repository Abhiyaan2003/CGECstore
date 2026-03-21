import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, updateProductImages } from '../controllers/productController.js'
import authAdmin from '../middleware/authAdmin.js'
import upload from '../middleware/multer.js'

const productRouter = express.Router()

// Add product — accepts up to 3 image files
productRouter.post(
    '/add',
    authAdmin,
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
    addProduct
)

// Update images of existing product
productRouter.put(
    '/update-images',
    authAdmin,
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
    updateProductImages
)

productRouter.delete('/remove', authAdmin, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)

export default productRouter
