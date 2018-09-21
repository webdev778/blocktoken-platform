import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import './style.scss'
import * as UserAPI from 'lib/api/users';

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
}

class UsersList extends React.Component {
  state = {
    tableData: null,
    data: null,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
  }

  async componentDidMount() {
    try {
      const result = await UserAPI.getUserList()

      if (result.data)
      {
        this.setState({
          tableData: result.data.users,
          data: result.data.users,
        });

      }
    }catch(e){
      console.log(e)
    }
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.email.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            email: (
              <span>
                {record.email
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
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

  render() {
    let { pager, data } = this.state

    const columns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Fullname',
        dataIndex: 'fullname',
        key: 'fullname',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: 'Website URL',
        dataIndex: 'website',
        key: 'website',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => (record.auth_status === 9 ? 'Admin' : 'User'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);">
              <i className="icmn-cross mr-1" />
            </a>
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Users List</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            rowKey={record => record.email}
            dataSource={data}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

export default UsersList;
