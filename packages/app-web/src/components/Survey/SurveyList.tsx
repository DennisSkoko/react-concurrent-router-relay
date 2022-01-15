import { useLazyLoadQuery, useMutation, ConnectionHandler } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import { SurveyListQuery } from './__generated__/SurveyListQuery.graphql'
import { Box, Button, Text } from 'grommet'
import { SurveyListRemoveMutation } from './__generated__/SurveyListRemoveMutation.graphql'

export type SurveyListProps = {
  userId: string
}

export function SurveyList({ userId }: SurveyListProps) {
  const { user } = useLazyLoadQuery<SurveyListQuery>(
    graphql`
      query SurveyListQuery($userId: ID!) {
        user(id: $userId) {
          surveys (first: null) @connection(key: "SurveyList_surveys") {
            __id
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `,
    { userId }
  )

  const [remove, removing] = useMutation<SurveyListRemoveMutation>(
    graphql`
      mutation SurveyListRemoveMutation($id: ID!) {
        removeSurvey(id: $id) {
          id
        }
      }
    `
  )

  const handleClick = (surveyId: string) => {
    remove({
      variables: { id: surveyId },
      updater: store => {
        if (user) {
          const connection = store.get(user.surveys.__id)

          if (connection) {
            ConnectionHandler.deleteNode(connection, surveyId)
          }
        }
      }
    })
  }

  return (
    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
      {user?.surveys.edges?.map((edge) => edge && (
        <Box
          key={edge.node.id}
          as='li'
          border='all'
          margin={{ vertical: 'small' }}
          pad='small'
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text>{edge.node.name}</Text>

            <Button onClick={() => handleClick(edge.node.id)}>
              Delete
            </Button>
          </div>
        </Box>
      ))}
    </ul>
  )
}
