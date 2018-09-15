import React from 'react'
import { Menu } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import './style.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className="topbar">
        {/* <Menu
          mode="horizontal"
          style={{ lineHeight: '63px', background: '#1b114C', float: 'right'}}
        >
          <Menu.Item key="1" className="ant-menu-polaris">TOKEN SALE</Menu.Item>
          <Menu.Item key="2" className="ant-menu-polaris">PRODUCTS</Menu.Item>
          <Menu.Item key="3" className="ant-menu-polaris">FEATURES</Menu.Item>
          <Menu.Item key="4" className="ant-menu-polaris">PLATFORM</Menu.Item>
          <Menu.Item key="5" className="ant-menu-polaris">WHITEPAPER</Menu.Item>
          <Menu.Item key="6" className="ant-menu-polaris">ABOUT</Menu.Item>
          <Menu.Item key="7" className="ant-menu-polaris">GET STARTED</Menu.Item>

        </Menu> */}
        <HomeMenu style={{float:'right'}} />
        <BitcoinPrice style={{float:'right'}} /> 
        <div className="topbar__right">
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
