import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import UsersList from './UserList/'

class UsersListPage extends React.Component {
  static defaultProps = {
    pathName: 'User List',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="User List" />
        <UsersList />
      </Page>
    )
  }
}

export default UsersListPage
