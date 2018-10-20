import React from 'react'
import { Row, Col, Form, Steps, Tag, Button, message } from 'antd'
import './style.scss'
import { connect } from 'react-redux'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import POI from './POI'
import POA from './POA'
import OtpInput from 'react-otp-input'
import QRCode from 'qrcode.react'
import CircularProgressbar from 'react-circular-progressbar';

import * as otpActions from 'ducks/otp'
import { bindActionCreators } from 'redux';


import {authenticator} from 'otplib';

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'
const Step = Steps.Step;

const kyc_steps = [{
  title: 'Proof of Identity'
}, {
  title: 'Proof of Address',
}];

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
  qrcodeURI: state.otp.get('secretURI'),
  otpSecret: state.otp.get('secret'),
  otpVerified: state.otp.get('verified')
})

const mapDispatchToProps = (dispatch, props) => ({
  OtpActions: bindActionCreators(otpActions, dispatch)
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)

@Form.create()
class Identity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMode: 0,
      kyc_current: 0,
      otpauth: '',
      otp: ''
    };
  }

  componentDidMount() {

    /*
    const {email} = this.props.userState;
    const otpauth = authenticator.keyuri(email, 'dash.blocktoken.ai', secret);
    
    this.setState({otpauth});
    */

    const { OtpActions } = this.props;

    OtpActions.getSecret();
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

  verifyOTP = async () => {
    /*
    const otp = this.state.otp;
    console.log(otp);
    const isValid = authenticator.check(otp, secret);
    if(isValid) {
      message.success('Token Verified', 5);
      return;
    }
    message.error('Wrong Token', 5);
    */    
    const { OtpActions } = this.props;
    const otp = this.state.otp;
    const secret = this.props.otpSecret;
    console.log(otp);
    OtpActions.verifyOTP({otp, secret});
  }

  render() {
    const { selectMode } = this.state;
    const { kyc_current } = this.state;
    const { userState, qrcodeURI } = this.props;

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
              <div>
                <Row type="flex" justify="center">
                  <h2>Please scan QR code below with your phone and input the pin code</h2>
                </Row>                
                <Row type="flex" justify="center">
                  { qrcodeURI && <QRCode value={qrcodeURI} /> }
                </Row>             
                <Row type="flex" justify="center" style={{marginTop:'1rem'}}>
                  <OtpInput
                    onChange={otp => {this.setState({otp})}}
                    numInputs={6}
                    separator={<span>-</span>}
                    inputStyle={{'width':'2rem', 'height': '3rem'}}
                  />
                </Row>
                {/* <Row type="flex" justify="center" style={{marginTop:'1rem'}}>
                  <CircularProgressbar
                    percentage={otpTimeRemain}
                    text={`${(60-otpTimeRemain)/60*100}%`}
                  />
                </Row>                                               */}
                <Row type="flex" justify="center" style={{marginTop:'1rem'}}>
                  <Button type="primary" onClick={this.verifyOTP}>Verify</Button>
                </Row>   
              </div>
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
                  {
                      this.props.otpVerified ? 
                      <Tag color="#87d068">Verification Success</Tag> :
                      <Tag color="#f50">You have to verify</Tag>
                  }
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
