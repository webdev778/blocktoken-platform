import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import tableData from './data.json'
import axios from 'axios';
import './style.scss'

import EyeIcon from '../../../../assets/images/eye.png';
import DetailIcon from '../../../../assets/images/detail.png';
import ICOIcon from '../../../../assets/images/ico.png';
import WhitelistIcon from '../../../../assets/images/whitelist.png';

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
}

class CrowdsaleList extends React.Component {
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
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ico.sol');
      document.body.appendChild(link);
      link.click();
    });
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
        title: 'Minimum Cap',
        dataIndex: 'min_cap',
        key: 'min_cap',
        sorter: (a, b) => a.min_cap.length - b.min_cap.length,
      },
      {
        title: 'Maximum Cap',
        dataIndex: 'max_cap',
        key: 'max_cap',
        sorter: (a, b) => a.max_cap.length - b.max_cap.length,
      },
      {
        title: 'Token Price',
        dataIndex: 'token_price',
        key: 'token_price',
        sorter: (a, b) => a.token_price.length - b.token_price.length,
      },
      {
        title: 'Duration Days',
        dataIndex: 'duration',
        key: 'duration',
        sorter: (a, b) => a.duration.length - b.duration.length,
      },
      {
        title: 'Network',
        dataIndex: 'network',
        key: 'network',
        sorter: (a, b) => a.network.length - b.network.length,
      },
      {
        title: 'Whitelisting',
        dataIndex: 'whitelisting',
        key: 'whitelisting',
        sorter: (a, b) => a.whitelisting.length - b.whitelisting.length,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2">
              <img src={EyeIcon} width={16} />
            </a>
            <a href="javascript: void(0);" className="mr-2" >
              <img src={DetailIcon} width={16} />
            </a>
            <a href="javascript: void(0);" className="mr-2" >
              <img src={ICOIcon} width={16} />
            </a>
            <a href="javascript: void(0);" className="mr-2">
              <img src={WhitelistIcon} width={16} />
            </a>
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Crowdsale Contracts List</strong>
            <button className="btn btn-primary pull-right" >
              <Link to='crowdsale/create' style={{ color: '#FFF' }}>
                Create Crowdsale Contract
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

export default CrowdsaleList
