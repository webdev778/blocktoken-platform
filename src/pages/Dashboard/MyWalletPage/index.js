import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class Wallet extends React.Component {
  static defaultProps ={
    pathName: 'Wallet',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Wallet" />
        <div>
          Wallet Page
        </div>
      </Page>
    )
  }
}

export default Wallet
