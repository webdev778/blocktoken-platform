import React from 'react'
import { Form, Icon, Input, Button, Select, Card, Table } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Details extends React.Component {
  render() {
    const { form } = this.props

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>Contract Detail</strong>
          </div>
        </div>
        <div className="card-body">
          <Form>
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    Contribution Wallet Address: 0x0B764c58Df739c7456229dcc14eAdC3121952e64
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Tokens For Team: 5000</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Minimum Contribution PreSale: 0.2</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Minimum Contribution MainSale: 0.1</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Max Contribution Ether: 1000</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Maximum Cap: 10000</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Minimum Cap: 1000</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Token Price in ETH: 0.00003</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Campaign Duration Days: 1</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">First Bonus: %</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">First Bonus Period: hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Second Bonus: %</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Second Bonus Period: hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Third Bonus: %</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Third Bonus Period: hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">PreSale Bonus: %</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Vesting Duration: seconds</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Vesting Cliff: seconds</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Vesting Start: seconds</label>
                    </div>
                  </div>
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Details
