import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { Form, Select, Input, Button, InputNumber  } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

function onChange(value) {
  console.log('changed', value);
}

@Form.create()
class BuyTokenPage extends React.Component {
  static defaultProps ={
    pathName: 'BuyTokenPage',
    roles: ['user', 'administrator',]
  }
  render() {
    const props = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Page {...props}>
        <Helmet title="Crowdsale Contracts List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Select Tokens to Buy</strong>
            </div>
          </div>
          <div className="card-body">
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select Token To Buy"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="token1">Token1</Option>
              <Option value="token2">Token2</Option>
              <Option value="token3">Token3</Option>
            </Select>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Token Details</strong>
            </div>
          </div>
          <div className="card-body">
            <div className = "col-xl-9">
              <Form className="form">
                <FormItem label="Token Pricing" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('token_pricing', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please input your token pricing!' }],
                })(<Input style={{ width: 300 }} />)}
                </FormItem>
                <FormItem label="Bonus" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('bonus', {
                    initialValue: '',
                    rules: [{ required: true, message: 'Please input your address!' }],
                  })(<Input style={{ width: 300 }} />)}
                </FormItem>
                <FormItem label="Time left this stage" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('time_left', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please input time left in this stage!' }],
                })(<Input style={{ width: 300 }} />)}
                </FormItem>
                <FormItem label="Smart Contract Address" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('smart_contract', {
                  initialValue: '',
                    rules: [{ required: true, message: 'Please input your smart contract address!' }],
                  })(<Input style={{ width: 300 }} />)}
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Amount of Tokens to Buy</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="row utils__title">
              <div className = "col-xl-4">
                <InputNumber
                  defaultValue={1000}
                  formatter={value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
                  parser={value => value.replace(/\$s?|(,*)/g, '')}
                  onChange={onChange}
                  style={{ width: 300 }}
                />
              </div>
              <div className = "col-xl-4">
                <InputNumber
                  defaultValue={1}
                  min={0}
                  max={100}
                  disabled={true}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  style={{ width: 200 }}
                  />
              </div>
              <div className = "col-xl-4">
                <InputNumber
                defaultValue={10}
                disabled={true}
                formatter={value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
                parser={value => value.replace(/\$s?|(,*)/g, '')}
                style={{ width: 200 }}
              />
              </div>
            </div>
            <div className="row utils__content">
            </div>
          </div>
          <Button type="primary">Purchase Token</Button>
        </div>
      </Page>
    )
  }
}

export default BuyTokenPage
