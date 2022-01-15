import { mergeSchemas } from '@graphql-tools/schema'
import { Schema as UserSchema } from './user.js'
import { Schema as OrganizationSchema } from './organization.js'
import { Schema as SurveySchema } from './survey.js'

export const schema = mergeSchemas({
  schemas: [UserSchema, OrganizationSchema, SurveySchema]
})
