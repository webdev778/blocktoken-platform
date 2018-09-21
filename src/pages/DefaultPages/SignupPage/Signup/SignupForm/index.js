import React from 'react'
import Recaptcha from 'react-recaptcha'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { REDUCER, submit } from 'ducks/signup'
import { Form, Input, Icon, Checkbox, Button, notification } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
  socialProfile: state.auth.get('socialProfile'),
  redirectToRegister: state.auth.get('redirectToRegister')
})

@connect(mapStateToProps)
@Form.create()
class SignupForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      confirmDirty: false,
      isVerified: false,
    }  
  }
  
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.isVerified)
          dispatch(submit(values))

        else
        {
          notification.open({
            type: 'error',
            message: 'Please verify that you are a human!',
          })
        }
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value.length < 6)
      callback('Password must be at least 6 characters!')
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }

  recaptchaLoaded() {
    console.log(this.state.isVerified);
  }

  render() {
    const { form, socialProfile, redirectToRegister } = this.props
    let email = '', fullname = '';
    if(socialProfile){
      email = socialProfile.email || ''
      fullname = socialProfile.name || ''
    }
    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please SignUp</strong>
        </h4>
        <br />

        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {form.getFieldDecorator('email', {
              initialValue: email || '',
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                type="email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </FormItem>
            { !redirectToRegister ?
            <FormItem>
              {form.getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Input your password"
                />,
              )}
            </FormItem>
            : null
            }
            { !redirectToRegister ?
            <FormItem>
              {form.getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="check" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onBlur={this.handleConfirmBlur}
                  placeholder="Confirm your password"
                />,
              )}
            </FormItem>
            : null
            }
          <div className="form-actions">
            <FormItem>
              {form.getFieldDecorator('fullname', {
                initialValue: fullname || '',
                rules: [{ required: true, message: 'Please input your fullname!' }],
              })(
                <Input
                  prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Fullname"
                />,
              )}
            </FormItem>
            <FormItem>
              {form.getFieldDecorator('address', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input your address!' }],
              })(
                <Input
                  prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Address"
                />,
              )}
            </FormItem>
            <FormItem>
              {form.getFieldDecorator('company', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input your company!' }],
              })(
                <Input
                  prefix={<Icon type="instagram" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Company"
                />,
              )}
            </FormItem>
            <FormItem>
              {form.getFieldDecorator('website', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input your website URL!' }],
              })(
                <Input
                  prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Website URL"
                />,
              )}
            </FormItem>
          </div>
          <Recaptcha
            sitekey="6LclSG4UAAAAAApRMVKVnZjJhbQcSmjr5kwVELHO"
            render="explicit"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
            type = "image"
          />
          <div className="form-actions">
            <Button type="primary" htmlType="submit" className="login-form-button width-100 mr-3">
              Sign Up
            </Button>
            <Button className="width-60" htmlType="button">
              <Link to="/login">Cancel</Link>
            </Button>
            <span className="ml-4">
              {form.getFieldDecorator('mailsubscription', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Mail Subscription</Checkbox>)}
            </span>
          </div>
        </Form>
      </div>
    )
  }
}

export default SignupForm
