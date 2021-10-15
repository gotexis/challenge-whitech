import { Router } from 'express'
import { Product } from './db'

const router = Router()

// utils
const getPagination = ({ page, size }) => {
  const pageMachine = +page - 1 // machine page starts with 0
  const limit = size ? +size : 3
  const offset = pageMachine ? pageMachine * limit : 0

  return { limit, offset }
}

const getPagingData = ({ data, page, limit }) => {
  const { count, rows } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(count / limit)

  return { totalItems: count, rows, totalPages, currentPage }
}

// Send user data - used by client.js
router.get('/', async ({ query: { page, size } }, res) => {
  const { limit, offset } = getPagination({ page, size })

  const data = await Product.findAndCountAll({
    limit,
    offset,
  })
  const products = getPagingData({ data, page, limit })
  res.status(200).json(products)
})

// create a new entry in the users table
router.post('/', async (req, res) => {
  await Product.create(req.body)
  res.status(201).json({})
})

export default router
