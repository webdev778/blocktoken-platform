import React from 'react'
import { Button } from 'antd'

class AirDrop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header" style={{color:"#0B5393"}}>
            <h2><strong>Join the BlockToken AirDrop</strong></h2>
          </div>
          <div className="card-body">
            <h4>Join the BlockToken Airdrop and receive free tokens. See more details at
            <a className="utils__link--blue utils__link--underlined" href={`https://blocktoken.ai/airdrop`}>
                <span>&nbsp;https://blocktoken.ai/airdrop.</span>
              </a>
            </h4><br />
            <Button className="btn btn-md btn-danger" type="primary" size='large'>BlockToken AirDrop</Button>
          </div>
          <div className="card-header" style={{color:"#0B5393"}}>
            <h2><strong>Launch an AirDrop</strong></h2>
          </div>
          <div className="card-body">
            <h4>Create interest and momentum early in your project through an Airdrop campaign. Complete the form below to get started.</h4><br />
            <Button className="btn btn-md btn-danger" type="primary" size='large'>Launch an AirDrop</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AirDrop
