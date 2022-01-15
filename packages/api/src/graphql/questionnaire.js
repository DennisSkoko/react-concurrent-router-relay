import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { connectionDefinitions } from 'graphql-relay'
import * as db from '../db.js'
import { OrganizationType } from './organization.js'
import { UserType } from './user.js'

/**
 * @typedef {import('graphql').GraphQLNamedType} GraphQLNamedType
 */

export const QuestionnaireAnswerType = new GraphQLObjectType({
  name: 'QuestionnaireAnswer',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    value: { type: GraphQLNonNull(GraphQLString) }
  })
})

export const QuestionnaireType = new GraphQLObjectType({
  name: 'Questionnaire',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    answers: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(QuestionnaireAnswerType))) },
    responsible: {
      type: GraphQLNonNull(UserType),
      resolve: questionnaire => db.users.find(user => user.id === questionnaire.responsible)
    },
    organization: {
      type: GraphQLNonNull(OrganizationType),
      resolve: survey => db.organizations.find(org => org.id === survey.organization)
    }
  })
})

export const { connectionType: SurveyConnectionType } = connectionDefinitions({
  nodeType: /** @type {GraphQLNonNull<GraphQLNamedType>} */ (GraphQLNonNull(QuestionnaireType))
})
