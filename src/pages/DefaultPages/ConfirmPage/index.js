import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Confirm from './Confirm'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as authActions from 'ducks/auth';
import * as appActions from 'ducks/app';

class ConfirmPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    const { AppActions, userState } = this.props;
    return (
      <Page {...props}>
      {
        (Number(userState.auth_status) === 0) ? 
        <Confirm />
        : AppActions.goToPage('/user/dashboard')
      }        
      </Page>
    )
  }
}

export default connect(
  (state) => ({
    userState: state.app.userState,
  }),
  (dispatch) => ({
      AppActions: bindActionCreators(appActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
  })
)(ConfirmPage)
