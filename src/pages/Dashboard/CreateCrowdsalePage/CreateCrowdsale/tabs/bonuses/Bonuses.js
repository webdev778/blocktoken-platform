import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item;

class Bonuses extends React.Component {
    render() {
        return (
            <div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>First Period</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 10"
                        required
                        />
                        <label className="form-label">The amount of the first reward / bonus period in hours.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>Second Period</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 240"
                        required
                        />
                        <label className="form-label">The amount of the second reward / bonus period in hours.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>Third Period</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 480"
                        required
                        />
                        <label className="form-label">The amount of the third reward / bonus period in hours.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>First Bonus</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 20"
                        required
                        />
                        <label className="form-label">The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100 tokens and bonus is 50%, user gets 150 tokens.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>Second Bonus</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 10"
                        required
                        />
                        <label className="form-label">The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100 tokens and bonus is 50%, user gets 150 tokens.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>Third Bonus</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 5"
                        required
                        />
                        <label className="form-label">The bonus is a percentage of the amount of purchased tokens. E.g. if user buys 100 tokens and bonus is 50%, user gets 150 tokens.</label>
                    </FormItem>
                </div>
                <div className="row-lg-6">
                    <FormItem>
                        <label className="form-label"><strong>Presale Bonus</strong></label>
                        <Input
                        type="text"
                        placeholder="e.g. 50"
                        required
                        />
                        <label className="form-label">The bonus is a percentage of the amount of purchased tokens.</label>
                    </FormItem>
                </div>
            </div>
        )
    }
}

export default Bonuses
