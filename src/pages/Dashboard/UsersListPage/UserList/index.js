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
        title: 'DisplayName',
        dataIndex: 'displayName',
        key: 'displayName',
        sorter: (a, b) => a.displayName.localeCompare(b.displayName),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            <Link to="/profile">{text}</Link>
          </a>
        ),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search email"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          )
        },
      },
      {
        title: 'Fullname',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address.localeCompare(b.address),
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company),
      },
      {
        title: 'Website URL',
        dataIndex: 'website',
        key: 'website',
        sorter: (a, b) => a.website.localeCompare(b.website),
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2">
              <i className="icmn-pencil mr-1" /> <Link to="/profile"> View </Link>
            </a>
            <a href="javascript: void(0);">
              <i className="icmn-cross mr-1" /> Remove
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
