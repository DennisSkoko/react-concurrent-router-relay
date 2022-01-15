import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { connectionArgs, connectionDefinitions, connectionFromArray } from 'graphql-relay'
import * as db from '../db.js'
import { SurveyConnectionType } from './survey.js'

/**
 * @typedef {import('graphql').GraphQLNamedType} GraphQLNamedType
 */

export const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    zipcode: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    website: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(AddressType) },
    surveys: {
      type: new GraphQLNonNull(SurveyConnectionType),
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(
        db.surveys.filter(survey => survey.creator === user.id),
        args
      )
    }
  })
})

export const { connectionType: UserConnectionType } = connectionDefinitions({
  nodeType: /** @type {GraphQLNonNull<GraphQLNamedType>} */ (new GraphQLNonNull(UserType))
})

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLNonNull(UserConnectionType),
      args: connectionArgs,
      resolve: (_parent, args) => connectionFromArray(db.users, args)
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_parent, args) => db.users.find(user => user.id === args.id)
    }
  })
})

export const Schema = new GraphQLSchema({ query: QueryType })
