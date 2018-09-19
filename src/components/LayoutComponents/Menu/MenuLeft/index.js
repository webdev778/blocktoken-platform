import React from 'react'
import { connect } from 'react-redux'
import { Menu, Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { reduce } from 'lodash'
import { setLayoutState } from 'ducks/app'
import { Scrollbars } from 'react-custom-scrollbars'
import { default as menuUser } from './menuUser'
import menuAdmin from './menuAdmin'
import './style.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const Divider = Menu.Divider

const mapStateToProps = ({ app, routing }, props) => {
  const { layoutState } = app
  return {
    pathname: routing.location.pathname,
    collapsed: layoutState.menuCollapsed,
    theme: layoutState.themeLight ? 'light' : 'dark',
    settingsOpened: layoutState.settingsOpened,
  }
}

@connect(mapStateToProps)
@withRouter
class MenuLeft extends React.Component {
  state = {
    pathname: this.props.pathname,
    collapsed: this.props.collapsed,
    theme: this.props.theme,
    selectedKeys: '',
    openKeys: [''],
    settingsOpened: this.props.settingsOpened,
  }

  handleClick = e => {
    const { dispatch, isMobile } = this.props
    if (isMobile) {
      // collapse menu on isMobile state
      dispatch(setLayoutState({ menuMobileOpened: false }))
    }
    if (e.key === 'settings') {
      // prevent click and toggle settings block on theme settings link
      dispatch(setLayoutState({ settingsOpened: !this.state.settingsOpened }))
      return
    }
    // set current selected keys
    this.setState({
      selectedKeys: e.key,
    })
  }

  onOpenChange = openKeys => {
    this.setState({
      openKeys: openKeys,
    })
  }

  getPath(data, id, parents = []) {
    const { selectedKeys } = this.state
    let items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        } else if (entry.url === id && selectedKeys === '') {
          return [entry].concat(parents)
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents)
        } else if (entry.children) {
          let nested = this.getPath(entry.children, id, [entry].concat(parents))
          return nested ? nested : result
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : false
  }

  getActiveMenuItem = (props, items) => {
    const { selectedKeys, pathname } = this.state
    let { collapsed } = props
    let [activeMenuItem, ...path] = this.getPath(items, !selectedKeys ? pathname : selectedKeys)

    if (collapsed) {
      path = ['']
    }
    if (pathname === '/token-wizard/crowdsale' || pathname === '/token-wizard/token')
    {
      if (path.length == 0)
      {
        path.push(items[5]);
        activeMenuItem = path[0].children[0];
      }
    }

    this.setState({
      selectedKeys: activeMenuItem ? activeMenuItem.key : '',
      openKeys: activeMenuItem ? path.map(entry => entry.key) : [],
      collapsed,
    })
  }

  generateMenuPartitions(items) {
    return items.map(menuItem => {
      if (menuItem.children) {
        let subMenuTitle = (
          <span className="menuLeft__title-wrap" key={menuItem.key}>
            <span className="menuLeft__item-title">{menuItem.title}</span>
            {menuItem.icon && <span className={menuItem.icon + ' menuLeft__icon'} />}
          </span>
        )
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {this.generateMenuPartitions(menuItem.children)}
          </SubMenu>
        )
      }
      return this.generateMenuItem(menuItem)
    })
  }

  generateMenuItem(item) {
    const { key, title, url, icon, disabled } = item
    const { dispatch } = this.props
    return item.divider ? (
      <Divider key={Math.random()} />
    ) : item.url ? (
      <Menu.Item key={key} disabled={disabled}>
        <Link
          to={url}
          onClick={
            this.props.isMobile
              ? () => {
                  dispatch(setLayoutState({ menuCollapsed: false }))
                }
              : undefined
          }
        >
          <span className="menuLeft__item-title">{title}</span>
          {icon && <span className={icon + ' menuLeft__icon'} />}
        </Link>
      </Menu.Item>
    ) : (
      <Menu.Item key={key} disabled={disabled}>
        <span className="menuLeft__item-title">{title}</span>
        {icon && <span className={icon + ' menuLeft__icon'} />}
      </Menu.Item>
    )
  }

  onCollapse = (value, type) => {
    const { dispatch } = this.props
    const { collapsed } = this.state
    if (type === 'responsive' && collapsed) {
      return
    }
    dispatch(setLayoutState({ menuCollapsed: !collapsed }))
  }

  componentDidMount() {
    var userRole = window.localStorage.getItem('app.Role');
    if (userRole === 'user')
      this.getActiveMenuItem(this.props, menuUser)
    else if (userRole === 'administrator')
      this.getActiveMenuItem(this.props, menuAdmin)
  }

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        selectedKeys: '',
        pathname: newProps.pathname,
        theme: newProps.theme,
        settingsOpened: newProps.settingsOpened,
      },
      () => {
        if (!newProps.isMobile) {
          var userRole = window.localStorage.getItem('app.Role');
          if (userRole === 'user')
            this.getActiveMenuItem(newProps, menuUser)
          else if (userRole === 'administrator')
            this.getActiveMenuItem(newProps, menuAdmin)
        }
      },
    )
  }

  render() {
    const { collapsed, selectedKeys, openKeys, theme } = this.state
    const { isMobile } = this.props
    const menuUserItems = this.generateMenuPartitions(menuUser)
    const menuAdminItems = this.generateMenuPartitions(menuAdmin)
    const paramsMobile = {
      width: 256,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
    }
    const paramsDesktop = {
      width: 256,
      collapsible: true,
      collapsed: collapsed,
      onCollapse: this.onCollapse,
      breakpoint: 'lg',
    }
    const params = isMobile ? paramsMobile : paramsDesktop
    const userRole = window.localStorage.getItem('app.Role')
    return (
      <Sider {...params} className="menuLeft">
        <Scrollbars
          autoHide
          style={{ height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 112px)' }}
        >
          <Menu
            theme={theme}
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            className="menuLeft__navigation"
          >
            <Menu.Item key={'settings'}>
              <span className="menuLeft__item-title">Theme Settings</span>
              <span
                className={'icmn icmn-cog menuLeft__icon utils__spin-delayed--pseudo-selector'}
              />
            </Menu.Item>
            {(userRole === 'user') && menuUserItems}
            {(userRole === 'administrator') && menuAdminItems}
          </Menu>
        </Scrollbars>
      </Sider>
    )
  }
}

export { MenuLeft, menuUser, menuAdmin }
