import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CrowdsaleList from './CrowdsaleList/'

class CrowdsaleListPage extends React.Component {
  static defaultProps = {
    pathName: 'Crowdsale Contracts List',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Crowdsale Contracts List" />
        <CrowdsaleList />
      </Page>
    )
  }
}

export default CrowdsaleListPage
