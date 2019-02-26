
import React from 'react'
import { Table, Image } from 'semantic-ui-react'


const imageAvatarStyle = {
  display: 'inline-block'
}

const spanLoginStyle = {
  paddingLeft: '6px'
}

const GithubUsersTable = (props) => (
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
            <Image circular src={user.avatar} size='tiny' style={imageAvatarStyle} />
            <span style={spanLoginStyle}>{user.login}</span>
          </Table.Cell>
          <Table.Cell>
            <a href={user.profile_url}>{user.profile_url}</a>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default GithubUsersTable;
