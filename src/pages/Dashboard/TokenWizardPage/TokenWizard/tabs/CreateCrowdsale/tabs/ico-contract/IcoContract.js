import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

class IcoContract extends React.Component {
  render() {
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
              required
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
            <Input type="text" placeholder="e.g. 10000000" required />
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
            <Input type="text" placeholder="e.g. 0.2" required />
            <label className="form-label">Minimum Contribution PreSale</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Minimum Contribution MainSale</strong>
            </label>
            <Input type="text" placeholder="e.g. 0.1" required />
            <label className="form-label">Minimum Contribution MainSale</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Max Contribution Ether</strong>
            </label>
            <Input type="text" placeholder="e.g. 1000" required />
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
            <Input type="text" placeholder="e.g. 1000" required />
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
            <Input type="text" placeholder="e.g. 100000" required />
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
            <Input type="text" placeholder="e.g. 0.0003" required />
            <label className="form-label">Price of token in ETH</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Campaign Duration Days</strong>
            </label>
            <Input type="text" placeholder="e.g. 1" required />
            <label className="form-label">The length of the campaign in days</label>
          </FormItem>
        </div>
      </div>
    )
  }
}

export default IcoContract
