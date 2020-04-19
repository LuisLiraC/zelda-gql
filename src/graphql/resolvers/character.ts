import { IResolvers } from 'graphql-tools'
import { Db, ObjectID } from 'mongodb'
import { PubSub } from 'graphql-subscriptions'
import { NEW_CHARACTER } from './subscriptionsTypes'
const collection = 'characters'
const pubsub = new PubSub()

const characterResolver: IResolvers = {
  Query: {
    async getCharacters(__: void, { race, limit = 0 }: any, context: Db) {
      let query: any = {}
      if (race) query.race = race

      try {
        const data = await context.collection(collection)
          .find(query)
          .limit(limit)
          .toArray()

        return data || []
      } catch (error) {
        console.log(error)
      }
    },

    async getCharacter(__: void, { _id }: { _id: any }, context: Db) {
      try {
        const data = await context.collection(collection)
          .findOne({ _id: new ObjectID(_id) })

        return data || {}
      } catch (error) {
        console.log(error)
      }
    }
  },

  Mutation: {
    async addCharacter(root: void, args: any, context: Db) {
      try {
        await context.collection(collection).insertOne(args.character)
        pubsub.publish(NEW_CHARACTER, args)
        return 'Character added successfully'
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCharacter(root: void, { _id }: { _id: any }, context: Db) {
      try {
        await context.collection(collection).deleteOne({ _id: new ObjectID(_id)})
        return 'Character deleted successfully'
      } catch (error) {
        console.log(error)
      }
    }
  },

  Subscription: {
    newCharacter: {
      resolve: payload => payload.character,
      subscribe: () => pubsub.asyncIterator(NEW_CHARACTER)
    }
  },

  Character: {
    games: (parent: any, __: any, context: Db) => {
      try {
        const gamesList = parent.games.map(async (id: number) =>
          await context.collection('games').findOne({ _id: new ObjectID(id) })
        )
        return gamesList
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default characterResolver