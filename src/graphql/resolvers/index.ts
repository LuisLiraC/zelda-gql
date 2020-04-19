import GRM from 'graphql-merge-resolvers'
import character from './character'
import games from './games'

const resolvers: any = GRM.merge([
  character,
  games
])

export default resolvers