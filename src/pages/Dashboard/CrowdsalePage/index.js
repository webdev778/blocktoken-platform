import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreateCrowdsale from './Crowdsale/'

class CrowdsalePage extends React.Component {
  static defaultProps = {
    pathName: 'Token Wizard',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Token Wizard" />
        <CreateCrowdsale />
      </Page>
    )
  }
}

export default CrowdsalePage
