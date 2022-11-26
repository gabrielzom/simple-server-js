import mysql from 'mysql2/promise'
import { config } from 'dotenv'
config()

const connectToDatabase = async () => {
  if(global.connection) {
    console.log('MySQL already connected')
    return global.connection
  }
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD
  })
  global.connection = connection
  console.log('MySQL connected')
  return connection
}

export const executeScript = async script => {
  const connection = await connectToDatabase()
  return await connection.query(script)
}
