import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Identity from './Identity/index';

class IdentityPage extends React.Component {
  static defaultProps = {
    pathName: 'Identity',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Identity" />
        <Identity />
      </Page>
    )
  }
}

export default IdentityPage
