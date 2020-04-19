import { IResolvers } from 'graphql-tools'
import { Db, ObjectID } from 'mongodb'
const collection = 'games'

const gamesResolver: IResolvers = {
  Query: {
    async getGames(__: void, args: any, context: Db) {
      try {
        const data = await context.collection(collection)
          .find()
          .toArray()

        return data || []
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default gamesResolver