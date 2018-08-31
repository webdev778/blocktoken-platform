import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Profile from './Profile'

class ProfileAppPage extends React.Component {
  static defaultProps = {
    pathName: 'Profile',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Profile" />
        <Profile />
      </Page>
    )
  }
}

export default ProfileAppPage
