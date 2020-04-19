import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import 'graphql-import-node'
import charactersSchema from './schemas/characters.graphql'
import gamesSchema from './schemas/games.graphql'
import resolvers from './resolvers'

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [
    charactersSchema,
    gamesSchema
  ],
  resolvers
})