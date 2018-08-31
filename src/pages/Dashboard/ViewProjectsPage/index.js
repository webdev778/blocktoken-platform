import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ViewProjects from './ViewProjects'

class ViewProjectsPage extends React.Component {
  static defaultProps = {
    pathName: 'View All Live Projects',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="View All Live Projects" />
        <ViewProjects />
      </Page>
    )
  }
}

export default ViewProjectsPage
