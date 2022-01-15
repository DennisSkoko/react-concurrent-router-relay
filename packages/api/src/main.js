import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js'

export async function main() {
  const app = express()
  const port = process.env.APP_HTTP_PORT || 8080

  // app.use('/graphql', (_req, _res, next) => {
  //   setTimeout(() => next(), Math.ceil(Math.random() * 2000))
  // })

  app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

  app.listen(port, () => {
    console.log('Server started', { port })
  })
}
