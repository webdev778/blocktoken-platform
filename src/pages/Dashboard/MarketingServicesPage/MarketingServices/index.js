import React from 'react'
import { Table, Button, Checkbox, notification } from 'antd'
import axios from 'axios';
import './style.scss'

const data = [{
  key: '1',
  product: 'Automated ChatBot Lead Magnet',
  overview: 'Custom designed Telegram & Facebook messenger chatbot which acts as a lead magnet, lead generator, and lead qualifier.',
}, {
  key: '2',
  product: 'Email Marketing Campaign',
  overview: 'We will promote your project and campaign to our database of 60,000 targeted crypto and blockchain investors.',
}, {
  key: '3',
  product: 'Email Marketing List',
  overview: 'Access our entire email marketing database of over 60,000 crypto investors.',
}, {
  key: '4',
  product: 'Content & Distribution',
  overview: '10 x 2,000-word articles drafted by our expert copywriters who will write a compelling press release around your ICO and related newsworthy content (up to 500 words)',
}, {
  key: '5',
  product: 'Custom Outreach Package',
  overview: 'Custom outreach package that includes email marketing, linkedin outreach, chatbot and ICO listings and media ad spend - packages can be scaled to suit your project.',
}, {
  key: '6',
  product: 'Bounty Campaign Management',
  overview: 'Structuring, setup and management of your bounty campaign and network of influencers.',
}, {
  key: '7',
  product: 'Token & Smart Contract Development',
  overview: 'Development of EOS or ERC20 token smart contract with pre-sale and main sale stages.',
}, {
  key: '8',
  product: 'Airdrop Campaign Management',
  overview: 'Structuring, setup and management of an Ethereum or EOS token airdrop.',
}, {
  key: '9',
  product: 'Full Campaign Management',
  overview: 'Full ICO/STO campaign budget, media and campaign management.',
}];

class MarketingServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selList: []
    }
  }

  componentDidMount() {
    axios.get('/api/v1.0/users/services')
      .then((result) => {
        if (result.status === 200)
        {
          var services = JSON.parse(result.data.marketing_services)
          this.setState({
            selList:services
          })

        }
      });
  }

  onChange = (e) => {
    if (e.target.checked === true) {
      this.state.selList.push(e.target.value);
    }
    else if (e.target.checked === false) {
      for (var i = 0; i < this.state.selList.length; i++) {
        if (this.state.selList[i] === e.target.value)
          this.state.selList.splice(i, 1);
      }
    }

    this.setState({
      selList: this.state.selList
    })
    var jsonString = JSON.stringify(this.state.selList);
    console.log(jsonString);
  }

  submitRequest = () => {
    axios.post('/api/v1.0/users/marketing', { marketing_services: JSON.stringify(this.state.selList) })
      .then((result) => {
        if (result.status === 200) {
          notification.open({
            type: 'success',
            message: 'Submit Success',
          })
        }
      });
  }

  render() {
    const columns = [
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
      },
      {
        title: 'Overview',
        dataIndex: 'overview',
        key: 'overview',
      },
      {
        title: '',
        key: 'action',
        render: (record) => (
          <Checkbox onChange={this.onChange} checked={this.state.selList.indexOf(record.key) !== -1 ? true : false} value={record.key}></Checkbox>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header" style={{ color: "#0B5393" }}>
          <h2><strong>Marketing Services</strong></h2>
        </div>
        <div className="card-body" style={{ marginLeft: '20px' }}>
          <h4>BlockToken provides the following marketing services. Check the services you need to setup a discussion with our team.</h4><br />
          <Table columns={columns} dataSource={data} align='right' />
          <Button className="btn btn-md btn-danger" type="primary" size='large' onClick={this.submitRequest}>Submit Request</Button>
        </div>
      </div>
    )
  }
}

export default MarketingServices
