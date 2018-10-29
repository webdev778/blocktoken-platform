import React from 'react'
import { Form, Button, Input } from 'antd'
import telegram from '../../../assets/images/telegram.png';
import facebook from '../../../assets/images/facebook.png';
import twitter from '../../../assets/images/twitter.png';

const FormItem = Form.Item;
@Form.create()
class NotFoundPage extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="card">
        <div className="card-body" style={{ marginLeft: '20px' }}>
          <h4>We are still developing this feature - stay tuned through our newsletter or join our Telegram community channel.</h4><br />
          <div className="row">
            <div className="col-lg-3">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(
                  <Input placeholder="Your name" style={{ width: 250 }} />
                )}
              </FormItem>
            </div>
            <div className="col-lg-3">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input type="email" placeholder="Your email" style={{ width: 250 }} />
                )}
              </FormItem>
            </div>
          </div>
          <FormItem>
            <Button className="btn btn-md btn-danger" type="primary" size='large'>Subscribe to BlockToken News</Button>
          </FormItem>
        </div>

        <div className="card-header" style={{ color: "#0B5393" }}>
          <h2><strong>Join us on Telegram and Social Channels</strong></h2>
        </div>
        <div className="card-body" style={{ marginLeft: '20px' }}>
          <div className="row">
            <div className="col-lg-2">
              <a href="javascript: void(0);">
                <img src={telegram} width="125" alt="telegram" />
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript: void(0);">
                <img src={facebook} width="125" alt="facebook" />
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript: void(0);">
                <img src={twitter} width="125" alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NotFoundPage
