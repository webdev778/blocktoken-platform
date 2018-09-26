import React from 'react'

import { tokenTableData, syndicateTableData } from './data.json'
import { Table } from 'antd'

class ViewProjects extends React.Component {
  render() {
    const tokenColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Market Cap',
        dataIndex: 'marketcap',
        key: 'marketcap'
      },
      {
        title: 'Change(24h)',
        dataIndex: 'change(24h)',
        key: 'change(24h)'
      },
    ]
    const syndicateColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Market Cap',
        dataIndex: 'marketcap',
        key: 'marketcap'
      },
      {
        title: 'Change(24h)',
        dataIndex: 'change(24h)',
        key: 'change(24h)'
      },
    ]
    return (
      <div>
        <div className="mb-4">
          <span className="text-uppercase font-size-24">View Active Projects</span>
          <div>
            <span>The list below shows all active tokens, syndicates and projects</span>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Tokens</div>
              </div>
              <div className="card-body">
                <Table
                  columns={tokenColumns}
                  dataSource={tokenTableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Syndicates</div>
              </div>
              <div className="card-body">
                <Table
                  columns={syndicateColumns}
                  dataSource={syndicateTableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewProjects
