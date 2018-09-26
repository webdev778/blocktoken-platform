import React from 'react'
import { Form, Select } from 'antd'
import axios from 'axios/index'

const FormItem = Form.Item
const Option = Select.Option

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contract: {}
    }
  }

  async componentDidMount() {
    const { address } = this.props

    try {

      const res = await axios.get('/api/v1.0/contract/getCrowdsaleContractByAddress/' + address)
      const { crowdsaleContract: contract } = res.data
      if (contract) {
        this.setState({ contract });
      }
    } catch (e) {
    }
  }

  render() {
    const { form } = this.props
    const { contract } = this.state

    return (
      <div className="card">
        <span>
          <a href="javascript: void(0);" onClick={this.props.onClose} className="mr-2 pull-right">
            <i className="icmn-cross" title="Close" width={16} />
          </a>
        </span>
        <div className="card-header">
          <div className="utils__title text-center" >
            <strong>Contract Detail</strong>
          </div>
        </div>
        <div className="card-body">
          <Form>
            <div className="col">
              <div className="row-lg-6">
                <FormItem>
                  <label className="form-label">
                    Contribution Wallet Address: {contract.multisig_eth}
                  </label>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Tokens For Team: {contract.tokens_for_team}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Minimum Contribution PreSale: {contract.min_presale}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Minimum Contribution MainSale: {contract.min_mainsale}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Max Contribution Ether: {contract.max_contrib_eth}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Maximum Cap: {contract.max_cap}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Minimum Cap: {contract.min_cap}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Token Price in ETH: {contract.token_price_wei}</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Campaign Duration Days: {contract.campaign_duration_days}</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">First Bonus: {contract.first_bonus}%</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">First Bonus Period: {contract.first_period} hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Second Bonus: {contract.second_bonus}%</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Second Bonus Period: {contract.second_period} hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Third Bonus: {contract.third_bonus}%</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Third Bonus Period: {contract.third_period} hours</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">PreSale Bonus: {contract.presale_bonus}%</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Vesting Duration: {contract.vesting_duration} seconds</label>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div className="row-lg-6">
                <FormItem>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Vesting Cliff: {contract.vesting_cliff} seconds</label>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Vesting Start: {contract.vesting_start} seconds</label>
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

Details.propTypes = {}

export default Details
