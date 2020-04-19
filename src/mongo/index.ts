import { MongoClient } from 'mongodb'
import { config } from '../config'

const MONGO_URI: any = config.mongoUri
const DB_NAME: any = config.dbName

class MongoLib {
  client: MongoClient
  dbName: string
  connection: any

  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect() {
    if (!this.connection) {
      this.connection = new Promise((resolve, reject) => {
        this.client.connect(async error => {
          if (error) reject(error)
        })
        console.log('Connected succesfully to Mongo')
        resolve(this.client.db(this.dbName))
      })
    }
    return this.connection
  }
}

export default MongoLib