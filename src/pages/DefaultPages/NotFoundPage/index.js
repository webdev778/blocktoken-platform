import React from 'react'

import Avatar from 'components/CleanComponents/Avatar'

const NotFoundPage = () =>
  <div className="login login--fullscreen">
    <div className="login__header">
      <div className="row">
        <div className="col-lg-8">
          <div className="login__header__logo">
            <a href="javascript: void(0);">
              <img src="resources/images/login/logo.png"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="login__block mb-5">
      <div className="row">
        <div className="col-xl-12">
          <div className="login__block__inner">
            <div className="login__block__form">
              <form id="form-validation" name="form-validation" method="POST">
                <div className="text-center mb-3">
                  <Avatar src="resources/images/avatars/5.jpg" border="true" size="90" />
                </div>
                <h2 style={{ color: '#514d6a' }} className="text-center">
                  <i className="icmn-lock" />
                  <strong>Work In Progress</strong>
                </h2>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

export default NotFoundPage
