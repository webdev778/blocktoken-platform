import React from 'react'
import { Form, Button, Card, notification, Input, Row, Col } from 'antd'
import * as UserAPI from 'lib/api/users';

const FormItem = Form.Item

@Form.create()
class Password extends React.Component {
   
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
        console.log(value.length);
    
        if (value.length < 6)
          callback('Password must be at least 6 characters!')
        else if (value) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
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

        return (
            <Form className="form">
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
            </Form>
        )
    }    
}

export default Password