import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 4,
        purchasable: false
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

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                added={this.addIngredientHandler}
                removed={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable= {this.state.purchasable}
                price={this.state.totalPrice} />
            </Aux>
        );
    };
}

export default BurgerBuilder;