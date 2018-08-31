import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Icon, Button } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  }

  render() {
    const { form, isSubmitForm } = this.props

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
            <GoogleLoginButton align="center" />
            <br />
            <FacebookLoginButton align="center" />
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
      </div>
    )
  }
}

export default LoginForm
