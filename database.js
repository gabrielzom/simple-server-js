import mysql from 'mysql2/promise'
import { config } from 'dotenv'
config()

export const connectToDatabase = async () => {
  if (global.connection) {
    console.log('MYSQL ALREADY CONNECTED')
    return global.connection
  }
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PWD
    })
    global.connection = connection
    console.log('MYSQL CONNECTED')
    return connection
  } catch (e) {
    console.log('MYSQL CONNECTION HAS OCCURRED AN ERROR: ' + e.message)
    throw new SQLException()
  }
}

export const executeScript = async script => {
  const connection = await connectToDatabase()
  return connection.query(script);
}
