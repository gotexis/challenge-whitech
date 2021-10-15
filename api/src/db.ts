import { INTEGER, Sequelize, STRING } from 'sequelize'

// setup a new database using database credentials set in .env
const sequelize = new Sequelize('sqlite::memory:', { logging: false })

export const Product = sequelize.define(
  'Product',
  {
    id: { type: INTEGER, primaryKey: true },
    price: STRING,
    product_name: STRING,
    description: STRING,
    product_image: STRING,
  },
  {},
)
