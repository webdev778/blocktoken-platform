import React from 'react'
import { Form, Icon, Input, Button, Tabs, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
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
            <div className="col">     
              <div className="token-wizard">
                <Tabs defaultActiveKey="1" tabPosition="top" size="large">
                  <TabPane tab={<span className="mainTab"><Icon type="home" />[STEP-1] Token Creator </span>} key="1">
                    <CreateToken />
                  </TabPane>
                  <TabPane tab={<span className="mainTab"><Icon type="trophy" />[STEP-2] Smart Contract </span>} key="2">
                    <CreateCrowdsale />
                  </TabPane>
                </Tabs>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default TokenWizard
