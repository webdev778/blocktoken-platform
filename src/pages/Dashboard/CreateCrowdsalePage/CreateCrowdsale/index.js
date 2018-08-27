import React from 'react'
import { Form, Icon, Input, Button, Tabs, Checkbox } from 'antd'
import IcoContract from './tabs/ico-contract/IcoContract'
import Bonuses from './tabs/bonuses/Bonuses'
import Vesting from './tabs/vesting/Vesting';
import './style.scss'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CreateCrowdsale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isWhitelistingEnabled: false,
      isVestingEnabled: false,
    };
  }

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  render() {

    const { form } = this.props

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Create Crowdsale Contract</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label"><strong>Token Contract</strong></label>
                  <Input
                    type="text"
                    placeholder="Select token contract"
                    required
                  />
                  <Checkbox 
                    onChange={() => { this.handleOnValueChange('isWhitelistingEnabled', !this.state.isWhitelistingEnabled) }}
                    value={this.state.isWhitelistingEnabled}>
                    Whitelisting enabled?
                  </Checkbox>
                  <Checkbox
                    onChange={() => { this.handleOnValueChange('isVestingEnabled', !this.state.isVestingEnabled) }}
                    value={this.state.isVestingEnabled}>
                    Vesting enabled
                  </Checkbox>
                </FormItem>
              </div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="ICO Contract" key="1">
                  <IcoContract />
                </TabPane>
                <TabPane tab="Bonuses" key="2">
                  <Bonuses />
                </TabPane>
                {
                  this.state.isVestingEnabled && (
                  <TabPane tab="Vesting" key="3">
                    <Vesting />
                  </TabPane>
                  )
                }
                
              </Tabs>
            </div>
            <button className="btn btn-primary pull-right" onClick={this.onClickCreate}>Deploy</button>
          </Form>
        </div>
      </div>
    )
  }
}

export default CreateCrowdsale
