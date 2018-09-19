import React from 'react'
import DimmerSpinner from 'components/CleanComponents/DimmerSpinner';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import { FacebookLoginButton, GoogleLoginButton, LinkedInLoginButton  } from 'react-social-login-buttons'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Icon, Button, notification } from 'antd'
import * as authActions from 'ducks/auth';
import * as appActions from 'ducks/app';

const FormItem = Form.Item

class LoginForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, SubmitLogin } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          SubmitLogin(values)
        }
      })
    }
  }

  handleSocialLogin = async (provider) => {
    const { AuthActions, AppActions } = this.props;

    try {
      AppActions.addSubmitForm(REDUCER)

      await AuthActions.providerLogin(provider);

      const { socialInfo } = this.props;
      console.log(socialInfo);
      
      const result = await AuthActions.socialLogin({
        provider,
        accessToken: socialInfo.get('accessToken')
      });
      
      const { redirectToRegister } = this.props;
  
      if(redirectToRegister) {
        // AppActions._setHideLogin(true);
        // get social email
        const social_email = 'social@social.com';
        console.log(social_email);
        AppActions.goToPage('/signup');
        AppActions.deleteSubmitForm(REDUCER);
        // const { history } = this.props;
        // setTimeout(() => {
        //   history.push('/register');
        // }, 400);
        return;
      }

      if (result.data.auth_status > 0)
      {
        window.localStorage.setItem('app.Role', 'user')
        window.localStorage.setItem('app.Status', result.data.auth_status);
        window.localStorage.setItem('app.KYC', result.data.kyc_status);
        AppActions._setHideLogin(true);
        AppActions.goToPage('/user/dashboard');

        notification.open({
          type: 'success',
          message: 'You have successfully logged in!',
        })
      }
      else
        AppActions.goToPage('/confirm');
      AppActions.deleteSubmitForm(REDUCER);
    } catch (e) {
      AppActions.deleteSubmitForm(REDUCER);
      return;
    }
  }
  render() {
    const { form, isSubmitForm } = this.props
    const { handleSocialLogin } = this
    
    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please log in</strong>
        </h4>
        <br />

        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
          <FormItem>
            {form.getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'The input is not a valid e-mail address' },
                { required: true, message: 'Please input your e-mail address' },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email or Nickname"
              />,
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Input your password"
              />,
            )}
          </FormItem>
          {/*
          <div className="mb-2">
            <a href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
              Forgot password
            </a>
          </div>
          */}

          <div align="center">
            <Button
              type="primary"
              className="width-150"
              htmlType="submit"
              size="large"
              loading={isSubmitForm}
            >
              Login
            </Button>
          </div>

          <div className="form-actions" align="center">
            <GoogleLoginButton align="center" onClick={()=> handleSocialLogin('google')} />
            <br />
            <FacebookLoginButton align="center" onClick={()=> handleSocialLogin('facebook')}/>
            <br />
            <LinkedInLoginButton  align="center" onClick={()=> handleSocialLogin('linkedin')}/>
            <div className="mb-4">
              <br />
              <br />
              Don't have an account?
              <Link to="/signup" style={{ color: 'rgb(0,125,255)' }}>
                <strong>&nbsp;&nbsp;SignUp</strong>
              </Link>
            </div>
          </div>
        </Form>
        <DimmerSpinner visible={isSubmitForm}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    isSubmitForm: state.app.submitForms[REDUCER],
    socialInfo: state.auth.get('socialInfo'),
    redirectToRegister: state.auth.get('redirectToRegister'),
  }),
  (dispatch) => ({
      AppActions: bindActionCreators(appActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch),
      SubmitLogin: bindActionCreators(submit, dispatch)
  })
)(Form.create()(LoginForm));