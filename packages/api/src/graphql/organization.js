import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { connectionArgs, connectionDefinitions, connectionFromArray } from 'graphql-relay'
import * as db from '../db.js'
import { UserConnectionType } from './user.js'

/**
 * @typedef {import('graphql').GraphQLNamedType} GraphQLNamedType
 */

export const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    employees: {
      type: new GraphQLNonNull(UserConnectionType),
      args: connectionArgs,
      resolve: (organization, args) => connectionFromArray(
        db.users.filter(user => user.organization === organization.id),
        args
      )
    }
  })
})

export const { connectionType: OrganizationConnectionType } = connectionDefinitions({
  nodeType: /** @type {GraphQLNonNull<GraphQLNamedType>} */ (new GraphQLNonNull(OrganizationType))
})

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    organizations: {
      type: new GraphQLNonNull(OrganizationConnectionType),
      args: connectionArgs,
      resolve: (_parent, args) => connectionFromArray(db.organizations, args)
    }
  })
})

export const Schema = new GraphQLSchema({ query: QueryType })
