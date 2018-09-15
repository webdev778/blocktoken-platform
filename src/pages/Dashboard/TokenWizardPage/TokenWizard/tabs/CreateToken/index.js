import React from 'react'
import { Form, Icon, Input, message,Button } from 'antd'

import Page from 'components/LayoutComponents/Page'
import spinner from '../../../../../../assets/images/spinner.gif';
import abi from '../../../../../../contracts/TokenAbi';
import bytecode from '../../../../../../contracts/TokenBytecode';
import {networks} from '../../../../../../constants';
import axios from "axios/index";
import * as appActions from 'ducks/app';

const FormItem = Form.Item

class CreateToken extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      publicTokenName: '',
      tokenSymbol: '',
      tokenVersion: '',
      initialSupply: '',
      decimalUnits: '',
      network: '',
      isSpinnerVisible: false,
      contractDeploymentStatus: '',
    };
  }

  deployTokenContract = (e) => {
    e.preventDefault();
    console.log("Deploying start");
    if (typeof window.web3 === 'undefined') {
      message.warning('Please enable metamask.');
      return false;
    } else if (window.web3.eth.defaultAccount === undefined) {
      message.warning('Please unlock metamask.');
      return false;
    }

    window.web3.version.getNetwork((err, netId) => {
      this.setState({
        network: networks[netId]
      });
    });

    const clientAddress = window.web3.eth.defaultAccount;
    const contractToken = window.web3.eth.contract(abi);
    const {initialSupply, publicTokenName, decimalUnits, tokenSymbol, tokenVersion} = this.state;

    this.setState({
      isSpinnerVisible: true,
    });
    contractToken.new(
    initialSupply,
    publicTokenName,
    decimalUnits,
    tokenSymbol,
    tokenVersion,
    {
      data: bytecode,
      from: clientAddress,
      gas: 4000000,
      gasPrice: 40000000000
    }, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      // If we have an address property, the contract was deployed
      if (res.address) {
        const {network} = this.state;
        const contractDeploymentStatus = `Your contract has been deployed at <a target="_blank" href="http://${network}.etherscan.io/address/${res.address}">http://${network}.etherscan.io/address/${res.address}</a>`;
        const contractDeploymentSuccessMsg = `Your contract has been deployed at http://${network}.etherscan.io/address/${res.address}`;

        this.setState({
          isSpinnerVisible: false,
          contractDeploymentStatus
        });
        message.success(contractDeploymentSuccessMsg);

        axios.post('/api/v1.0/contract/token',
          {
            publicTokenName,
            tokenSymbol,
            tokenVersion,
            initialSupply,
            decimalUnits,
            contractHash: res.address,
            network,
          }
        ).then(() => {
          appActions.goToPage('/token/list');
        });
        console.log("Your contract has been deployed at http://" + network + ".etherscan.io/address/" + res.address);
        console.log("Note that it might take 30 - 90 seconds for the block to propagate before it's visible in etherscan.io");
      } else {
        const contractDeploymentStatus = 'Waiting for a mined block to include your contract...';

        this.setState({
          contractDeploymentStatus
        });
        console.log(contractDeploymentStatus);
      }
    }
  );
};

  handlePublicTokenNameChange = (e) => {
    this.setState({
      publicTokenName: e.target.value
    });
  };

  handleTokenSymbolChange = (e) => {
    this.setState({
      tokenSymbol: e.target.value
    });
  };

  handleTokenVersionChange = (e) => {
    this.setState({
      tokenVersion: e.target.value
    });
  };

  handleInitialSupplyChange = (e) => {
    this.setState({
      initialSupply: e.target.value
    });
  };

  handleDecimalUnitsChange = (e) => {
    this.setState({
      decimalUnits: e.target.value
    });
  };
  
  render() {
    const { form } = this.props

    const {initialSupply, publicTokenName, decimalUnits, tokenSymbol, tokenVersion, isSpinnerVisible, contractDeploymentStatus} = this.state;

    return (
      <Page>
      <div className="card">
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>Token Contract</strong>
          </div>
        </div>
        <div className="card-body">
          <Form onSubmit={this.deployTokenContract} className="login-form">
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Coin or Token Name</strong>
                  </label>
                  <Input type="text" placeholder="e.g. ICO token" required onChange={this.handlePublicTokenNameChange} value={publicTokenName}/>
                  <label className="form-label">This is full name of your token</label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Choose A Symbol</strong>
                  </label>
                  <Input type="text" placeholder="e.g. ICO" onChange={this.handleTokenSymbolChange} required value={tokenSymbol} />
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
                  <Input type="text" placeholder="e.g. 1.0" onChange={this.handleTokenVersionChange} value={tokenVersion} />
                  <label className="form-label">Which version of token is it?</label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    <strong>Initial Supply</strong>
                  </label>
                  <Input type="text" placeholder="e.g. 1000000" onChange={this.handleInitialSupplyChange} required value={initialSupply} />
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
                  <Input type="text" placeholder="e.g. 18" onChange={this.handleDecimalUnitsChange} required value={decimalUnits} />
                  <label className="form-label">How small fraction would you like to offer?</label>
                </FormItem>
              </div>
            </div>
            <Button type="primary" className="btn btn-primary pull-right" htmlType="submit" size="large"
              disabled = {isSpinnerVisible}>
              Deploy
            </Button>
            <span className="pull-right deployment-status" style={{padding: '1em'}}><div dangerouslySetInnerHTML={{__html: contractDeploymentStatus}}></div></span>

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
      </Page>
    )
  }
}

export default CreateToken
