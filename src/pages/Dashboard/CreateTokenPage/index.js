import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreateToken from './CreateToken/'

class CreateTokenPage extends React.Component {
  static defaultProps = {
    pathName: 'Create Token Contract',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Create Token Contract" />
        <CreateToken />
      </Page>
    )
  }
}

export default CreateTokenPage
