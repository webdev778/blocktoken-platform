import React from 'react'
import SignupForm from './SignupForm'
import './style.scss'

class Signup extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-login__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/login/logo.png" alt="BlockToken" />
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
                  <strong>WELCOME TO BLOCKTOKEN</strong>
                </h1>
                <h2 className="text-white">
                  BlockToken is a next generation token issuance platform for the launching and
                  marketing of your initial token offering.
                </h2>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  <SignupForm />
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
                </div>
              </div>
            </div>
          </div>
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

export default Signup
