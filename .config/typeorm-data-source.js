require('dotenv/config')
const { DataSource } = require('typeorm')

exports.default = new DataSource({
  host: process.env.DB_HOST,
  type: `postgres`,
  port: 5432,
  database: process.env.POSTGRES_USER,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/src/*/entities/*.entity.js'],
  migrations: ['dist/migrations/*']
})
