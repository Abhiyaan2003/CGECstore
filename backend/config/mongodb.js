import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB Connected')
    })

    mongoose.connection.on('error', (err) => {
        console.error('DB Connection Error:', err.message)
    })

    const uri = process.env.MONGODB_URI.replace(/\/$/, '')

    try {
        await mongoose.connect(`${uri}/cgec-wearables`, {
            tls: true,
            tlsAllowInvalidCertificates: false,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        })
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        console.error('Retrying in 5 seconds...')
        setTimeout(() => connectDB(), 5000)
    }
}

export default connectDB
