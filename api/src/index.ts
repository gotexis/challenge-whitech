import { config as configEnv } from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router'
import { Product } from './db'
import products from './data/products.json'

configEnv()

const port = 4000

export const createApp = async () => {
  // db init / load
  await Product.sync({ force: true })
  await Product.bulkCreate(products)
  console.log('Loaded products.json')

  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  // routes
  app.get('/ping', async (req, res, next) => {
    res.status(200).json({ success: true })
  })
  app.use('/products', router)

  // error handling middleware
  app.use((e, req, res, next) => {
    res.status(400).json({ error: e })
  })

  return app
}

// start the Express server
if (process.env.NODE_ENV !== 'test') {
  createApp().then((app) => {
    app.listen(port, () => {
      console.log(`API started at http://localhost:${port}`)
    })
  })
}
