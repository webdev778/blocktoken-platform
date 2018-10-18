import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import AirDrop from './AirDrop/index';

class AirDropPage extends React.Component {
  static defaultProps = {
    pathName: 'AirDrop',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="AirDrop" />
        <AirDrop />
      </Page>
    )
  }
}

export default AirDropPage
