import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class Account extends React.Component {
  static defaultProps ={
    pathName: 'Account',
    roles: ['agent', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Account" />
        <div>
          Account Page
        </div>
      </Page>
    )
  }
}

export default Account
