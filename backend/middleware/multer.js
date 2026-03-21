import multer from 'multer'

// Keep files in memory (buffer) so we can stream directly to Cloudinary
const storage = multer.memoryStorage()

const upload = multer({ storage })

export default upload
