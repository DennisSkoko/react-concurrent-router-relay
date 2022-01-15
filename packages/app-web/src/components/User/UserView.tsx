import { useParams } from 'react-router-dom'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import styled from 'styled-components'
import { Heading, Tab, Tabs, Text } from 'grommet'
import { NotFound } from '../NotFound'
import { SurveyList } from '../Survey'
import { UserViewQuery } from './__generated__/UserViewQuery.graphql'

const Dl = styled.dl({
  'dd:not(:last-child)': {
    marginBottom: '1rem'
  }
})

export function UserView() {
  const { id } = useParams()

  if (!id) throw new Error("id required")

  const { user } = useLazyLoadQuery<UserViewQuery>(
    graphql`
      query UserViewQuery($id: ID!) {
        user(id: $id) {
          name
          username
          email
          website
          address {
            street
            city
            zipcode
          }
        }
      }
    `,
    { id }
  )

  if (!user) return <NotFound />

  return (
    <>
      <Heading level='2' textAlign="center">{user.name}</Heading>

      <Dl>
        <dt>
          <Text size='small'>Username</Text>
        </dt>
        <dd>
          <Text>{user.username}</Text>
        </dd>

        <dt>
          <Text size='small'>Email</Text>
        </dt>
        <dd>
          <Text>{user.email}</Text>
        </dd>

        <dt>
          <Text size='small'>Website</Text>
        </dt>
        <dd>
          <Text>{user.website}</Text>
        </dd>

        <dt>
          <Text size='small'>Address</Text>
        </dt>
        <dd>
          <Text>
            {user.address.street}, {user.address.zipcode} {user.address.city}
          </Text>
        </dd>
      </Dl>

      <Tabs>
        <Tab title="Surveys">
          <SurveyList userId={id} />
        </Tab>
      </Tabs>
    </>
  )
}
