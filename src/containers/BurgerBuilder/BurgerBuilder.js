import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandle';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-cc389.firebaseio.com/ingredients.json')
             .then(response => {
                 this.setState({ingredients: response.data});
             })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKeys => {
            return ingredients[igKeys]
        })
        .reduce((acc, el) => {
            return acc + el;
        }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldIngredientCount;
        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotalPrice});
        this.updatePurchaseState (updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <=0){
            return
        }
        const newIngredientCount = oldIngredientCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newIngredientCount;
        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: newIngredients, totalPrice: updatedTotalPrice});
        this.updatePurchaseState (newIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You Continued");
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ricky Saka',
                address: {
                    street: 'Rue Bassong',
                    zipCode: '12345',
                    country: 'Cameroon'
                },
                email: 'resr@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', order)
             .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
             })
             .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false})
             })
    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                continuePurchase={this.purchaseContinueHandler}
                                cancelPurchase={this.purchaseCancelHandler}
                                totalPrice={this.state.totalPrice}/>
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable= {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price={this.state.totalPrice} />
                </Aux>
            );
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}  
                </Modal>
                {burger}
            </Aux>
        );
    };
}

export default withErrorHandler( BurgerBuilder, axios);