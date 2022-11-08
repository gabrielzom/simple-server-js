import mysql from 'mysql2/promise'
import { config } from 'dotenv'
config()

const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD
  })
  console.log('MySQL connected')
  return connection
}

connectToDatabase()

export const executeScript = async script => {
  const connection = await connectToDatabase()
  return await connection.query(script)
}
