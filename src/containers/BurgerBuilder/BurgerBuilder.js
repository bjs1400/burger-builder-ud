import React, { Component } from "react";

import Auxilliary from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import orderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  met: 1.3,
  bacon: 0.7
};

// this is where we manage all of our state

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-fb031.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      });
  }

  // function that will run after we add or remove ingredient to determine if we need to set purchasable to true or false
  updatePurchaseState(ingredients) {
    // we are using the passed in updatedIngredients object instead of that from the state
    const sum = Object.keys(ingredients) // this gives us an array of ingredient names
      .map(igKey => {
        return ingredients[igKey]; // the amount of each ingredient we have
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]; // this.state.ingredients[salad] = 2;
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]; // this.state.ingredients[salad] = 2;
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
    // this.setState({ loading: true }); // initially loading
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Brittany",
    //     address: {
    //       street: "123 cranbury st",
    //       zipcode: "10110",
    //       country: "United States"
    //     },
    //     email: "myemail@emailme.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(res => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(err => this.setState({ loading: true, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      // ??
      disabledInfo[key] = disabledInfo[key] <= 0; // will return true or false
    }
    let orderSummary = (
      <OrderSummary
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Auxilliary>
          <Burger ingredients={this.state.ingredients} />{" "}
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice.toFixed(2)}
          />{" "}
        </Auxilliary>
      );
    }
    return (
      <Auxilliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {" "}
          {orderSummary}{" "}
        </Modal>{" "}
        {burger}{" "}
      </Auxilliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
