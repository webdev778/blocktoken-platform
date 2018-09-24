import React from 'react'
import ConfirmForm from './ConfirmForm'
import './style.scss'

const particlesJS = window.particlesJS

class Confirm extends React.Component {
  state = {
    backgroundImage: 'url(resources/images/login/main-bg.jpg)',
    fullSize: false,
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    particlesJS.load('particles-js', '/resources/particles.json');  
    particlesJS.load('particles-js-1', '/resources/particles1.json');  
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    const { backgroundImage, fullSize } = this.state

    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-login__header__logo">
                <a href="javascript: void(0);">
                  <img
                    src="https://dev.blocktoken.ai/wp-content/uploads/thegem-logos/logo_5ed388aa7c69b61be6aa09babaeee6a4_1x.png"
                    alt="BlockToken"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__promo text-black text-center">
                <h1 className="mb-3 text-white">
                  <strong>BLOCKTOKEN ICO DASHBOARD</strong>
                </h1>
                <h2 className="text-white">
                  BlockToken is a next generation token issuance platform for the launching and
                  marketing of your initial token offering.
                </h2>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  <ConfirmForm />
                </div>
                <div className="main-login__block__sidebar">
                  <h4 className="main-login__block__sidebar__title text-white">
                    <strong>BlockToken Token Offering Pre Sale Begins</strong>
                    <br />
                    <span>August 2018</span>
                  </h4>
                  <div className="main-login__block__sidebar__item">
                    BlockToken is a platform for the Distribution & Marketing of ICOs and Tokens.
                  </div>
                  <div className="main-login__block__sidebar__place">
                    <i className="icmn-location mr-3" />
                    Sydney, Australia
                  </div>
                  <div id="particles-js-1" className="particles-container"></div>                  
                </div>
              </div>
            </div>
          </div>
          <div id="particles-js" className="particles-container particles-js"></div>
        </div>
        <div className="main-login__footer text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li className="active list-inline-item">
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Confidential Information</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Support</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Confirm
