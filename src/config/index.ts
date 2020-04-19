import dotenv from 'dotenv'
dotenv.config()

export const config = {
  dbName: process.env.DB_NAME,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT
}