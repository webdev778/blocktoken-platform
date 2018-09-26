import React from 'react'
import { Form, Icon, Input, Button, Select, Card, Table } from 'antd'

import manage from 'utils/manageICO';
import * as ContractAPI from 'lib/api/contract'

import crowdsaleAbi from 'contracts/CrowdsaleAbi'

const FormItem = Form.Item
const Option = Select.Option

class ICOStatus extends React.Component {

  state = {
    crowdsaleContracts: [],
    selectedContract: null,
    currentStage: 4,
    numContributors: 0,
    etherRaised: 0,
    totalTokensSold: 0,
    tokenPrice: 0,
    maxCap: 0,
    minCap: 0,
    isPaused: false,
    isCrowdsaleClosed: false,
    decimals: 18,
    isSpinnerVisible: false,
  }

  async componentDidMount() {
    const contractAddress = this.props.address;

    try {
      const result = await ContractAPI.getCrowdsaleList()
      const { contracts } = result.data
      if (contracts) {
        const selectedContract = contracts.find(contract => {
          return contract.contract_address === contractAddress;
        });

        this.getICOStatus(selectedContract);

        this.setState({
          crowdsaleContracts: contracts,
          selectedContract
        });
      }
    } catch (e) {
    }
  }

  handleOnCrowdsaleContractChange = (value) => {
    const selectedContract = this.state.crowdsaleContracts.find((contract) => {
      return contract.contract_address === value;
    });

    this.getICOStatus(selectedContract);
  };

  getICOStatus = (selectedContract) => {
    if (!selectedContract)
      return;

    const contract = window.web3.eth.contract(crowdsaleAbi);
    const contractHandle = contract.at(selectedContract.contract_address);

    contractHandle.returnWebsiteData((err, res) => {
      //console.log(res);
      const currentStage = res[13].toNumber();
      const numContributors = res[2].toNumber();
      const ethRaised = res[3].toNumber();
      const totalTokensSold = res[6].toNumber();
      const tokenPrice = res[7].toNumber();
      const maxCap = res[4].toNumber();
      const minCap = res[5].toNumber();
      const isPaused = res[10];
      const isCrowdsaleClosed = res[11];
      const decimals = res[12].toNumber();

      this.setState({
        currentStage,
        numContributors,
        ethRaised,
        totalTokensSold,
        tokenPrice,
        maxCap,
        minCap,
        isPaused,
        isCrowdsaleClosed,
        decimals
      });
    });
  };

  handleOnClickStartICO = () => {
    const { selectedContract } = this.state;
    manage.startICO(selectedContract.contract_address).then(() => {
      console.log('Success');
      this.getICOStatus(selectedContract);
    }).catch((err) => {
      console.log(err);
    });
  };

  handleOnClickAdvanceMainSale = () => {
    const { selectedContract } = this.state;
    manage.advanceMainSale(selectedContract.contract_address).then(() => {
      console.log('Success');
      this.getICOStatus(selectedContract);
    }).catch((err) => {
      console.log(err);
    });
  };

  handleOnClickEmergencyStart = () => {
    const { selectedContract } = this.state;
    manage.emergencyStart(selectedContract.contract_address).then(() => {
      console.log('Success');
      this.getICOStatus(selectedContract);
    }).catch((err) => {
      console.log(err);
    });
  };

  handleOnClickEmergencyStop = () => {
    const { selectedContract } = this.state;
    manage.emergencyStop(selectedContract.contract_address).then(() => {
      console.log('Success');
      this.getICOStatus(selectedContract);
    }).catch((err) => {
      console.log(err);
    });
  };

  handleOnClickFinalize = () => {
    const { selectedContract } = this.state;
    manage.finalize(selectedContract.contract_address).then(() => {
      console.log('Success');
      this.getICOStatus(selectedContract);
    }).catch((err) => {
      console.log(err);
    });
  };

  render() {
    const { form } = this.props
    const { crowdsaleContracts, selectedContract, currentStage, numContributors, ethRaised, totalTokensSold, tokenPrice, maxCap, minCap, isPaused, isCrowdsaleClosed, decimals } = this.state;
    const factor = Math.pow(10, decimals);

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
                  <Select placeholder="Select crowdsale contract"
                    defaultValue={selectedContract ? selectedContract.contract_address : ''}
                    onChange={this.handleOnCrowdsaleContractChange}
                  >
                    {
                      crowdsaleContracts.map((contract) => (
                        <Option value={contract.contract_address}>{`${contract.contract_address} (${contract.token_contract.name})`}</Option>
                      ))
                    }
                  </Select>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Current Stage: {currentStage === 0 ? 'Not Started' : (currentStage === 1 ? 'PreSale' : 'MainSale')}</strong>
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Number Of Contributors: {numContributors}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Max Cap: {maxCap / factor}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Ether Raised: {ethRaised / factor}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Min Cap: {minCap / factor}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Total Tokens sold: {totalTokensSold / factor}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Paused: {isPaused.toString()}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Token Price: {tokenPrice / factor}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Crowdsale Closed: {isCrowdsaleClosed.toString()}</label>
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
                      <FormItem><Button type="primary" size="large" style={{ width: "150px" }} onClick={this.handleOnClickStartICO} disabled={currentStage !== 0}>Start ICO</Button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><Button type="success" size="large" className="btn btn-md btn-success" style={{ width: "150px" }} onClick={this.handleOnClickAdvanceMainSale} disabled={currentStage === 2 || currentStage === 0}>Advance MainSale</Button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><Button type="primary" size="large" className="btn btn-md btn-danger" style={{ width: "150px" }} onClick={this.handleOnClickEmergencyStop} disabled={isPaused === true}>Emergency Stop</Button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><Button disabled="" size="large" type="primary" className="ico-control-Button btn btn-md btn-warning" style={{ width: "150px" }} onClick={this.handleOnClickEmergencyStart} disabled={isPaused === false}>Emergency Start</Button></FormItem>
                    </div>
                    <div className="col-md-6">
                      <FormItem><Button type="primary" size="large" className="ico-control-Button btn btn-md btn-info" style={{ width: "150px" }} onClick={this.handleOnClickFinalize} disabled={isCrowdsaleClosed === true}>Finalize</Button></FormItem>
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
