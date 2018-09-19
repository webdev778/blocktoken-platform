import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

class Vesting extends React.Component {
  handleOnVestingDurationChange = (e) => {
    this.props.onValueChange('vestingDuration', e.target.value);
  };

  handleOnVestingCliffChange = (e) => {
    this.props.onValueChange('vestingCliff', e.target.value);
  };

  handleOnVestingStartChange = (e) => {
    this.props.onValueChange('vestingStart', e.target.value);
  };

  render() {
    const {variables} = this.props;

    return (
      <div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Vesting Duration</strong>
            </label>
            <Input type="text" placeholder="e.g. 16" onChange={this.handleOnVestingDurationChange} value={variables.vestingDuration} />
            <label className="form-label">Vesting Duration is Length of vesting (seconds)</label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Vesting Cliff</strong>
            </label>
            <Input type="text" placeholder="e.g. 0" onChange={this.handleOnVestingCliffChange} value={variables.vestingCliff} />
            <label className="form-label">
              Vesting Cliff is time after start when vesting begins (seconds)
            </label>
          </FormItem>
        </div>
        <div className="row-lg-6">
          <FormItem>
            <label className="form-label">
              <strong>Vesting Start</strong>
            </label>
            <Input type="text" placeholder="e.g. 0" onChange={this.handleOnVestingStartChange} value={variables.vestingStart} />
            <label className="form-label">VestingStart is Start time of vesting (Unix time)</label>
          </FormItem>
        </div>
      </div>
    )
  }
}

export default Vesting
