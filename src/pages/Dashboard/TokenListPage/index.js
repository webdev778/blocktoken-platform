import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import TokenList from './TokenList/'

class TokenListPage extends React.Component {
  static defaultProps = {
    pathName: 'Token Contracts List',
    roles: ['user', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Token Contracts List" />
        <TokenList />
      </Page>
    )
  }
}

export default TokenListPage
