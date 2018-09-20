import React from 'react'
import { Form, message, Input, Button, Select, Card, Table } from 'antd'
import axios from 'axios'

import spinner from '../../../../../assets/images/spinner.gif';
import whitelistAbi from "contracts/WhitelistAbi";

const FormItem = Form.Item
const Option = Select.Option

class Whitelist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      crowdsaleContracts: [],
      balances: null,
      selectedContract: null,
      newAddress: '',
      address: '',
      loading: false, 
      isSpinnerVisible: false,
      iconLoading: false,
    }
  }
  
  componentDidMount() {
    const { address } = this.props

    axios.get('/api/v1.0/contract/crowdsale')
      .then((result) => {
        if (result.data.contracts) {
          const selectedContract = result.data.contracts.find(contract => {
            return contract.contract_address === address;
          });

          // this.getBalances(selectedContract);
          this.setState({
            crowdsaleContracts: result.data.contracts,
            selectedContract
          });
        }
      });
  }

  handleOnCrowdsaleContractChange = (event) => {
    const selectedContract = this.state.crowdsaleContracts.find((contract) => {
      return contract.contract_address === event;
    });

    this.setState({
      selectedContract
    })
  };

  handleNewAddressChange = (event) => {
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

    if (selectedContract.whitelist_addresses.indexOf(newAddress) !== -1) {
      message.error('Address already exist');
      return;
    }

    const contract = window.web3.eth.contract(whitelistAbi);
    const contractHandle = contract.at(selectedContract.whitelist_contract_address);
    const clientAddress = window.web3.eth.defaultAccount;

    this.setState({
      loading: true,
    });

    contractHandle.addToWhiteList(newAddress, {
      from: clientAddress,
      gas: 4000000,
      gasPrice: 40000000000
    }, (err, res) => {
      if (err)
        return;

      const logStarted = contractHandle.LogWhiteListed();

      logStarted.watch((error, res) => {
        logStarted.stopWatching((error, res) => {
          if (!error) {
            console.log(res)
          }
        });
        axios.patch('/api/v1.0/contract/crowdsale/' + selectedContract._id, {whitelist_addresses: [ ...selectedContract.whitelist_addresses, newAddress ]})
          .then(() => {
            console.log('Added');
            const {selectedContract, isSpinnerVisible} = this.state;
            selectedContract.whitelist_addresses.push(newAddress);
            this.setState({
              selectedContract,
              newAddress: 0,
              loading: false,
            });
          });
      });
    });
  };

  handleOnClickDeleteAddress = (address) => {
    const {selectedContract, isSpinnerVisible} = this.state;
    const contract = window.web3.eth.contract(whitelistAbi);
    const contractHandle = contract.at(selectedContract.whitelist_contract_address);
    const clientAddress = window.web3.eth.defaultAccount;

    this.setState({
      isSpinnerVisible: true
    });

    console.log(address);

    contractHandle.removeFromWhiteList(address, {
      from: clientAddress,
      gas: 4000000,
      gasPrice: 40000000000
    }, (err, res) => {
      if (err)
        return;

      const logStarted = contractHandle.LogRemoveWhiteListed();

      logStarted.watch((error, res) => {

        axios.put('/api/contract/crowdsale/' + selectedContract._id, {whitelist_addresses: selectedContract.whitelist_addresses.filter(addr => {
            return addr !== address;
          })})
          .then(() => {
            selectedContract.whitelist_addresses = selectedContract.whitelist_addresses.filter(addr => {
              return addr !== address;
            });

            this.setState({
              isSpinnerVisible: false
            });
          });
      });
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2" onClick = {() => {this.handleOnClickDeleteAddress(record.address)}}>
              <i className="icmn-cross mr-1" width={16} />
              {
                isSpinnerVisible ? (
                  <img
                    src={spinner}
                    width="20"
                    alt="Spinner"
                  />
                ) : null
              }
            </a>
          </span>
        ),
      },
    ]

    const data = [];

    const {crowdsaleContracts, newAddress, selectedContract, address, isSpinnerVisible} = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>Whitelist Addresses</strong>
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
                  <Select placeholder="Select crowdsale contract" 
                    onChange={this.handleOnCrowdsaleContractChange}
                    value={selectedContract ? selectedContract.contract_address : ''}>
                    <Option value="">Select crowdsale contract</Option>
                    {
                      crowdsaleContracts.map((contract) => (
                        <Option value={contract.contract_address}>{`${contract.contract_address} (${contract.token_contract.name})`}</Option>
                      ))
                    }
                  </Select>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <div className="row">
                  <div className="col">
                    <Input type="text" placeholder="e.g. 0x6C88e6C76C1Eb3b130612D5686BE9c0A0C78925B" onChange={this.handleNewAddressChange} value={newAddress} />
                  </div>
                  <div className="col-lg-2">
                    <Button type="primary pull-right" loading={this.state.loading} onClick={this.handleOnClickAddAddress}>
                      Add Address
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row-lg-6">
                <label className="form-label">&nbsp;</label>
                {
                  selectedContract && (selectedContract.whitelist_addresses || []).map((address, index) => (
                    data.push({key:address, address:address})
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

export default Whitelist
