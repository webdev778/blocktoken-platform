import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from 'ducks/app'
import { Menu, Dropdown, Avatar } from 'antd'

const mapDispatchToProps = dispatch => ({
  logout: event => {
    event.preventDefault()
    dispatch(logout())
  },
})

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ProfileMenu extends React.Component {
  state = {
  }

  render() {
    const { count } = this.state
    const { userState, logout } = this.props
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>Hello, {userState.name}</strong>
            <div>
              <strong>Role:</strong> {userState.role}
            </div>
            <div className="rfq__widget__system-status__item">
              <strong>Email:</strong> {userState.email}
              <br />
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);">
            <i className="topbar__dropdownMenuIcon icmn-user" />{' '}
            <Link to="/account">Edit Profile</Link>
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={logout}>
            <i className="topbar__dropdownMenuIcon icmn-exit" /> Logout
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement="bottomRight"
        >
          <a className="ant-dropdown-link" href="/">
            <Avatar className="topbar__avatar" shape="square" size="large" icon="user" />
          </a>
        </Dropdown>
      </div>
    )
  }
}

export default ProfileMenu
