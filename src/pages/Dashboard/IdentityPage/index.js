import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class Identity extends React.Component {
  static defaultProps ={
    pathName: 'Identity',
    roles: ['agent', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Identity" />
        <div>
          Identity Page
        </div>
      </Page>
    )
  }
}

export default Identity
