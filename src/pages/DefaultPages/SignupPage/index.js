import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Signup from './Signup'

class SignupPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Helmet title="Signup" />
        <Signup match={match} />
      </Page>
    )
  }
}

export default SignupPage
