import fs from 'fs'
import 'dotenv/config'

const log = (msg) => fs.appendFileSync('debug_output.txt', msg + '\n')

log('Step 1: dotenv loaded')
log('RAZORPAY_KEY_ID=' + process.env.RAZORPAY_KEY_ID)

try {
    const { default: connectDB } = await import('./config/mongodb.js')
    log('Step 2: mongodb config loaded OK')
} catch (e) { log('CRASH at mongodb: ' + e.stack) }

try {
    const { default: userRouter } = await import('./routes/userRoute.js')
    log('Step 3: userRoute loaded OK')
} catch (e) { log('CRASH at userRoute: ' + e.stack) }

try {
    const { default: productRouter } = await import('./routes/productRoute.js')
    log('Step 4: productRoute loaded OK')
} catch (e) { log('CRASH at productRoute: ' + e.stack) }

try {
    const { default: cartRouter } = await import('./routes/cartRoute.js')
    log('Step 5: cartRoute loaded OK')
} catch (e) { log('CRASH at cartRoute: ' + e.stack) }

try {
    const { default: orderRouter } = await import('./routes/orderRoute.js')
    log('Step 6: orderRoute loaded OK')
} catch (e) { log('CRASH at orderRoute: ' + e.stack) }

log('All imports completed!')
process.exit(0)
