import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import errorHandler from './middlewares/errorMiddleware.js'

import postRouter from './routes/posts'
import authRouter from './routes/auth'

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('MongoDB connected success...')

		app.listen(3001, () => {
			console.log(`Server has been started: http://localhost:${3001}`)
		})
	} catch (e) {
		console.log(e.message)
	}
}

start()
