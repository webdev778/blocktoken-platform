import React from 'react'
import { Form, Button, Card, notification, Input, Row, Col } from 'antd'
import './style.scss'

import PersonalInfo from './PersonalInfo'
import Password from './Password'
const FormItem = Form.Item

@Form.create()
class Account extends React.Component {
  
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Account</strong>
          </div>
        </div>
        <div className="card-body">
          <Row gutter={36}>
            <Col span={12}>
              <Card title="Personal Information" bordered={true}>
                <PersonalInfo />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="New Password" bordered={true}>
                <Password />              
              </Card>
            </Col>
          </Row>   
        </div>
      </div>
    )
  }
}

export default Account
