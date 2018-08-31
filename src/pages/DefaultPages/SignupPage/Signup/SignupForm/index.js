import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { REDUCER, submit } from 'ducks/signup'
import { Form, Input, Icon, Checkbox, Button } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class SignupForm extends React.Component {
  state = {
    confirmDirty: false,
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
        console.log('Received values of form: ', values)
        dispatch(submit(values))
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
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { form } = this.props

    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please SignUp</strong>
        </h4>
        <br />

        <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            {form.getFieldDecorator('displayName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </FormItem>
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
                onBlur={this.handleConfirmBlur}
                placeholder="Confirm your password"
              />,
            )}
          </FormItem>

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
