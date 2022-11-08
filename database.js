import mysql from 'mysql2/promise'

const connectToDatabase = async () => {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection
  }
  const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'locadora_pti_bd',
    user: 'root',
    password: 'biel'
  })
  console.log('MySQL connected')
  global.connection = connection
  return connection
}

connectToDatabase()

export const executeScript = async script => {
  const connection = await connectToDatabase()
  return await connection.query(script)
}
