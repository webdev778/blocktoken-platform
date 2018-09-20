import React from 'react'
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Upload, Button, Icon, Card, message, notification } from 'antd'
import idverify from '../../../../../assets/images/id_verify.png';
import axios from 'axios'
import * as UserAPI from 'lib/api/users';

const FormItem = Form.Item;
const Option = Select.Option;

const countryData = [ 
    'Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'S Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'RWANDA', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'
];

@Form.create()
class POI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          birthday: '',
          expires: '',
          fileList: []
        };
    }

    onBirthChange = (date, dateString) => {
        this.setState({birthday: dateString})
    }

    onIDExpireChange = (date, dateString) => {
        this.setState({expires: dateString})
    }
    
    kyc_next = async () => {
        try {
            const formData = new FormData();
            formData.append('file', this.state.fileList[0].originFileObj);
            formData.append('file', this.state.fileList[1].originFileObj);

            this.props.form.validateFields((err, values) => {
                if (err)
                    return;
                formData.append('firstname', values.firstname);
                formData.append('lastname', values.lastname);
                formData.append('gender', values.gender);
                formData.append('birthday', this.state.birthday);
                formData.append('country', values.country);
                formData.append('type', values.type);
                formData.append('number', values.number);
                formData.append('expires', this.state.expires);
            })

            const result = await UserAPI.savePoI(formData, {headers: {'Content-Type': 'multipart/form-data'}});
            if (result.data)
            {
                notification.open({
                type: 'success',
                message: 'Proof of Identity',
                description: 'Submitted successfully!'
                })

                this.props.onValueChange('kyc_current', 1);
            }
        }catch(e){
          notification.open({
            type: 'error',
            message: 'Proof of Identity',
            description: 'Submitted failure!'
          })
        }
    }

    handleChange = ({ fileList }) => {
        this.setState({fileList});
    }
    
    render() {
        const { getFieldDecorator } = this.props.form
        const countryOptions = countryData.map(country => <Option key={country}>{country}</Option>);
        const { fileList } = this.state;

        return (
            <div>
                <div className="card-header">
                    <strong>Customized content</strong>
                </div>
                <div className="card-body">
                    <FormItem label="First Name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('firstname', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your Last Name!' }],
                        })(<Input style={{ width: 300 }} />)}
                    </FormItem>
                    <FormItem label="Last Name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('lastname', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your Last Name!' }],
                        })(<Input style={{ width: 300 }} />)}
                    </FormItem>
                    <FormItem label="Gender" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Please select an gender!' }],
                        })(
                        <Select placeholder="Select an Gender..." style={{ width: 300 }}>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="Birthday" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('birthday', {
                            rules: [{ required: true, message: 'Please select your birthday!' }],
                        })(<DatePicker style={{ width: 300 }} onChange={this.onBirthChange} />)}
                    </FormItem>
                </div>
                <div className="card-header">
                    <strong>Upload a Scan of Your ID</strong>
                </div>
                
                <div className="card-body">
                    <Upload
                        action = '//jsonplaceholder.typicode.com/posts/'
                        listType="picture"
                        multiple="true"
                        onChange={this.handleChange}  >
                        <div className="row">
                            <div className="col-lg-4">
                                <a href="javascript: void(0);">
                                    <img src={idverify} width="200" alt="id"/>
                                </a>
                            </div>
                            <div className="col-lg-8">
                                <p>Please upload a Government issued ID such as a <strong>Passport</strong>, current <strong>Driver's License</strong> or <strong>National ID Card.</strong></p>
                                <p>Ensure you upload the <strong>front</strong> and <strong>back</strong> of your Driver's License or National ID Card.</p>
                            </div>
                        </div>
                    </Upload>
                </div>
                <div className="card-body">
                    <FormItem label="ID Issuing Country:" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('country', {
                            rules: [{ required: true, message: 'Please select your issuing country!' }],
                        })(
                        <Select placeholder="Select issuing country..." style={{ width: 300 }}>
                            <Option value="">Select issuing country...</Option>
                            {countryOptions}
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="ID Type:" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: 'Please select an ID type!' }],
                        })(
                        <Select placeholder="Select an ID type..." style={{ width: 300 }}>
                            <Option value="">Select an ID type...</Option>
                            <Option value="Passport">Passport</Option>
                            <Option value="Drivers License">Drivers License</Option>
                            <Option value="National ID Card">National ID Card</Option>
                            <Option value="Voter ID Card">Voter ID Card</Option>
                            <Option value="Armed Forces ID Card">Armed Forces ID Card</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="ID Number:" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('number', {
                            rules: [{ required: true, message: 'Please select your ID number!' }],
                        })(<Input placeholder="Please input ID Number..."  style={{ width: 300 }}/>)}
                    </FormItem>
                    <FormItem label="ID Expires" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('expires', {
                            rules: [{ required: true, message: 'Please select your expires date!' }],
                        })(<DatePicker onChange={this.onIDExpireChange} style={{ width: 300 }}/>)}
                    </FormItem>
                    <Button type="primary" onClick={() => this.kyc_next()}>Save and Continue</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => this.props.onClose()}>
                        Click to cancel request
                    </Button>
                </div>
            </div>
        )
    }
}

export default POI