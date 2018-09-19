import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

class IcoContract extends React.Component {
  handleDecimalUnitsChange = (e) => {
    this.props.onValueChange('decimalUnits', e.target.value);
  };

  handleOnMultisigETHChange = (e) => {
    this.props.onValueChange('multisigETH', e.target.value);
  };

  handleOnTokensForTeamChange = (e) => {
    this.props.onValueChange('tokensForTeam', e.target.value);
  };

  handleOnMinContributionPreSaleChange = (e) => {
    this.props.onValueChange('minContributionPreSale', e.target.value);
  };

  handleOnMinContributionMainSaleChange = (e) => {
    this.props.onValueChange('minContributionMainSale', e.target.value);
  };

  handleOnMaxContributionETHChange = (e) => {
    this.props.onValueChange('maxContributionETH', e.target.value);
  };

  handleOnMaxCapChange = (e) => {
    this.props.onValueChange('maxCap', e.target.value);
  };

  handleOnMinCapChange = (e) => {
    this.props.onValueChange('minCap', e.target.value);
  };

  handleOnTokenPriceWeiChange = (e) => {
    this.props.onValueChange('tokenPriceWei', e.target.value);
  };

  handleOnCampaignDurationDaysChange = (e) => {
    this.props.onValueChange('campaignDurationDays', e.target.value);
  };

  render() {
    const {variables} = this.props;

    return (
      <div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Contribution Wallet Address</strong>
            </label>
            <Input
              type="text"
              placeholder="e.g. 0x6C88e6C76C1Eb3b130612D5686BE9c0A0C78925B"
              onChange={this.handleOnMultisigETHChange}
              required
              value={variables.multisigETH}
            />
            <label className="form-label">
              The Contribution Wallet Address to which contributions will be sent after campaign out
              of the ICO contract. It is owned by the client.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Tokens For Team</strong>
            </label>
            <Input type="text" placeholder="e.g. 10000000" onChange={this.handleOnTokensForTeamChange} value={variables.tokensForTeam} />
            <label className="form-label">
              ICO are projects in the making. The team/advisors are rewarded with tokens and these
              tokens need to be reserved so they are not sold out.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Minimum Contribution PreSale</strong>
            </label>
            <Input type="text" placeholder="e.g. 0.2" onChange={this.handleOnMinContributionPreSaleChange} required value={variables.minContributionPreSale} />
            <label className="form-label">Minimum Contribution PreSale</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Minimum Contribution MainSale</strong>
            </label>
            <Input type="text" placeholder="e.g. 0.1" onChange={this.handleOnMinContributionMainSaleChange} required value={variables.minContributionMainSale} />
            <label className="form-label">Minimum Contribution MainSale</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Max Contribution Ether</strong>
            </label>
            <Input type="text" placeholder="e.g. 1000" onChange={this.handleOnMaxContributionETHChange} required value={variables.maxContributionETH} />
            <label className="form-label">
              The maximum amount of ether a contributor can contribute to a campaign.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Minimum Cap</strong>
            </label>
            <Input type="text" placeholder="e.g. 1000" onChange={this.handleOnMinCapChange} required value={variables.minCap} />
            <label className="form-label">
              The minimum amount campaign has to generate. If less is generated than this, campaign
              is cancelled and contributions refunded.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Maximum Cap</strong>
            </label>
            <Input type="text" placeholder="e.g. 100000" onChange={this.handleOnMaxCapChange} required value={variables.maxCap} />
            <label className="form-label">
              The max amount campaign can accept. If this amount is reached campaign is finished.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Token Price in ETH</strong>
            </label>
            <Input type="text" placeholder="e.g. 0.0003" onChange={this.handleOnTokenPriceWeiChange} required value={variables.tokenPriceWei} />
            <label className="form-label">Price of token in ETH</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Campaign Duration Days</strong>
            </label>
            <Input type="text" placeholder="e.g. 1" onChange={this.handleOnCampaignDurationDaysChange} required value={variables.campaignDurationDays} />
            <label className="form-label">The length of the campaign in days</label>
          </FormItem>
        </div>
      </div>
    )
  }
}

export default IcoContract
