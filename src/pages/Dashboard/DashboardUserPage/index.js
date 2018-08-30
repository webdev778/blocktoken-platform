import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DashboardUser from './DashboardUser'

class DashboardUserPage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard" />
        <DashboardUser />
      </Page>
    )
  }
}

export default DashboardUserPage
