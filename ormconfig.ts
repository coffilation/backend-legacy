import 'dotenv/config'

export = {
  host: process.env.DB_HOST,
  type: `postgres`,
  port: 5432,
  database: process.env.POSTGRES_USER,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}
