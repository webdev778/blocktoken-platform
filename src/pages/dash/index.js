import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class Dashboard extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
    roles: ['agent', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard" />
        <div>
          <center><span className="font-size-24">Welcome to the BlockToken Launch Platform</span></center>
          <div className="alert alert-warning" role="alert">
            <center>
              <p className="mb-0">
                Complete Verification [Daniel]
              </p>
            </center>
          </div>
        </div>
      </Page>
    )
  }
}

export default Dashboard
