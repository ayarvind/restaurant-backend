import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router'
import authMiddleWare from './middleware'
import { Request,Response } from 'express'
dotenv.config()
const app = express()
const corsOptions = {
    origin: "*"
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.static('public'))
// use auth middleware

app.use(authMiddleWare)

const mongoUri = process.env.MONGO_URI || ''

mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
})

app.use('/api', router)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running' })
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})