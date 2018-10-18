import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import MarketingServices from './MarketingServices/index';

class MarketingServicesPage extends React.Component {
  static defaultProps = {
    pathName: 'MarketingServices',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="MarketingServices" />
        <MarketingServices />
      </Page>
    )
  }
}

export default MarketingServicesPage
