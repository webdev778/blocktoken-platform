import React from 'react'

import Avatar from 'components/CleanComponents/Avatar'

const NotFoundPage = () =>
  <div className="login login--fullscreen">
    <div className="login__header">
      <div className="row">
        <div className="col-lg-8">
          <div className="login__header__logo">
            <a href="javascript: void(0);">
              <img src="https://dev.blocktoken.ai/wp-content/uploads/thegem-logos/logo_5ed388aa7c69b61be6aa09babaeee6a4_1x.png" alt="logo"/>
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrYCayUrFQbZOOIrUPsf7eYbbC_dMa9Qo4CMcM528xfZHblybk" alt="work_progress"/>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

export default NotFoundPage
