import React from 'react'
import './style.scss'

class BTfooter extends React.Component {
    render() {
        return (
            <div className="BTfooter">
                <footer className="footer">
                    <div className="footer__partitions">
                        <div className="footer__partition footer__partition--logoTitle">
                            <a href="https://dev.blocktoken.ai/" className="footer__logoLink">
                                <img
                                    src="https://dev.blocktoken.ai/wp-content/uploads/thegem-logos/logo_5ed388aa7c69b61be6aa09babaeee6a4_1x.png"
                                    alt="logo"/>
                            </a>
                            <div className="footer__partitionContent">
                                <p>
                                    BlockToken is a platform for the Distribution & Marketing of ICOs and Tokens.
                                </p>
                                <p>
                                    Build and launch a token based crowdfunding campaign all in one place using the
                                    World’s fastest and most scalable blockchain platform EOS.
                                </p>
                            </div>
                        </div>
                        <div className="footer__partition">
                            <div className="footer__partitionTitle">
                                <h4>
                                    Platform
                                </h4>
                            </div>
                            <ul className="footer__navList">
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/products" className="footer__navLink">
                                        Products Overview
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/features" className="footer__navLink">
                                        Key Features
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dash.blocktoken.ai/" className="footer__navLink">
                                        Platform
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/token-generator"
                                       className="footer__navLink">
                                        Create a Token
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/ico-advisory"
                                       className="footer__navLink">
                                        ICO Advisory
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/syndicates" className="footer__navLink">
                                        Syndicate Smart Contracts
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__partition">
                            <div className="footer__partitionTitle">
                                <h4>
                                    About
                                </h4>
                            </div>

                            <ul className="footer__navList">
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/token" className="footer__navLink">
                                        Token Sale
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/terms" className="footer__navLink">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/cookies-policy" className="footer__navLink">
                                        Cookie Policy
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/risk-warnings" className="footer__navLink">
                                        Risk Warnings
                                    </a>
                                </li>
                                <li className="footer__navItem">
                                    <a href="https://dev.blocktoken.ai/privacy" className="footer__navLink">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default BTfooter
