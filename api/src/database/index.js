import { Client } from 'pg'

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

client.connect()

export const db = {
  async query(sql, values) {
    const { rows } = await client.query(sql, values)

    return rows
  },
}
