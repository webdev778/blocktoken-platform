import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreateProject from './CreateProject/index';

class CreateProjectPage extends React.Component {
  static defaultProps = {
    pathName: 'CreateProject',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="CreateProject" />
        <CreateProject />
      </Page>
    )
  }
}

export default CreateProjectPage
