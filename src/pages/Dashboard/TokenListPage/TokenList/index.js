import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import Balances from './Balances'
import axios from 'axios'
import './style.scss'

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
}

class TokenList extends React.Component {
  state = {
    tableData: null,
    data: null,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    viewBalance: false,
    address: null
  }

  componentDidMount() {
    axios.get('/api/v1.0/contract/token')
      .then((result) => {
        console.log(result);
        if (result.data) {
          this.setState({
            tableData: result.data.tokens,
            data: result.data.tokens,
          })
        }
      });
  }

  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager }
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager: pager,
      })
    }
  }

  handleOnClickDownloadContract = () => {
    axios({
      url: '/ico.sol',
      method: 'GET',
      responseType: 'blob', // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ico.sol')
      document.body.appendChild(link)
      link.click()
    })
  }

  handleOnClickBalances = (address) => {
    this.setState({ address, viewBalance: !this.state.viewBalance });
  }

  handleCloseBalances = () => {
    this.setState({ viewBalance: !this.state.viewBalance })
  }

  render() {
    let { pager, data, address } = this.state

    const columns = [
      {
        title: 'Token Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Token Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
      },
      {
        title: 'Token Version',
        dataIndex: 'version',
        key: 'version',
      },
      {
        title: 'Initial Supply',
        dataIndex: 'initial_supply',
        key: 'initial_supply',
      },
      {
        title: 'Decimal Points',
        dataIndex: 'decimal_points',
        key: 'decimal_points',
      },
      {
        title: 'Network',
        dataIndex: 'network',
        key: 'network',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a target="_blank" href={`http://${record.network}.etherscan.io/token/${record.contract_address}`} className="mr-2">
              <i className="icmn-eye mr-1" title="View on etherscan.io" width={16} />
            </a>
            <a href="javascript: void(0);" className="mr-2" onClick={() => { this.handleOnClickBalances(record.contract_address) }}>
              <i className="icmn-cog mr-1" title="View balances" width={16} />
            </a>
            <a
              href="javascript: void(0);"
              onClick={this.handleOnClickDownloadContract}
              className="mr-2"
            >
              <i className="icmn-download2 mr-1" title="Download Contract" width={16} />
            </a>
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        {
          this.state.viewBalance ?
            <Balances address={this.state.address} onClose={this.handleCloseBalances} />
            :
            <div>
              <div className="card-header">
                <div className="utils__title">
                  <strong>Token Contracts List</strong>
                </div>
              </div>
              <div className="card-body">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={pager}
                  onChange={this.handleTableChange}
                />
              </div>
            </div>
        }
      </div>
    )
  }
}

export default TokenList
