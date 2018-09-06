import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

class Bonuses extends React.Component {

  handleOnFirstPeriodChange = (e) => {
    this.props.onValueChange('firstPeriod', e.target.value);
  };

  handleOnSecondPeriodChange = (e) => {
    this.props.onValueChange('secondPeriod', e.target.value);
  };

  handleOnThirdPeriodChange = (e) => {
    this.props.onValueChange('thirdPeriod', e.target.value);
  };

  handleOnFirstBonusChange = (e) => {
    this.props.onValueChange('firstBonus', e.target.value);
  };

  handleOnSecondBonusChange = (e) => {
    this.props.onValueChange('secondBonus', e.target.value);
  };

  handleOnThirdBonusChange = (e) => {
    this.props.onValueChange('thirdBonus', e.target.value);
  };

  handleOnPresaleBonusChange = (e) => {
    this.props.onValueChange('presaleBonus', e.target.value);
  };

  render() {
    const {variables} = this.props;

    return (
      <div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>First Period</strong>
            </label>
            <Input type="text" placeholder="e.g. 10" onChange={this.handleOnFirstPeriodChange} value={variables.firstPeriod} />
            <label className="form-label">
              The amount of the first reward / bonus period in hours.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Second Period</strong>
            </label>
            <Input type="text" placeholder="e.g. 240" onChange={this.handleOnSecondPeriodChange} value={variables.secondPeriod} />
            <label className="form-label">
              The amount of the second reward / bonus period in hours.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Third Period</strong>
            </label>
            <Input type="text" placeholder="e.g. 480" onChange={this.handleOnThirdPeriodChange} value={variables.thirdPeriod} />
            <label className="form-label">
              The amount of the third reward / bonus period in hours.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>First Bonus</strong>
            </label>
            <Input type="text" placeholder="e.g. 20" onChange={this.handleOnFirstBonusChange} value={variables.firstBonus} />
            <label className="form-label">
              The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100
              tokens and bonus is 50%, user gets 150 tokens.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Second Bonus</strong>
            </label>
            <Input type="text" placeholder="e.g. 10" onChange={this.handleOnSecondBonusChange} value={variables.secondBonus} />
            <label className="form-label">
              The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100
              tokens and bonus is 50%, user gets 150 tokens.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Third Bonus</strong>
            </label>
            <Input type="text" placeholder="e.g. 5" onChange={this.handleOnThirdBonusChange} value={variables.thirdBonus} />
            <label className="form-label">
              The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100
              tokens and bonus is 50%, user gets 150 tokens.
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Presale Bonus</strong>
            </label>
            <Input type="text" placeholder="e.g. 50" onChange={this.handleOnPresaleBonusChange} value={variables.presaleBonus} />
            <label className="form-label">
              The bonus is a percentage of the amount of purchased tokens.
            </label>
          </FormItem>
        </div>
      </div>
    )
  }
}

export default Bonuses
