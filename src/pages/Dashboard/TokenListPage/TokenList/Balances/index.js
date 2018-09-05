import React from 'react'
import { Form, Icon, Input, Button, Select, Card, Table } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Balances extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    const { form } = this.props

    const columns = [
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2">
              <i className="icmn-cross mr-1" title="View on etherscan.io" width={16} />
            </a>
          </span>
        ),
      },
    ]

    const data = [{
      key: '1',
      address: '0x27B8d68B7c84EEF97dcEc7dd33C628D342079164',
      balance: 0,
    }];

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>Balances</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Token Contract</strong>
                  </label>
                  <Select placeholder="Select token contract">
                  </Select>
                </FormItem>
                
              </div>
              <div className="row-lg-6">
                <Card>
                  <p><strong>Tokens for Team: 0</strong></p>
                  <Select placeholder="Select Address">
                  </Select>
                  <label className="form-label">&nbsp;</label>
                  <div className="row">
                    <div className="col">
                      <Input type="text" placeholder="0" />
                    </div>
                    <div className="col-lg-2">
                      <Button type="primary pull-right" loading={this.state.loading} onClick={this.enterLoading}>
                        Send Token
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="row-lg-6">
                <label className="form-label">&nbsp;</label>
                <div className="row">
                  <div className="col">
                    <Input type="text" placeholder="0" />
                  </div>
                  <div className="col-lg-2">
                    <Button type="primary pull-right">
                      Add Address
                    </Button>
                  </div>
                </div>
              </div>

              <div className="row-lg-6">
                <label className="form-label">&nbsp;</label>
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Balances
