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
                            <img src="data:image/jpeg;base64,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" />
                        </div>
                        <div className="col-lg-6">
                            <img src="data:image/jpeg;base64,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" />
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
