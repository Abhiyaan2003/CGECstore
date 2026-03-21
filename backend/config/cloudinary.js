import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import { Readable } from 'stream'

// Cloudinary SDK automatically reads CLOUDINARY_URL from environment
// No manual config() needed when CLOUDINARY_URL is set

/**
 * Upload a multer memory-buffer file to Cloudinary.
 * Returns the secure URL string.
 */
export const uploadToCloudinary = (fileBuffer, mimetype) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'cgec-wearables', resource_type: 'image' },
            (error, result) => {
                if (error) return reject(error)
                resolve(result.secure_url)
            }
        )
        // Pipe the buffer into the upload stream
        const readable = new Readable()
        readable.push(fileBuffer)
        readable.push(null)
        readable.pipe(uploadStream)
    })
}

export default cloudinary
