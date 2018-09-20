import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Confirm from './Confirm'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as authActions from 'ducks/auth';
import * as appActions from 'ducks/app';
import { REDUCER } from 'ducks/login'

class ConfirmPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    const status = window.localStorage.getItem('app.Status');
    const { AppActions } = this.props;
    return (
      <Page {...props}>
      {
        (Number(status) === 0) ? 
        <Confirm match={match} />
        : AppActions.goToPage('/user/dashboard')
      }        
      </Page>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
      AppActions: bindActionCreators(appActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
  })
)(ConfirmPage)
