import React from 'react'
import './style.scss'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import DrawerMenu from 'rc-drawer'

let mobileQuery = 'only screen and (max-width: 1100px)'
let mobileMenu

enquireScreen((b) => {
    mobileMenu = b
}, mobileQuery)

const navigation = (<nav className="header__nav">
    <ul className="header__navList">
        <li className="header__menuItem">
            <a href="https://blocktoken.ai/token-creator/" className="header__menuLink">Token
                Sale</a>
            <ul className="header__subMenu">
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/airdrop/"
                        className="header__subMenuLink">AirDrop</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/bounty/"
                        className="header__subMenuLink">Bounty Program</a>
                </li>
            </ul>
        </li>
        <li className="header__menuItem">
            <a href="https://blocktoken.ai/products/"
                className="header__menuLink">Products</a>
            <ul className="header__subMenu">
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/syndicates/"
                        className="header__subMenuLink">Syndicates</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/ico-marketing/"
                        className="header__subMenuLink">ICO Marketing</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/blockchain-development/"
                        className="header__subMenuLink">Blockchain Development</a>
                </li>
            </ul>
        </li>
        <li className="header__menuItem">
            <a href="https://blocktoken.ai/features/"
                className="header__menuLink">Features</a>
        </li>
        <li className="header__menuItem">
            <a href="https://blocktoken.ai/BlockToken_Whitepaper.pdf"
                className="header__menuLink">Whitepaper</a>
        </li>
        <li className="header__menuItem">
            <a href="https://blocktoken.ai/products/"
                className="header__menuLink">About</a>
            <ul className="header__subMenu">
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/projects/"
                        className="header__subMenuLink">Projects</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/blog/"
                        className="header__subMenuLink">Blogs</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/terms/"
                        className="header__subMenuLink">Terms</a>
                </li>
                <li className="header__subMenuItem">
                    <a href="https://blocktoken.ai/privacy/"
                        className="header__subMenuLink">Privacy</a>
                </li>
            </ul>
        </li>
        <li className="header__menuItem">
            <a className="header__menuLink header__menuLink--button header__menuLink--buttonFilled"
                href="javascript: void(0);">
                Buy <span className="hidden-xl">BLT</span> Tokens
            </a>
        </li>
        <li className="header__menuItem">
            <a className="header__menuLink header__menuLink--button"
                href="https://blocktoken.ai/airdrop" target="_blank" rel="noopener noreferrer" >
                Get Free <span className="hidden-xl">BLT</span> Tokens
            </a>
        </li>
    </ul>
</nav>)


class BTtopBar extends React.Component {
    state = {
        mobileMenu,
    }

    componentDidMount() {
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
                mobileMenu: mobile,
            })
        }, mobileQuery)
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler)
    }

    render() {
        let {
            mobileMenu,
        } = this.state
        return (
            <div className="BTtopBar">
                <div className="header">
                    <div className="utils__content pt-2 pb-2">
                        <div className="header__content">
                            <a href="https://blocktoken.ai/" className="header__logoLink">
                                <img className="header__logoImg"
                                    src="https://blocktoken.ai/wp-content/uploads/thegem-logos/logo_5ed388aa7c69b61be6aa09babaeee6a4_1x.png" alt="BlockToken ICO Platform"
                                />
                            </a>
                            {mobileMenu ?
                                <DrawerMenu
                                    getContainer={null}
                                    level={null}
                                    placement="right"
                                    wrapperClassName="BTtopBar"
                                >
                                    {navigation}
                                </DrawerMenu>
                                :
                                navigation}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BTtopBar

