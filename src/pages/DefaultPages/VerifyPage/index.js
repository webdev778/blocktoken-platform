import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { notification } from 'antd'

import * as authActions from 'ducks/auth';
import * as appActions from 'ducks/app';
import { REDUCER } from 'ducks/login'

import axios from 'axios'

class VerifyPage extends React.Component {
  async componentDidMount() {
    const { AppActions } = this.props;

    try {
      const result = await axios.post('/api/v1.0/auth/confirmation/' + this.props.match.params.token)
      if (result.data) {
        notification.open({
          type: 'success',
          message: result.data
        })
        AppActions.goToPage('/login');
        AppActions.deleteSubmitForm(REDUCER);
        return;
      }
    } catch (e) {
      let message = '';
      if (e.message === 'Request failed with status code 401')
        message = 'This user has already been verified.';
      else if (e.message === 'Request failed with status code 400')
        message = 'We were unable to find a user for this token.';
      else if (e.message === 'Request failed with status code 403')
        message = 'We were unable to find this token.';

      notification.open({
        type: 'error',
        message: message
      })
      AppActions.goToPage('/confirm');
    }
  }
  render() {
    const { match, ...props } = this.props
    return (
      null
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    AppActions: bindActionCreators(appActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(VerifyPage)
