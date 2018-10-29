import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import { Table, Alert } from 'antd'

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
)
class DashboardUser extends React.Component {
  state = {
    tableData: null,
  }

  render() {
    const tableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Office',
        dataIndex: 'office',
        key: 'office',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        sorter: (a, b) => a.salary - b.salary,
      },
    ]
    const { userState } = this.props;
    return (
      <div>
        {
          (Number(userState.kyc_status) === 0) &&
          <Alert
            message="Verify your profile to participate in token offerings."
            type="warning"
            showIcon
          />
        }
        {
          (Number(userState.kyc_status) === 1) &&
          <Alert
            message="Review in your verification."
            type="info"
            showIcon
          />
        }
        {
          (Number(userState.kyc_status) === 2) &&
          <Alert
            message="Verification Complete."
            type="success"
            showIcon
          />
        }

        <div className="utils__title utils__title--flat mb-3 mt-4">
          <span className="text-uppercase font-size-16 text-center"><h1>Get Started</h1></span>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <Link to='/identity'>
              <PaymentCard
                icon={'lnr lnr-license'}
                name={'Complete Verification'}
              />
            </Link>
          </div>
          <div className="col-lg-4">
            <Link to='/buytoken'>
              <PaymentCard
                icon={'lnr lnr-cart'}
                name={'Buy Tokens'}
              />
            </Link>
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-link'}
              name={'Join a Syndicate'}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <Link to='/token-wizard/token'>
              <PaymentCard
                icon={'lnr lnr-eye'}
                name={'Launch a Token & Crowdsale Smart Contract'}
              />
            </Link>
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-pencil'}
              name={'Create a Syndicate'}
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-envelope'}
              name={'Submit a Project Profile'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardUser
