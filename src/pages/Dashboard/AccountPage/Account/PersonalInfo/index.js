import React from 'react'
import { Form, Button, Card, notification, Input, Row, Col } from 'antd'
import * as UserAPI from 'lib/api/users';

const FormItem = Form.Item

@Form.create()
class PersonalInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          fullname: '',
          address: '',
          company: '',
          website: '',
        }
    }
    
    async componentDidMount() {
        try {
            const result = await UserAPI.getUser()
            if (result.data)
            {
            this.setState({
                fullname: result.data.user.fullname,
                address: result.data.user.address,
                company: result.data.user.company,
                website: result.data.user.website,
            });

            }
        }catch(e){
        }
    }

    savePersonal = async () => {
        try {
          let fname = '', addr = '', co = '', web = ''
          this.props.form.validateFields((err, values) => {
            fname = values.fullname;  addr = values.address; co = values.company; web = values.website;
          })
          const result = await UserAPI.setUser({fullname:fname, address:addr, company:co, website:web})
          if (result.data)
          {
            this.setState({
              fullname: result.data.fullname,
              address: result.data.address,
              company: result.data.company,
              website: result.data.website,
            });
    
            notification.open({
              type: 'success',
              message: 'Personal Information',
              description: 'Updated successfully!'
            })
    
          }
        }catch(e){
          notification.open({
            type: 'error',
            message: 'Personal Information',
            description: 'Updated failure!'
          })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const {fullname, address, company, website} = this.state;

        return (
            <Form className="form">
                <FormItem label="Fullname">
                {getFieldDecorator('fullname', {
                    initialValue: fullname || '',
                    rules: [{ required: true, message: 'Please input your fullname!' }],
                })(<Input />)}
                </FormItem>
                <FormItem label="Address">
                {getFieldDecorator('address', {
                    initialValue: address || '',
                    rules: [{ required: true, message: 'Please input your address!' }],
                })(<Input />)}
                </FormItem>
                <FormItem label="Company">
                {getFieldDecorator('company', {
                    initialValue: company || '',
                    rules: [{ required: true, message: 'Please input your company!' }],
                })(<Input />)}
                </FormItem>
                <FormItem label="Website">
                {getFieldDecorator('website', {
                    initialValue: website || '',
                    rules: [{ required: true, message: 'Please input your website!' }],
                })(<Input />)}
                </FormItem>
                <Button type="primary" className="mr-3 pull-right" onClick={this.savePersonal}>
                Save Changes
                </Button>
            </Form>
        )
    }    
}

export default PersonalInfo