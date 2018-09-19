import React from 'react'
import { Form, Icon, Input, message, Tabs, Checkbox, Select, Button } from 'antd'
import IcoContract from './tabs/ico-contract/IcoContract'
import Bonuses from './tabs/bonuses/Bonuses'
import Vesting from './tabs/vesting/Vesting'
import deployCrowdSale from 'utils/deployCrowdsale';
import allocateTokens from 'utils/allocateTokens';
import deployWhitelist from 'utils/deployWhitelist';
import initializeToken from 'utils/initializeToken';
import initializeVesting from 'utils/initializeVesting';
import initializeWhitelist from 'utils/initializeWhitelist';
import saveToDatabase from 'utils/saveToDatabase';

import {networks} from '../../../../../../constants';

import spinner from 'assets/images/spinner.gif';
import axios from "axios/index";


const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option


class CreateCrowdsale extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      decimalUnits: '',
      multisigETH: '',
      tokensForTeam: '',
      minContributionPreSale: '',
      minContributionMainSale: '',
      maxContributionETH: '',
      maxCap: '',
      minCap: '',
      tokenPriceWei: '',
      campaignDurationDays: '',
      firstPeriod: '',
      secondPeriod: '',
      thirdPeriod: '',
      firstBonus: '',
      secondBonus: '',
      thirdBonus: '',
      presaleBonus: '',
      vestingDuration: '',
      vestingCliff: '',
      vestingStart: '',
      network: '',
      isSpinnerVisible: false,
      tokenContracts: [],
      selectedTokenContract: null,
      contractDeploymentStatus: '',
      isWhitelistingEnabled: false,
      isVestingEnabled: false,

      tokenAddress: '',
      crowdsaleAddress: '',
      whitelistAddress: '',
    };
  }

  deployCrowdsaleContract = async (e) => {

    e.preventDefault();

    if (typeof window.web3 === 'undefined') {
      message.warning('Please enable metamask.');
      return;
    } else if (window.web3.eth.defaultAccount === undefined) {
      message.warning('Please unlock metamask.');
      return;
    }

    const setState = this.setState.bind(this);

    try{
      const crowdsaleAddress = await deployCrowdSale(this.state, setState);
      setState({ crowdsaleAddress });
      await allocateTokens(this.state, setState, crowdsaleAddress);      
      const whitelistAddress = await deployWhitelist(this.state, setState);
      setState({ whitelistAddress });
      await initializeWhitelist(this.state, setState, whitelistAddress);
      await initializeVesting(this.state, setState);
      await initializeToken(this.state, setState);
      saveToDatabase(this.state, this.props);
    }catch(e){
      console.log(e);      
    }

    /*
    const sequence = Promise.resolve();
    const setState = this.setState.bind(this);

    sequence.then(() => {
      return deployCrowdSale(this.state, setState);
    }).then((crowdsaleAddress, err) => {
      setState({
        crowdsaleAddress: crowdsaleAddress
      });
      return allocateTokens(this.state, setState, crowdsaleAddress);
    }).then(() => {
      return deployWhitelist(this.state, setState);
    }).then((whitelistAddress, err) => {
      console.log('Whitelist address: ', whitelistAddress);
      setState({
        whitelistAddress: whitelistAddress
      });
      return initializeWhitelist(this.state, setState, whitelistAddress);
    }).then(() => {
      return initializeVesting(this.state, setState);
    }).then(() => {
      return initializeToken(this.state, setState);
    }).then(() => {
      saveToDatabase(this.state, this.props);
    });
    */
  };

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  handleOnTokenContractChange = (event) => {
    this.setState({
      tokenAddress: event
    });

    axios.get('/api/v1.0/contract/getTokenContractByAddress/' + event)
      .then((res) => {
        var data = res.data.token[0];
        if (data.decimal_points) {
          this.setState({
            decimalUnits: data.decimal_points,
            selectedTokenContract: data,
          });
        } else {
          this.setState({
            decimalUnits: '',
            selectedTokenContract: null,
          });
          message.warning('Something is wrong with token contract. Please try again.');
        }
      });
  };

  componentDidMount() {
    let network = '';

    if (typeof window.web3 === 'undefined') {
      message.warning('Please enable metamask.');
      return;
    } else if (window.web3.eth.defaultAccount === undefined) {
      message.warning('Please unlock metamask.');
      return;
    }

    axios.get('/api/v1.0/contract/token')
      .then((result) => {
        this.setState({
          tokenContracts: result.data.tokens || [],
        });
      });

    window.web3.version.getNetwork((err, netId) => {
      console.log(err, netId, networks[netId]);
      this.setState({
        network: networks[netId]
      });
    });
  }

  render() {
    const { form } = this.props
    const {selectedTokenContract, isSpinnerVisible, contractDeploymentStatus} = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center">
            <strong>Crowdsale Contract</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.deployCrowdsaleContract} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Token Contract</strong>
                  </label>
                  <Select placeholder="Select token contract" onChange={this.handleOnTokenContractChange} required value={this.state.tokenAddress}>
                    <Option value="">Select token contract</Option>
                    {
                      this.state.tokenContracts.map((contract) => (
                        <Option value={contract.contract_address}>{contract.name}</Option>
                      ))
                    }
                  </Select>
                  <Checkbox
                    onChange={() => {
                      this.handleOnValueChange(
                        'isWhitelistingEnabled',
                        !this.state.isWhitelistingEnabled,
                      )
                    }}
                    value={this.state.isWhitelistingEnabled}
                  >
                    Whitelisting enabled?
                  </Checkbox>
                  <Checkbox
                    onChange={() => {
                      this.handleOnValueChange('isVestingEnabled', !this.state.isVestingEnabled)
                    }}
                    value={this.state.isVestingEnabled}
                  >
                    Vesting enabled
                  </Checkbox>
                </FormItem>
              </div>

              {
                selectedTokenContract && (
                  <div className="token-contract-details">
                    <div className="row">
                      <div className="col-lg-6">
                        <p>Token Name: {selectedTokenContract.name}</p>
                        <p>Version: {selectedTokenContract.version}</p>
                        <p>Decimal Points: {selectedTokenContract.decimal_points}</p>
                      </div>
                      <div className="col-lg-6">
                        <p>Token Symbol: {selectedTokenContract.symbol}</p>
                        <p>Initial Supply: {selectedTokenContract.initial_supply}</p>
                        <p>Deployed Network: {selectedTokenContract.network}</p>
                      </div>
                    </div>
                  </div>
                )
              }

              <Tabs defaultActiveKey="1">
                <TabPane tab="ICO Contract" key="1">
                  <IcoContract 
                    onValueChange={this.handleOnValueChange}
                    variables={this.state} />
                </TabPane>
                <TabPane tab="Bonuses" key="2">
                  <Bonuses 
                    onValueChange={this.handleOnValueChange}
                    variables={this.state} />
                </TabPane>
                {this.state.isVestingEnabled && (
                  <TabPane tab="Vesting" key="3">
                    <Vesting 
                      onValueChange={this.handleOnValueChange}
                      variables={this.state} />
                  </TabPane>
                )}
              </Tabs>
            </div>
            <Button type="primary" htmlType="submit" className="btn btn-primary pull-right" size="large"
              disabled = {isSpinnerVisible}>
              Deploy
            </Button>
            <span className="pull-right deployment-status">{contractDeploymentStatus}</span>

            {
              isSpinnerVisible ? (
                <img
                  className="pull-right"
                  src={spinner}
                  width="32"
                />
              ) : null
            }
          </Form>
        </div>
      </div>
    )
  }
}

export default CreateCrowdsale
