import React from 'react'
import { Form, message, Input, Button, Select, Card, Table } from 'antd'
import axios from 'axios'

import tokenAbi from "contracts/TokenAbi";

const FormItem = Form.Item
const Option = Select.Option

class Balances extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tokenContracts: [],
      balances: null,
      selectedContract: null,
      tokenAmount: 0,
      newAddress: '',
      address: '',
      loading: false, 
      iconLoading: false,
    }
  }
  
  componentDidMount() {
    const { address } = this.props

    axios.get('/api/v1.0/contract/token')
      .then((result) => {
        if (result.data.tokens) {
          const selectedContract = result.data.tokens.find(contract => {
            return contract.contract_address === address;
          });

          this.getBalances(selectedContract);
          this.setState({
            tokenContracts: result.data.tokens,
            selectedContract
          });
        }
      });
  }

  getBalances = (selectedContract) => {
    if (!selectedContract)
      return;

    const contract = window.web3.eth.contract(tokenAbi);
    const contractHandle = contract.at(selectedContract.contract_address);
    const addresses = [
      window.web3.eth.defaultAccount,
      ...selectedContract.team_addresses
    ];

    contractHandle.getBalances(addresses, (err, res) => {
      console.log(res);
      this.setState({
        balances: res,
        selectedContract
      });
    });
  };

  handleOnTokenContractChange = (event) => {
    const selectedContract = this.state.tokenContracts.find((contract) => {
      return contract.contract_address === event;
    });

    this.getBalances(selectedContract);
  };

  handleAddressChange = (event) => {
    this.setState({
      address: event,
    });
  };

  handleTokenAmountChange = (event) => {
    this.setState({
      tokenAmount: event.target.value
    });
  };

  handleOnClickSendToken = () => {
    const {selectedContract, address, tokenAmount} = this.state;
    const contract = window.web3.eth.contract(tokenAbi);
    const contractHandle = contract.at(selectedContract.contract_address);
    const clientAddress = window.web3.eth.defaultAccount;
    let addressFrom;
    let addressTo;
    let value;

    this.setState({
      loading: true,
    });

    contractHandle.transfer(address, tokenAmount * Math.pow(10, selectedContract.decimal_points), {
      from: clientAddress,
      gas: 4000000,
      gasPrice: 40000000000
    }, (err, res) => {
      if (err)
        return;

      const logStarted = contractHandle.Transfer({
        from: addressFrom,
        to: addressTo,
        value: value
      });

      logStarted.watch((error, res) => {
        this.setState({
          tokenAmount: 0,
          loading: false,
        });
        this.getBalances(selectedContract);
      });
    });
  };

  handleNewAddressChange = (event) => {
    console.log(event.target.value);
    this.setState({
      newAddress: event.target.value,
    });
  };

  handleOnClickAddAddress = () => {
    const {selectedContract, newAddress} = this.state;

    if (!selectedContract) {
      message.warning('Please select contract first.');
      return;
    }

    if (!newAddress) {
      return;
    }

    if (newAddress === window.web3.eth.defaultAccount) {
      message.error('Cannot add your metamask account address');
      return;
    }

    if (!selectedContract.team_addresses) {
      selectedContract.team_addresses = [newAddress];
    }
    else if (selectedContract.team_addresses.indexOf(newAddress) !== -1) {
      message.error('Address already exist');
      return;
    }
    else {
      selectedContract.team_addresses.push(newAddress);
    }

    axios.patch('/api/v1.0/contract/token/' + selectedContract._id, {team_addresses: selectedContract.team_addresses})
      .then(() => {
        this.setState({
          newAddress: 0,
        });
        this.getBalances(selectedContract);
      });
  };

  handleOnClickDeleteAddress = (address) => {
    const {selectedContract} = this.state;
    console.log(address);
    selectedContract.team_addresses = selectedContract.team_addresses.filter(addr => {
      console.log(addr);
      return addr !== address;
    });

    axios.patch('/api/v1.0/contract/token/' + selectedContract._id, {team_addresses: selectedContract.team_addresses})
      .then(() => {
        this.setState({
          selectedContract
        });
        this.getBalances(selectedContract);
      });
  };


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
            <a href="javascript: void(0);" className="mr-2" onClick = {() => {this.handleOnClickDeleteAddress(record.address)}}>
              <i className="icmn-cross mr-1" width={16} />
            </a>
          </span>
        ),
      },
    ]

    const data = [];

    const {tokenContracts, balances, newAddress, selectedContract, address, tokenAmount} = this.state;

    return (
      <div className="card">
        <span>
          <a href="javascript: void(0);" onClick={ this.props.onClose } className="mr-2 pull-right">
            <i className="icmn-cross" title="Close" width={16} />
          </a>
        </span>
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
                  <Select placeholder="Select token contract" 
                    onChange={this.handleOnTokenContractChange}
                    value={selectedContract ? selectedContract.contract_address : ''}>
                    <Option value="">Select token contract</Option>
                    {
                      tokenContracts.map((contract) => (
                        <Option value={contract.contract_address}>{contract.name}</Option>
                      ))
                    }
                  </Select>
                </FormItem>
              </div>
              {
                balances ? 
                <div className="row-lg-6">
                  <Card>
                    <p><strong>Tokens for Team: { balances[0].toNumber() / Math.pow(10, selectedContract.decimal_points) }</strong></p>
                    <Select 
                      placeholder="Select Address" 
                      onChange={this.handleAddressChange}
                      value={address}>
                      <Option value="">Select Address</Option>
                      {
                        selectedContract ? selectedContract.team_addresses.map((address) =>(
                          <Option value={address}>{address}</Option>
                        )) : null
                      }
                    </Select>
                    <label className="form-label">&nbsp;</label>
                    <div className="row">
                      <div className="col">
                        <Input type="text" placeholder="e.g. 10000" onChange={this.handleTokenAmountChange} value={tokenAmount} />
                      </div>
                      <div className="col-lg-2">
                        <Button type="primary pull-right" loading={this.state.loading} onClick={this.handleOnClickSendToken}>
                          Send Token
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                : null
              }
              
              <div className="row-lg-6">
                <label className="form-label">&nbsp;</label>
                <div className="row">
                  <div className="col">
                    <Input type="text" placeholder="e.g. 0x6C88e6C76C1Eb3b130612D5686BE9c0A0C78925B" onChange={this.handleNewAddressChange} value={newAddress} />
                  </div>
                  <div className="col-lg-2">
                    <Button type="primary pull-right" onClick={this.handleOnClickAddAddress}>
                      Add Address
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row-lg-6">
                <label className="form-label">&nbsp;</label>
                {
                  selectedContract && balances && selectedContract.team_addresses.map((address, index) => (
                    data.push({key:address, address:address, balance:balances[index + 1].toNumber() / Math.pow(10, selectedContract.decimal_points)})
                  )) &&
                  <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                  />
                }
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Balances
