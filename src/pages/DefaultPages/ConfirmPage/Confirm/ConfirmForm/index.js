import React from 'react'
import { notification, Button } from 'antd'
import * as AuthAPI from 'lib/api/auth';

class ConfirmForm extends React.Component {
  static defaultProps = {}

  resend = async () => {
    try {
      const result = await AuthAPI.resendEmail();
      console.log(result);
      if (result.data)
      {
        notification.open({
          type: 'success',
          message: 'Verify Email',
          description: 'Resend successfully!'
        })

      }
    }catch(e){
      notification.open({
        type: 'error',
        message: 'Verify Email',
        description: 'Resend failure!'
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