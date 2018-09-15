import React from 'react'
import { Form, Icon, Input, Button, Select, Card, Table } from 'antd'
import * as UserAPI from 'lib/api/users';
import axios from 'axios'

const FormItem = Form.Item
const Option = Select.Option

class Details extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        id_info: {},
        bank_info: {},
    }
  }

  async componentDidMount() {
    const { user_id } = this.props
    try{

        const res = await axios.get('/api/v1.0/identity/getid/' + user_id)
        const { ident: id_info } = res.data
        if(id_info) {
            this.setState({ id_info });        
        }
    }catch ( e ){
        console.log( e )
    }

    try{

        const res = await axios.get('/api/v1.0/identity/getbank/' + user_id)
        const { bank: bank_info } = res.data
        if(bank_info) {
            this.setState({ bank_info });        
        }
    }catch ( e ){
        console.log( e )
    }
  }

  handleApprove = async() => {
      await UserAPI.setApprove();
  }

  render() {
    const { form } = this.props
    const { id_info, bank_info } = this.state

    return (
      <div className="card">
        <span>
          <a href="javascript: void(0);" onClick={ this.props.onClose } className="mr-2 pull-right">
            <i className="icmn-cross" title="Close" width={16} />
          </a>
        </span>
        <div className="card-header">
          <div className="font-size-30 text-center" >
            <strong>Proof of Identity & Address</strong>
          </div>
        </div>
        <div className="card-body">
            <div className="col">
                <div className="row-lg-6 text-center">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6">
                            <img src="" />
                        </div>
                        <div className="col-lg-6">
                            <img src="" />
                        </div>
                    </div>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">First Name: {id_info.first_name}</label>
                        </div>
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">Last Name: {id_info.last_name}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">Gender: {id_info.gender}</label>
                        </div>
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">Birthday: {id_info.birthday}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">ID Issuing Country: {id_info.id_issuing_country}</label>
                        </div>
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">ID Type: {id_info.id_type}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">ID Number: {id_info.id_number}</label>
                        </div>
                        <div className="col-lg-6 font-size-18 text-info">
                            <label className="form-label">ID Expires: {id_info.id_expires}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>

                <div className="row-lg-6 text-center">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-12">
                            <img src="https://www.handsonbanking.org/financial-education/wp-content/uploads/2012/10/bank_statement.png" />
                        </div>
                    </div>
                    </FormItem>
                </div>

                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-6 font-size-18 text-success">
                            <label className="form-label">Address: {bank_info.address}</label>
                        </div>
                        <div className="col-lg-6 font-size-18 text-success">
                            <label className="form-label">City: {bank_info.city}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>

                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-3 font-size-18 text-success">
                            <label className="form-label">State: {bank_info.state}</label>
                        </div>
                        <div className="col-lg-5 font-size-18 text-success">
                            <label className="form-label">Country: {bank_info.country}</label>
                        </div>
                        <div className="col-lg-4 font-size-18 text-success">
                            <label className="form-label">Postal Code: {bank_info.postcode}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>

                <div className="row-lg-6">
                    <FormItem>
                    <div className="row">
                        <div className="col-lg-4 font-size-18 text-success">
                        <label className="form-label">Institution Name: {bank_info.institution_name}</label>
                        </div>
                        <div className="col-lg-4 font-size-18 text-success">
                        <label className="form-label">Document Type: {bank_info.doc_type}</label>
                        </div>
                        <div className="col-lg-4 font-size-18 text-success">
                        <label className="form-label">Issued Date: {bank_info.issued_date}</label>
                        </div>
                    </div>
                    </FormItem>
                </div>
            </div>
        </div>
        <Button type="primary" loading={this.state.loading} onClick={this.handleApprove}>
                Approve
            </Button>
      </div>
    )
  }
}

Details.propTypes={}

export default Details
