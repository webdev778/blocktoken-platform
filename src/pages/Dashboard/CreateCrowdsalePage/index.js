import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreateCrowdsale from './CreateCrowdsale/'

class CreateCrowdsalePage extends React.Component {
  static defaultProps = {
    pathName: 'Create Crowdsale Contract',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Create Crowdsale Contract" />
        <CreateCrowdsale />
      </Page>
    )
  }
}

export default CreateCrowdsalePage
