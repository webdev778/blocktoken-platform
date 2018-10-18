import React from 'react'
import { Button } from 'antd'

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header" style={{ color: "#0B5393" }}>
          <h2><strong>Launch a New Token Crowdfunding Campaign</strong></h2>
        </div>
        <div className="card-body" style={{marginLeft:'20px'}}>
          <h4>Launching a token based crowdfunding project can be a complex experience - BlockToken helps you</h4>
          <h4>setup, manage and ultimately create an active and liquid market for your tokens.</h4><br />
          <h4>Tell us about your project if you are looking to:</h4>
          <h4>
            <ul>
              <li>Launch a utility token</li>
              <li>Raise funds through a security token (STO)</li>
              <li>Tokenise assets</li>
              <li>Develop a syndicate or managed pool</li>
              <li>Create your own managed fund using tokens</li>
            </ul>
          </h4>
          <br />

          <Button className="btn btn-md btn-danger" type="primary" size='large'>Launch a Project</Button>
        </div>
      </div>
    )
  }
}

export default CreateProject
