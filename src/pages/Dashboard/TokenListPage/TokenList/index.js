import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import tableData from './data.json'
import axios from 'axios'
import './style.scss'

import EyeIcon from '../../../../assets/images/eye.png'
import ManageIcon from '../../../../assets/images/manage.png'
import DownloadIcon from '../../../../assets/images/download.png'

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
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
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

  render() {
    let { pager, data } = this.state

    const columns = [
      {
        title: 'Token Name',
        dataIndex: 'token_name',
        key: 'token_name',
        sorter: (a, b) => a.token_name.length - b.token_name.length,
      },
      {
        title: 'Token Symbol',
        dataIndex: 'token_symbol',
        key: 'token_symbol',
        sorter: (a, b) => a.token_symbol.length - b.token_symbol.length,
      },
      {
        title: 'Token Version',
        dataIndex: 'token_version',
        key: 'token_version',
        sorter: (a, b) => a.token_version.length - b.token_version.length,
      },
      {
        title: 'Initial Supply',
        dataIndex: 'initial_supply',
        key: 'initial_supply',
        sorter: (a, b) => a.initial_supply.length - b.initial_supply.length,
      },
      {
        title: 'Decimal Points',
        dataIndex: 'dec_points',
        key: 'dec_points',
        sorter: (a, b) => a.dec_points.length - b.dec_points.length,
      },
      {
        title: 'Network',
        dataIndex: 'network',
        key: 'network',
        sorter: (a, b) => a.network.length - b.network.length,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2">
              <i className="icmn-eye mr-1" title="View on etherscan.io" width={16} />
            </a>
            <a href="javascript: void(0);" className="mr-2">
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
        <div className="card-header">
          <div className="utils__title">
            <strong>Token Contracts List</strong>
            <button className="btn btn-primary pull-right">
              <Link to="/create" style={{ color: '#FFF' }}>
                Create Token Contract
              </Link>
            </button>
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
    )
  }
}

export default TokenList
