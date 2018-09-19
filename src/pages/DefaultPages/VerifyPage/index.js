import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as authActions from 'ducks/auth';
import * as appActions from 'ducks/app';
import { REDUCER } from 'ducks/login'

import axios from 'axios'

class VerifyPage extends React.Component {
  async componentDidMount() {
    const { AppActions } = this.props;

    try {
      console.log(this.props.match.params.token);
        const result = await axios.post('/api/v1.0/auth/confirmation/' + this.props.match.params.token)
        console.log(result);
        if (result.data)
        {
          AppActions.goToPage('/login');
          AppActions.deleteSubmitForm(REDUCER);
          return;
        }
    }catch(e){
        console.log(e)
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
