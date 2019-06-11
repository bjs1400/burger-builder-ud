import React, { Component } from "react";
import { connect } from "react-redux";
import Auxilliary from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import orderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions";

// this is where we manage all of our state

class BurgerBuilder extends Component {
  state = {
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

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");

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
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      // ??
      disabledInfo[key] = disabledInfo[key] <= 0; // will return true or false
    }
    let orderSummary = (
      <OrderSummary
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price.toFixed(2)}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Auxilliary>
          <Burger ingredients={this.props.ings} />{" "}
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price.toFixed(2)}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
