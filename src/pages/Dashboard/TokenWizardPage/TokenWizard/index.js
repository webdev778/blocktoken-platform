import React from 'react'
import { Form, Icon, Input, Button, Tabs, Checkbox } from 'antd'
import CreateToken from './tabs/CreateToken'
import CreateCrowdsale from './tabs/CreateCrowdsale'
import './style.scss'

const FormItem = Form.Item
const TabPane = Tabs.TabPane

class TokenWizard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWhitelistingEnabled: false,
      isVestingEnabled: false,
    }
  }

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  render() {
    const { form } = this.props

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Token Wizard</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="col">                
              <Tabs defaultActiveKey="1" tabPosition="right" size="large">
                <TabPane tab={<span><Icon type="home" />Create Token</span>} key="1">
                  <CreateToken />
                </TabPane>
                <TabPane tab={<span><Icon type="trophy" />Create Crowdsale</span>} key="2">
                  <CreateCrowdsale />
                </TabPane>
              </Tabs>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default TokenWizard
