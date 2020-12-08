import React, { Component } from 'react';
import Aux from '../../../HOc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/button'

class OrderSummary extends Component {
    // This could be a functional component,doesn't have to be a class
    componentWillUpdate(){
            console.log('[OrderSummary] WillUpdate')
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>

            </Aux>
        );
    }
}

export default OrderSummary;