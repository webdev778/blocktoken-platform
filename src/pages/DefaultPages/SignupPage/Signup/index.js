import React from 'react'
import SignupForm from './SignupForm'
import './style.scss'

const particlesJS = window.particlesJS

class Signup extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    particlesJS.load('particles-js', '/resources/particles.json');
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-signup main-signup--fullscreen">
        <div className="main-signup__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-signup__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/login/logo.png" alt="BlockToken" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-signup__block pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-signup__block__promo text-black text-center">
                <h1 className="mb-3 text-white">
                  <strong>WELCOME TO BLOCKTOKEN</strong>
                </h1>
                <h2 className="text-white">
                  BlockToken is a next generation token issuance platform for the launching and
                  marketing of your initial token offering.
                </h2>
              </div>
              <div className="main-signup__block__inner">
                <div className="main-signup__block__form">
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
          <div id="particles-js" className="particles-container particles-js"></div>
        </div>
        <div className="main-signup__footer text-center">
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
