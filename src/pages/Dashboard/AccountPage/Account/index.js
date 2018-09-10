import React from 'react'
import { Form, Button, Card, notification, Input, Row, Col } from 'antd'
import './style.scss'
import * as UserAPI from 'lib/api/users';

const FormItem = Form.Item

@Form.create()
class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullname: '',
      address: '',
      company: '',
      website: '',
    }
  }

  async componentDidMount() {
    try {
      const result = await UserAPI.getUser()
      if (result.data)
      {
        this.setState({
          fullname: result.data.user.fullname,
          address: result.data.user.address,
          company: result.data.user.company,
          website: result.data.user.website,
        });

      }
    }catch(e){
      console.log(e)
    }
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
    else if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  savePersonal = async () => {
    try {
      let fname = '', addr = '', co = '', web = ''
      this.props.form.validateFields((err, values) => {
        fname = values.fullname;  addr = values.address; co = values.company; web = values.website;
      })
      const result = await UserAPI.setUser({fullname:fname, address:addr, company:co, website:web})
      if (result.data)
      {
        this.setState({
          fullname: result.data.fullname,
          address: result.data.address,
          company: result.data.company,
          website: result.data.website,
        });

        notification.open({
          type: 'success',
          message: 'Personal Information',
          description: 'Updated successfully!'
        })

      }
    }catch(e){
      notification.open({
        type: 'error',
        message: 'Personal Information',
        description: 'Updated failure!'
      })
    }
  }

  savePassword = async () => {
    try {
      let oldPwd = '', newPwd = ''
      this.props.form.validateFields((err, values) => {
        oldPwd = values.current;  newPwd = values.password;
      })

      if (oldPwd === newPwd)
      {
        notification.open({
          type: 'error',
          message: 'New Password',
          description: 'Current Password and New Password are same!\nPlease input again!'
        })
        this.setState({current:'', password:'', confirm:''})
      }
      else
      {
        const result = await UserAPI.setPassword({curpassword:oldPwd, newpassword:newPwd})
        console.log(result);
        if (result.data)
        {
          notification.open({
            type: 'success',
            message: 'New Password',
            description: 'Updated successfully!'
          })
        }
      }
    }catch(e){
      notification.open({
        type: 'error',
        message: 'New Password',
        description: 'Current Password wrong!'
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {fullname, address, company, website} = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Account</strong>
          </div>
        </div>
        <div className="card-body">
          <Form className="form">
            <Row gutter={36}>
              <Col span={12}>
                <Card title="Personal Information" bordered={true}>
                  <FormItem label="Fullname">
                    {getFieldDecorator('fullname', {
                      initialValue: fullname || '',
                      rules: [{ required: true, message: 'Please input your fullname!' }],
                    })(<Input />)}
                  </FormItem>
                  <FormItem label="Address">
                    {getFieldDecorator('address', {
                      initialValue: address || '',
                      rules: [{ required: true, message: 'Please input your address!' }],
                    })(<Input />)}
                  </FormItem>
                  <FormItem label="Company">
                    {getFieldDecorator('company', {
                      initialValue: company || '',
                      rules: [{ required: true, message: 'Please input your company!' }],
                    })(<Input />)}
                  </FormItem>
                  <FormItem label="Website">
                    {getFieldDecorator('website', {
                      initialValue: website || '',
                      rules: [{ required: true, message: 'Please input your website!' }],
                    })(<Input />)}
                  </FormItem>
                  <Button type="primary" className="mr-3 pull-right" onClick={this.savePersonal}>
                    Save Changes
                  </Button>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="New Password" bordered={true}>
                  <FormItem label="Current Password">
                    {getFieldDecorator('current', {
                      rules:[
                        { validator: this.validatePassword, },
                      ],
                    })(<Input type="password" />)}
                  </FormItem>
                  <FormItem label="New Password">
                    {getFieldDecorator('password', {
                      rules:[
                        { validator: this.validateToNextPassword, },
                      ],
                    })(<Input type="password" />)}
                  </FormItem>
                  <FormItem label="Confirm Password">
                    {getFieldDecorator('confirm', {
                      rules:[
                        { validator: this.compareToFirstPassword, },
                      ],
                    })(<Input type="password" />)}
                  </FormItem>
                  <Button type="primary" className="mr-3 pull-right" onClick={this.savePassword}>
                    Save Changes
                  </Button>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Account
