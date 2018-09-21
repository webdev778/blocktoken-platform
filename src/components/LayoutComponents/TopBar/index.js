import React from 'react'
import ProfileMenu from './ProfileMenu'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import './style.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className="topbar">
        <HomeMenu style={{float:'left'}} />
        <BitcoinPrice style={{float:'left'}} /> 
        <div className="topbar__right">
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
