import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import router from './router'
import errorHandler from './middlewares/errorMiddleware.js'
import ApiError from './helpers/apiError'

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', router)

app.use(errorHandler)

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected success...')

    app.listen(PORT, () => {
      console.log(`Server has been started: http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()