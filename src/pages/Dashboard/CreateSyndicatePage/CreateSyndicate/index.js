import React from 'react'
import { Button } from 'antd'

class CreateSyndicate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header" style={{ color: "#0B5393" }}>
          <h2><strong>Launch a New Syndicate</strong></h2>
        </div>
        <div className="card-body" style={{marginLeft:'20px'}}>
          <h4>Launch a create a smart contract powered syndicate. Features include:</h4><br />
          <h4>
            <ul>
              <li>EOS or ERC20 token smart contracts</li>
              <li>Set the syndicate purpose and objectives</li>
              <li>Set the minimum terms for syndicate members</li>
            </ul>
          </h4>
          <br />
          <h4>Syndicates cost US$3000 to setup plus 5% of all funds subscribed.</h4><br />
          <Button className="btn btn-md btn-danger" type="primary" size='large'>Create a Syndicate</Button>
        </div>
      </div>
    )
  }
}

export default CreateSyndicate
