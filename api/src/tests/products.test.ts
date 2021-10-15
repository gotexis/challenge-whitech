import { createApp } from '../index'
import request from 'supertest'

describe('Products API', function () {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  it('should return correct response type', async () => {
    const res = await request(app).get('/products?size=8&page=12').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('totalItems')
    expect(res.body).toHaveProperty('totalPages')
    expect(res.body).toHaveProperty('currentPage')
    expect(res.body).toHaveProperty('rows')

    expect(typeof res.body.totalItems).toBe('number')
    expect(typeof res.body.totalPages).toBe('number')
    expect(typeof res.body.currentPage).toBe('number')
    expect(typeof res.body.rows).toBe('object')
  })

  it('should be able to return some products', async () => {
    const res = await request(app).get('/products?size=20&page=2').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBeTruthy()
  })
})
