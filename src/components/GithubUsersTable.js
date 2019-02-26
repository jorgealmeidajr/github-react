
import React from 'react'
import { Table, Image, Header } from 'semantic-ui-react'

const TableExampleCelledStriped = (props) => (
  <Table celled striped color='teal'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Login</Table.HeaderCell>
        <Table.HeaderCell>Profile URL</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.users.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>
            <Header as='h3'>
              <Image circular src={user.avatar} size='small' /> {user.login}
            </Header>
            
          </Table.Cell>
          <Table.Cell>{user.profile_url}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default TableExampleCelledStriped;
