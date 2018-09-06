import React from 'react'
import { Form, Icon, Input, Button, Select, Card, Table } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class ICOStatus extends React.Component {
  
  render() {
    const { form } = this.props

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>ICO Status</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Crowdsale Contract</strong>
                  </label>
                  <Select placeholder="Select crowdsale contract">
                  </Select>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Current Stage: Not Started</strong>
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Number Of Contributors: 0</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Max Cap: 0</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Ether Raised: 0</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Min Cap: 0</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Total Tokens sold: 0</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Paused: false</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Token Price: 0</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Crowdsale Closed: false</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>ICO Control</strong>
                  </label>
                  <div className="row-lg-6">
                    <div className="col-md-6">
                      <FormItem><button type="button" className="ico-control-button btn btn-md btn-primary" style={{width:"150px"}}>Start ICO</button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><button type="button" className="ico-control-button btn btn-md btn-success" style={{width:"150px"}} disabled="">Advance MainSale</button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><button type="button" className="ico-control-button btn btn-md btn-danger" style={{width:"150px"}}>Emergency Stop</button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><button disabled="" type="button" className="ico-control-button btn btn-md btn-warning" style={{width:"150px"}}>Emergency Start</button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><button type="button" className="ico-control-button btn btn-md btn-info" style={{width:"150px"}}>Finalize</button></FormItem>
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

export default ICOStatus
