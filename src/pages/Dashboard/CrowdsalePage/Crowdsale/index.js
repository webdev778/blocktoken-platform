import React from 'react'
import { Link } from 'react-router-dom'

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

import * as ContractAPI from 'lib/api/contract';

import { networks } from '../../../../constants';

import spinner from 'assets/images/spinner.gif';
import axios from "axios/index";
import './style.scss'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option


@Form.create()
class CreateCrowdsale extends React.Component {
  constructor(props) {
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

  storeContractToDatabase = async () => {
    const { multisigETH, tokensForTeam, minContributionPreSale, minContributionMainSale, maxContributionETH, maxCap, minCap, tokenPriceWei, campaignDurationDays, firstPeriod,
      secondPeriod, thirdPeriod, firstBonus, secondBonus, thirdBonus, presaleBonus, vestingDuration, vestingCliff, vestingStart, crowdsaleAddress, network, tokenAddress,
      isWhitelistingEnabled, isVestingEnabled, whitelistAddress } = this.state;

    const result = await ContractAPI.registCrowdsale(
      {
        multisigETH, tokensForTeam, minContributionPreSale, minContributionMainSale, maxContributionETH, maxCap, minCap, tokenPriceWei, campaignDurationDays, firstPeriod,
        secondPeriod, thirdPeriod, firstBonus, secondBonus, thirdBonus, presaleBonus, vestingDuration, vestingCliff, vestingStart, crowdsaleAddress, network, tokenAddress,
        isWhitelistingEnabled, isVestingEnabled, whitelistAddress
      }
    );
  }

  deployCrowdsaleContract = (e) => {

    e.preventDefault();

    const { form } = this.props;

    console.log('validate checking...');

    const token_len = this.state.tokenContracts.length

    if (!token_len) {
      message.error('Please deploy more than one token contracts before deploying crowdsale');
      return;
    }

    const { tokenAddress } = this.state;
    if (!tokenAddress) {
      message.warning('Please select a token');
      return;
    }

    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // return;
      }

      if (typeof window.web3 === 'undefined') {
        message.warning('Please enable metamask.');
        return;
      } else if (window.web3.eth.defaultAccount === undefined) {
        message.warning('Please unlock metamask.');
        return;
      }

      const setState = this.setState.bind(this);

      try {
        const crowdsaleAddress = await deployCrowdSale(this.state, setState);
        console.log('Deployed Phases Successfully Finished.');
        setState({ crowdsaleAddress });

        await allocateTokens(this.state, setState, crowdsaleAddress);
        console.log('AllocateTokens Phases Successfully Finished.');

        const whitelistAddress = await deployWhitelist(this.state, setState);
        console.log('DeployWhitelist Phases Successfully Finished.');
        setState({ whitelistAddress });


        await initializeWhitelist(this.state, setState, whitelistAddress);
        console.log('initializeWhitelist Phases Successfully Finished.');

        await initializeVesting(this.state, setState);
        console.log('initializeVesting Phases Successfully Finished.');

        await initializeToken(this.state, setState);
        console.log('initializeToken Phases Successfully Finished.');

        const result = await this.storeContractToDatabase();
        setState({ isSpinnerVisible: false });
        console.log('Save Contract to Database Successfully Finished.');
      } catch (e) {
        console.log(e);
        setState({ isSpinnerVisible: false });
        message.error('Failed to deploy.');
      }
    });

  };

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  handleOnTokenContractChange = (event) => {
    console.log(event)
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

    const testState = {
      multisigETH: '0x0b764c58df739c7456229dcc14eadc3121952e64',
      decimalUnits: 18,
      tokensForTeam: 50000,
      minContributionPreSale: 2000,
      minContributionMainSale: 500,
      maxContributionETH: 100,
      maxCap: 1000000000,
      minCap: 50000000,
      tokenPriceWei: 0.001,
      campaignDurationDays: 30,
      tokenAddress: '',
      whitelistAddress: '',
    };

    this.setState(testState);
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { selectedTokenContract, isSpinnerVisible, contractDeploymentStatus } = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Token Wizard</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="col">
            <div className="token-wizard">
              <Tabs defaultActiveKey="2" tabPosition="top" size="large">
                <TabPane tab={<Link to='/token-wizard/token'><span className="mainTab"><Icon type="home" />[STEP-1] Token Creator</span></Link>} key="1">
                </TabPane>
                <TabPane tab={<Link to='/token-wizard/crowdsale'><span className="mainTab"><Icon type="trophy" />[STEP-2] Smart Contract</span></Link>} key="2">
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
                              <Select placeholder="Select token contract" onChange={this.handleOnTokenContractChange} required >
                                {
                                  this.state.tokenContracts.map((contract) => (
                                    <Option key={contract} value={contract.contract_address}>{contract.name}</Option>
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
                          disabled={isSpinnerVisible}>
                          Deploy
                        </Button>
                        <span className="pull-right deployment-status">{contractDeploymentStatus}</span>

                        {
                          isSpinnerVisible ? (
                            <img
                              className="pull-right"
                              src={spinner}
                              width="32"
                              alt="Spinner"
                            />
                          ) : null
                        }
                      </Form>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCrowdsale
