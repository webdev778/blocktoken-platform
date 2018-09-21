import React from 'react'
import { Table, Icon, Input, Tag } from 'antd'
import './style.scss'
import Details from './Details'
import * as UserAPI from 'lib/api/users';

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
}

class IdentityList extends React.Component {
  state = {
    tableData: null,
    data: null,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    viewDetails: false,
    address: null,
    status: 10,
    user_id: null,
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

  handleOnClickDetails = (status, id) => {
    this.setState({status:status});
    this.setState({user_id:id})
    if (Number(status) !== 0)
      this.setState({viewDetails: !this.state.viewDetails});
  }

  handleCloseDetail = () => {
    this.setState({ viewDetails: !this.state.viewDetails })
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => (record.auth_status === 9 ? 'Admin' : 'User'),
      },
      {
        title: 'Authorization',
        dataIndex: 'auth_status',
        key: 'auth_status',
        render: (text, record) => (
          (record.auth_status !== 9) && 
            (record.kyc_status === 0) ? 
            <Tag color="#f50">Submit</Tag> : 
            (
              (record.kyc_status === 1) ?
              <Tag color="#108ee9">Review</Tag> : 
              (
                (record.kyc_status === 2) ?
                <Tag color="#87d068">Success</Tag> : null
              )
            )            
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" className="mr-2" onClick={() => this.handleOnClickDetails(record.auth_status, record._id)}>
              <i className="icmn-user-check mr-1" />
            </a>
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        {
          (Number(this.state.status) !== 0 && this.state.viewDetails) ? 
          <Details user_id={this.state.user_id} onClose = { this.handleCloseDetail }/> : null
        }
        {
          !this.state.viewDetails &&
          <div>
            <div className="card-header">
              <div className="utils__title">
                <strong>Identity List</strong>
              </div>
            </div>
            <div className="card-body">
              <Table
                columns={columns}
                rowKey={record => record.email}
                dataSource={data}
                pagination={pager}
                onChange={this.handleTableChange}
                bordered={true}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default IdentityList;
