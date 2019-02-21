
import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

const TableExampleCelledStriped = (props) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>List of GitHub Users</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {props.users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell collapsing>
          <Icon name='folder' /> {user.login}
        </Table.Cell>
        <Table.Cell>...</Table.Cell>
        <Table.Cell collapsing textAlign='right'>...</Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </Table>
)

export default TableExampleCelledStriped;
