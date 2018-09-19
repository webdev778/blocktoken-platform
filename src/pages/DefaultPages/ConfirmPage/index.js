import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Confirm from './Confirm'

class ConfirmPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Confirm match={match} />
      </Page>
    )
  }
}

export default ConfirmPage
