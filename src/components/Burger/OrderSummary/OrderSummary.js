import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate () {
        console.log('[OrderSummary] will update');
    }

    render() {
        const orderSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
                });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {orderSummary}
                </ul>
                <p><strong>Total Price: {'$'.concat(this.props.totalPrice.toFixed(2))}</strong></p>
                <p>Continue to Check Out?</p>
                <Button btnType='Danger' clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Auxiliary>
        );
    }
}


export default OrderSummary;