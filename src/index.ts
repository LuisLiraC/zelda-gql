import express from 'express'
import cors from 'cors'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'

import Database from './mongo'
import { schema } from './graphql'
import { config } from './config'

const app = express()
app.use(cors())
app.use(express.json())

const database = new Database()
const context: any = async () => {
  return await database.connect()
}

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context,
  subscriptions: `ws://localhost:${config.port}/subscriptions`
})

apolloServer.applyMiddleware({ app })
const ws = createServer(app)

ws.listen(config.port, () => {
  console.log(`Server ready at http://localhost:${config.port}/graphql`)
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
    onConnect: context
  }, {
    server: ws,
    path: '/subscriptions'
  })
})