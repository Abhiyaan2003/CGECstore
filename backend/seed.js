/**
 * Seed script — uploads product images to Cloudinary, then inserts
 * the CSE & ECE t-shirt products into MongoDB.
 * Run once with: node seed.js
 */
import mongoose from 'mongoose'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { v2 as cloudinary } from 'cloudinary'
import productModel from './models/productModel.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Path to frontend image assets
const ASSETS = path.join(__dirname, '../frontend/src/assets')

// Upload a local file to Cloudinary, return secure URL
const uploadFile = (filePath) =>
    new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            { folder: 'cgec-wearables', resource_type: 'image' },
            (err, result) => err ? reject(err) : resolve(result.secure_url)
        )
    })

const seed = async () => {
    try {
        // ── Connect to MongoDB ──────────────────────────────────────────
        const uri = process.env.MONGODB_URI.replace(/\/$/, '')
        await mongoose.connect(`${uri}/cgec-wearables`)
        console.log('✅ Connected to MongoDB')

        // ── Upload images to Cloudinary ─────────────────────────────────
        console.log('⬆️  Uploading CSE images to Cloudinary…')
        const [cse1, cse2, cse3] = await Promise.all([
            uploadFile(path.join(ASSETS, 'cse1.png')),
            uploadFile(path.join(ASSETS, 'cse2.png')),
            uploadFile(path.join(ASSETS, 'cse3.png')),
        ])
        console.log('   CSE images uploaded')

        console.log('⬆️  Uploading ECE images to Cloudinary…')
        const [ece1, ece2] = await Promise.all([
            uploadFile(path.join(ASSETS, 'ece1.png')),
            uploadFile(path.join(ASSETS, 'ece2.png')),
        ])
        console.log('   ECE images uploaded')

        // ── Build product data ──────────────────────────────────────────
        const products = [
            {
                name: 'CSE Departmental T-shirt',
                description: 'Official CSE department wearable. A premium quality round-neck T-shirt representing the Computer Science & Engineering department of CGEC.',
                price: 499,
                image: [cse1, cse2, cse3],
                category: 'Men',
                subCategory: 'CSE',
                department: 'CSE',
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                bestseller: true,
                discount: 10,
                date: Date.now()
            },
            {
                name: 'ECE Departmental T-shirt',
                description: 'Official ECE department wearable. A premium quality round-neck T-shirt representing the Electronics & Communication Engineering department of CGEC.',
                price: 499,
                image: [ece1, ece2],
                category: 'Men',
                subCategory: 'ECE',
                department: 'ECE',
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                bestseller: false,
                discount: 10,
                date: Date.now()
            }
        ]

        // ── Clear existing products and insert new ones ─────────────────
        await productModel.deleteMany({})
        console.log('🗑️  Cleared existing products')

        await productModel.insertMany(products)
        console.log('✅ Products seeded successfully!')
        console.log(`   • CSE T-shirt images: ${cse1}`)
        console.log(`   • ECE T-shirt images: ${ece1}`)

        await mongoose.disconnect()
        process.exit(0)
    } catch (error) {
        console.error('❌ Seed failed:', error.message)
        process.exit(1)
    }
}

seed()
