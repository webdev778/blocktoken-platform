import React from 'react'
import { connect } from 'react-redux'
import { notification, Button } from 'antd'
import * as AuthAPI from 'lib/api/auth';

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
)
class ConfirmForm extends React.Component {
  static defaultProps = {}

  resend = async () => {
    const { userState } = this.props;
    try {
      const email = userState.email;
      const result = await AuthAPI.resendEmail({ email });
      if (result.data) {
        notification.open({
          type: 'success',
          message: result.data
        })

      }
    } catch (e) {
      let message = '';
      if (e.message === 'Request failed with status code 401')
        message = 'This account has already been verified. Please log in.';
      else if (e.message === 'Request failed with status code 400')
        message = 'We were unable to find a user.'
      notification.open({
        type: 'error',
        message: message,
      })
    }
  }

  render() {

    return (
      <div>
        <div className="card-header">
          <h2>Verify your email address</h2>
        </div>
        <div className="card-body">
          <p>Thanks for registering an account with BlockToken!</p>
          <p>Please confirm that you want to use this as your BlockToken account email address.</p>
          <p>Once it's done you will be able to start!</p>

          <div className="form-actions">
            <Button
              type="primary"
              className="login-form-button width-100 mr-3"
              onClick={this.resend}
            >
              Resend
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmForm