import React from 'react'
import { Form, Button, Row, Col, Timeline, Input, Card, Upload } from 'antd'
import './style.scss'
import PaymentCard from 'components/CleanComponents/PaymentCard'

const FormItem = Form.Item
const {Meta} = Card;

@Form.create()
class Identity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMode: 0
    };
  }

  KYCClick = () => {
    this.setState({selectMode: 1})
  }

  TFAClick = () => {
    this.setState({selectMode: 2})
  }

  onClose = () => {
    this.setState({selectMode: 0})
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { selectMode } = this.state;

    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }];

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
    };
  
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
          (selectMode === 1) ?
          <Timeline>
            <Timeline.Item color="black">
              <p><strong>1. PERSONAL INFORMATION</strong></p>
              <div className="row">
                <div className="col-lg-6">
                  <FormItem label="First Name">
                    {getFieldDecorator('firstname', {
                      initialValue: '',
                      rules: [{ required: true, message: 'Please input your First Name!' }],
                    })(<Input />)}
                  </FormItem>
                </div>
                <div className="col-lg-6">
                  <FormItem label="Address">
                    {getFieldDecorator('address', {
                      initialValue: '',
                      rules: [{ required: true, message: 'Please input your Address!' }],
                    })(<Input />)}
                  </FormItem>
                </div>
                <div className="col-lg-6">
                  <FormItem label="Last Name">
                    {getFieldDecorator('lastname', {
                      initialValue: '',
                      rules: [{ required: true, message: 'Please input your Last Name!' }],
                    })(<Input />)}
                  </FormItem>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color="black">
              <p><strong>2. PERSONAL DOCUMENTS</strong></p>
              <Card title="Select Document" bordered={false}>
                <Row gutter={30}>
                  <Col span={8}>
                    <Upload {...props}>
                      <Card
                        bordered={false}
                        hoverable
                        style={{ width:200, height: 300 }}
                        cover={<img class="center" alt="passport" src="https://i.ebayimg.com/images/g/yf0AAOSwjqVZBTcJ/s-l640.jpg" />}
                      >
                      </Card>
                    </Upload>
                  </Col>
                  <Col span={8}>
                    <Upload {...props}>
                      <Card
                        bordered={false}
                        hoverable
                        style={{ width:200, height: 300 }}
                        cover={<img class="center" alt="identity" src="https://thumb1.shutterstock.com/display_pic_with_logo/3185162/767911606/stock-vector-passport-id-identity-card-of-sexy-woman-767911606.jpg" />}
                      >
                      </Card>
                    </Upload>
                  </Col>
                  <Col span={8}>
                    <Upload {...props}>
                      <Card
                        bordered={false}
                        hoverable
                        style={{ width:200, height: 300 }}
                        cover={<img alt="driver" align="bottom" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0kFzcbzARVb4Ed9o6Nwao6QDHGliH4QaO7GUAMftlVsQEPFUDlw"/>}
                      >
                      </Card>
                    </Upload>
                  </Col>
                </Row>
                
              </Card>
            </Timeline.Item>
            <Timeline.Item color="black"></Timeline.Item>
            <Button type="primary" className="mr-3 pull-right">
              Save
            </Button>
          </Timeline>
          : null
        }

        {
          (selectMode === 2) ? 
          <div></div>
          : null
        }
          
        {
          (selectMode === 0) ?
          <div className="row">
            <div className="col-lg-6">
              <a onClick={this.KYCClick}>
                <PaymentCard
                  icon={'lnr lnr-license'}
                  name={'KYC'}
                />
              </a>
            </div>
            <div className="col-lg-6">
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
