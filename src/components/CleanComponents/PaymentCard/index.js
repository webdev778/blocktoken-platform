import React from 'react'
import './style.scss'

class PaymentCard extends React.Component {
  state = {
    icon: '',
    name: '',
    number: '',
    type: '',
    sum: '',
    footer: '',
  }

  getParams = () => {
    let params = this.props
    this.setState({
      ...params,
    })
  }

  componentWillMount() {
    this.getParams()
  }

  render() {
    const { icon, name, number, type, footer, sum } = this.state

    return (
      <div className="card card--withShadow paymentCard">
        {sum && <span className="paymentCard__sum">{sum}</span>}
        {icon && (
          <div className="paymentCard__icon">
            <i className={icon} />
          </div>
        )}
        {name && <span className="paymentCard__name">{name}</span>}
        {number && <span className="paymentCard__number">{number}</span>}
        {type && <span className="paymentCard__type">{type}</span>}
        {footer && <div className="paymentCard__footer">{footer}</div>}
      </div>
    )
  }
}

export default PaymentCard
