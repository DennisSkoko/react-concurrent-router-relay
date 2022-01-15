import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'
import { connectionDefinitions } from 'graphql-relay'
import * as db from '../db.js'
import { UserType } from './user.js'

/**
 * @typedef {import('graphql').GraphQLNamedType} GraphQLNamedType
 */

export const SurveyFieldType = new GraphQLObjectType({
  name: 'SurveyField',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    label: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export const SurveyType = new GraphQLObjectType({
  name: 'Survey',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    fields: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SurveyFieldType))) },
    // creator: {
    //   type: new GraphQLNonNull(UserType),
    //   resolve: survey => db.users.find(user => user.id === survey.creator)
    // },
    // organization: {
    //   type: new GraphQLNonNull(OrganizationType),
    //   resolve: survey => db.organizations.find(org => org.id === survey.organization)
    // }
  })
})

export const { connectionType: SurveyConnectionType } = connectionDefinitions({
  nodeType: /** @type {GraphQLNonNull<GraphQLNamedType>} */ (new GraphQLNonNull(SurveyType))
})

// export const QueryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: () => ({
//     // surveys: {
//     //   type: new GraphQLNonNull(SurveyConnectionType),
//     //   args: connectionArgs,
//     //   resolve: (_parent, args) => connectionFromArray(db.surveys, args)
//     // }
//   })
// })

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    removeSurvey: {
      type: new GraphQLNonNull(SurveyType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_parent, args) => db.surveys.find(survey => survey.id === args.id)
    }
  })
})

export const Schema = new GraphQLSchema({ mutation: MutationType })
