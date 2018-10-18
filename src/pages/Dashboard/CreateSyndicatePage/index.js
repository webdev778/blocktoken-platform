import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreateSyndicate from './CreateSyndicate/index';

class CreateProjectPage extends React.Component {
  static defaultProps = {
    pathName: 'CreateSyndicate',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="CreateSyndicate" />
        <CreateSyndicate />
      </Page>
    )
  }
}

export default CreateProjectPage
