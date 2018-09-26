import React from 'react'
import { Form, Steps, Tag } from 'antd'
import './style.scss'
import { connect } from 'react-redux'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import POI from './POI'
import POA from './POA'

const Step = Steps.Step;

const kyc_steps = [{
  title: 'Proof of Identity'
}, {
  title: 'Proof of Address',
}];

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
)

@Form.create()
class Identity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMode: 0,
      kyc_current: 0,
    };
  }

  KYCClick = () => {
    this.setState({ selectMode: 1 })
  }

  TFAClick = () => {
    this.setState({ selectMode: 2 })
  }

  onClose = () => {
    this.setState({ selectMode: 0, kyc_current: 0 })
  }

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  render() {
    const { selectMode } = this.state;
    const { kyc_current } = this.state;
    const { userState } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Identity</strong>
            {
              (Number(selectMode) !== 0) ?
                <span>
                  <a href="javascript: void(0);" className="mr-2 pull-right" onClick={this.onClose}>
                    <i className="icmn-cross" title="Close" width={16} />
                  </a>
                </span>
                : null
            }

          </div>
        </div>
        <div className="card-body">
          {
            (Number(selectMode) === 1) ?
              <div className="col-lg-9">
                <Steps current={kyc_current}>
                  {kyc_steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">
                  {
                    (Number(kyc_current) === 0) &&
                    <POI onValueChange={this.handleOnValueChange} variables={this.state} onClose={this.onClose} />
                  }
                  {
                    (Number(kyc_current) === 1) &&
                    <POA onValueChange={this.handleOnValueChange} variables={this.state} onClose={this.onClose} />
                  }
                </div>

              </div>
              : null
          }

          {
            (Number(selectMode) === 2) ?
              <div></div>
              : null
          }

          {
            (Number(selectMode) === 0) ?
              <div className="row">
                <div className="col-lg-6 text-center">
                  <div>
                    <a href="javascript: void(0);" onClick={this.KYCClick}>
                      <PaymentCard
                        icon={'lnr lnr-license'}
                        name={'KYC'}
                      />
                    </a>
                    {
                      (Number(userState.kyc_status) === 2) &&
                      <Tag color="#87d068">Verification Success</Tag>
                    }
                    {
                      (Number(userState.kyc_status) === 1) &&
                      <Tag color="#2db7f5">Review in your verification</Tag>
                    }
                    {
                      (Number(userState.kyc_status) === 0) &&
                      <Tag color="#f50">You have to verify</Tag>
                    }
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <a href="javascript: void(0);" onClick={this.TFAClick}>
                    <PaymentCard
                      icon={'lnr lnr-briefcase'}
                      name={'2FA'}
                    />
                  </a>
                </div>
              </div>
              : null
          }
        </div>
      </div>
    )
  }
}

export default Identity
