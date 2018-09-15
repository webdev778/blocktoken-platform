import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import IdentityList from './IdentityList/'

class IdentityListPage extends React.Component {
  static defaultProps = {
    pathName: 'Identity List',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Identity List" />
        <IdentityList />
      </Page>
    )
  }
}

export default IdentityListPage
