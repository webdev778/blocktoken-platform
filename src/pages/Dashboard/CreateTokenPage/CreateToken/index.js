import React from 'react'
import { Form, Icon, Input, Button, Upload } from 'antd'
import './style.scss'

const FormItem = Form.Item

class CreateToken extends React.Component {
  render() {
    const { form } = this.props

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Create Token Contract</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Coin or Token Name</strong>
                  </label>
                  <Input type="text" placeholder="e.g. ICO token" required />
                  <label className="form-label">This is full name of your token</label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Choose A Symbol</strong>
                  </label>
                  <Input type="text" placeholder="e.g. ICO" required />
                  <label className="form-label">
                    This is like your stock ticker symbol, choose something memerable
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Version Number of Token</strong>
                  </label>
                  <Input type="text" placeholder="e.g. 1.0" required />
                  <label className="form-label">Which version of token is it?</label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Initial Supply</strong>
                  </label>
                  <Input type="text" placeholder="e.g. 1000000" required />
                  <label className="form-label">
                    Amount of tokens which will be created during ICO.
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Number of Decimal Points</strong>
                  </label>
                  <Input type="text" placeholder="e.g. 18" required />
                  <label className="form-label">How small fraction would you like to offer?</label>
                </FormItem>
              </div>
            </div>
            <button className="btn btn-primary pull-right" onClick={this.onClickCreate}>
              Deploy
            </button>
          </Form>
        </div>
      </div>
    )
  }
}

export default CreateToken
