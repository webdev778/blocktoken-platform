import React from 'react'
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Upload, Button, Icon, Card, notification, message } from 'antd'
import bankverify from '../../../../../assets/images/bank_verify.png';
import * as UserAPI from 'lib/api/users';

const countryData = [ 
    'Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'S Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'RWANDA', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'
];

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class POA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          issued_date: '',
          fileList: []
        };
    }

    onIssuedDateChange = (date, dateString) => {
        this.setState({issued_date: dateString})
    }

    handleChange = ({ fileList }) => {
        this.setState({fileList});
    }

    kyc_done = async () => {
        try {
            
            const formData = new FormData();
            console.log(this.state.fileList[0]);
            formData.append('file', this.state.fileList[0].originFileObj);
            
            this.props.form.validateFields((err, values) => {
                if (err)
                    return;

                formData.append('address', values.address);
                formData.append('city', values.city);
                formData.append('state', values.state);
                formData.append('postcode', values.postcode);
                formData.append('country', values.country);
                formData.append('institution_name', values.institution_name);
                formData.append('doc_type', values.doc_type);
                formData.append('issued_date', this.state.issued_date);
            })

            const result = await UserAPI.savePoA(formData, {headers: {'Content-Type': 'multipart/form-data'}})
            console.log(result);
            if (result.data)
            {
                await UserAPI.setReview();
                notification.open({
                    type: 'success',
                    message: 'Proof of Address',
                    description: 'Submitted successfully!'
                })
            }
            this.props.onValueChange('selectMode', 0)
        }catch(e){
          notification.open({
            type: 'error',
            message: 'Proof of Address',
            description: 'Submitted failure!'
          })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const countryOptions = countryData.map(country => <Option key={country}>{country}</Option>);
        
        return (
            <div>
                <div className="card-header">
                    <strong>Customized content</strong>
                </div>
                <div className="card-body">
                    <FormItem label="Address" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('address', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your address!' }],
                        })(<Input style={{ width: 300 }} />)}
                    </FormItem>
                    <FormItem label="City" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('city', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your city!' }],
                        })(<Input style={{ width: 300 }} />)}
                    </FormItem>
                    <FormItem label="State" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('state', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your state!' }],
                        })(<Input style={{ width: 300 }}/>)}
                    </FormItem>
                    <FormItem label="Postal Code" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('postcode', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your postal code!' }],
                        })(<Input style={{ width: 300 }}/>)}    
                    </FormItem>
                    <FormItem label="Country" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                        {getFieldDecorator('country', {
                            rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                        <Select placeholder="Select your country" style={{ width: 300 }}>
                            <Option value="">Select your country</Option>
                            {countryOptions}
                        </Select>
                        )}
                    </FormItem>
                </div>
                <div className="card-header">
                    <strong>Upload a Scan of Your ID</strong>
                </div>
                
                <div className="card-body">
                    <Upload
                        action = '//jsonplaceholder.typicode.com/posts/'
                        listType="picture"
                        onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-lg-4">
                                <a href="javascript: void(0);">
                                    <img src={bankverify} width="200"/>
                                </a>
                            </div>
                            <div className="col-lg-8">
                                <p>Please upload a scan of a recent <strong>Bank Statement</strong> or <strong>Utility bill</strong> as proof of address.</p>
                                <p>Each document should contain <strong>your name and current address</strong> and should be</p>
                                <p>dated within the <strong>last 3 months</strong>.</p>
                                <p>They must also include the <strong>institution name, address and phone number</strong>.</p>
                            </div>
                        </div>
                    </Upload>   
                </div>

                <div className="card-header">
                    <strong>Details of Proof of Address Document:</strong>
                </div>
                <div className="card-body">
                    <FormItem label="Institution Name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('institution_name', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your institution name!' }],
                        })(<Input style={{ width: 300 }}/>)}
                    </FormItem>
                    <FormItem label="Document Type" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('doc_type', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please select your document type!' }],
                        })(
                        <Select placeholder="Select Document type..." style={{ width: 300 }}>
                            <Option value="">Select Document type...</Option>
                            <Option value="Bank Statement">Bank Statement</Option>
                            <Option value="Utility Bill">Utility Bill</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="Date Issued" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('issued_date', {
                            rules: [{ required: true, message: 'Please select your issued date!' }],
                        })(<DatePicker onChange={this.onIssuedDateChange} style={{ width: 300 }}/>)}
                    </FormItem>
                    <Button type="primary" onClick={() => this.kyc_done()}>Complete and Submit for Review</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => this.props.onClose()}>
                        Click to cancel request
                    </Button>
                </div>
            </div>
        )
    }
}

export default POA