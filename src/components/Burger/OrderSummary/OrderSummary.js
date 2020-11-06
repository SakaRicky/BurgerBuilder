import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
            .map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>);
            })

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderSummary}
            </ul>
            <p><strong>Total Price: {'$'.concat(props.totalPrice.toFixed(2))}</strong></p>
            <p>Continue to Check Out?</p>
            <Button btnType='Danger' clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continuePurchase}>CONTINUE</Button>
        </Auxiliary>
    )
};

export default orderSummary;