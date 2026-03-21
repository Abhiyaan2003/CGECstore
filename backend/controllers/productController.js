import productModel from '../models/productModel.js'
import { uploadToCloudinary } from '../config/cloudinary.js'

// Helper: upload all provided multer files to Cloudinary, return URL array
const uploadImages = async (files) => {
    const urls = []
    for (const file of files) {
        const url = await uploadToCloudinary(file.buffer, file.mimetype)
        urls.push(url)
    }
    return urls
}

// Add a product (admin only)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, department, sizes, bestseller, discount } = req.body

        // Collect uploaded image files (image1, image2, image3)
        const imageFiles = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0]
        ].filter(Boolean)

        if (imageFiles.length === 0) {
            return res.json({ success: false, message: 'At least one product image is required' })
        }

        const imageUrls = await uploadImages(imageFiles)

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            department,
            image: imageUrls,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true',
            discount: Number(discount) || 0,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: 'Product Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Remove a product (admin only)
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product Removed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update product images (admin only)
const updateProductImages = async (req, res) => {
    try {
        const { productId } = req.body

        const imageFiles = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0]
        ].filter(Boolean)

        if (imageFiles.length === 0) {
            return res.json({ success: false, message: 'No images uploaded' })
        }

        const imageUrls = await uploadImages(imageFiles)

        await productModel.findByIdAndUpdate(productId, { image: imageUrls })
        res.json({ success: true, message: 'Images updated', images: imageUrls })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProductImages }
