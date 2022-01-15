import { usePreloadedQuery, loadQuery } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import { RelayEnv } from '../../RelayEnv'
import { UserListQuery } from './__generated__/UserListQuery.graphql'
import { Box, Text } from 'grommet'

const UsersQuery = graphql`
  query UserListQuery ($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          name
          username
        }
      }
    }
  }
`

const usersQuery = loadQuery<UserListQuery>(RelayEnv, UsersQuery, {
  first: 20
})

export type UserListProps = {
  onUserSelected: (id: string) => void
}

export function UserList({ onUserSelected }: UserListProps) {
  const data = usePreloadedQuery<UserListQuery>(UsersQuery, usersQuery)

  return (
    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
      {data.users?.edges?.map((edge) => edge && (
        <Box
          key={edge.node.id}
          as='li'
          border='all'
          margin={{ vertical: 'small' }}
          pad='small'
          onClick={() => onUserSelected(edge.node.id)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text>{edge.node.name}</Text>
            <Text size='small'>{edge.node.username}</Text>
          </div>
        </Box>
      ))}
    </ul>
  )
}
