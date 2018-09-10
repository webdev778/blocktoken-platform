import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Account from './Account'

class AccountPage extends React.Component {
  static defaultProps = {
    pathName: 'Account',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Account" />
        <Account />
      </Page>
    )
  }
}

export default AccountPage
