import React from 'react'
import { Form, Button, Steps, notification, Tag, message } from 'antd'
import './style.scss'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import POI from './POI'
import POA from './POA'

const Step = Steps.Step;

const kyc_steps = [{
  title: 'Proof of Identity',
  content: <POI onValueChange={this.handleOnValueChange} variables={this.state}/>,
}, {
  title: 'Proof of Address',
  content: <POA/>,
}];

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
    this.setState({selectMode: 1})
  }
  
  TFAClick = () => {
    this.setState({selectMode: 2})
  }

  onClose = () => {
    this.setState({selectMode: 0, kyc_current: 0})
  }

  handleOnValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  render() {
    const { selectMode } = this.state;
    const { kyc_current } = this.state;
    const status = window.localStorage.getItem('app.Status')

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Identity</strong>
            {
              (selectMode !== 0) ?
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
          (selectMode == 1) ?
            <div className="col-lg-9">
              <Steps current={kyc_current}>
                {kyc_steps.map(item => <Step key={item.title} title={item.title} />)}
              </Steps>
              <div className="steps-content">
                {
                  (kyc_current == 0) &&
                  <POI onValueChange={this.handleOnValueChange} variables={this.state} onClose={this.onClose}/>
                }
                {
                  (kyc_current == 1) &&
                  <POA onValueChange={this.handleOnValueChange} variables={this.state} onClose={this.onClose}/>
                }
              </div>
              
            </div>
          : null
        }

        {
          (selectMode == 2) ? 
          <div></div>
          : null
        }
          
        {
          (selectMode == 0) ?
          <div className="row">
            <div className="col-lg-6 text-center">
              {
                (status == 2 || status == 5) &&
                <div>
                  <a href="javascript: void(0);">
                    <PaymentCard
                      icon={'lnr lnr-license'}
                      name={'KYC'}
                    />
                  </a>
                  <Tag color="#87d068">Verification Success</Tag>
                </div>
              }
              {
                (status == 1 || status == 4) &&
                <div>
                  <a>
                    <PaymentCard
                      icon={'lnr lnr-license'}
                      name={'KYC'}
                    />
                  </a>
                  <Tag color="#2db7f5">Review in your verification</Tag>
                </div>
              }
              {
                (status == 0 || status == 3) &&
                <div>
                  <a onClick={this.KYCClick}>
                    <PaymentCard
                      icon={'lnr lnr-license'}
                      name={'KYC'}
                    />
                  </a>
                  <Tag color="#f50">You have to verify</Tag>
                </div>
              }
            </div>
            <div className="col-lg-6 text-center">
              <a onClick={this.TFAClick}>
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
