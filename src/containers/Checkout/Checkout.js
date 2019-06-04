import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price")
        if (param[0] === "price") {
          // ['salad', '1']
        } else {
          ingredients[param[0]] = +param[1];
        }
    }
    this.setState({
      ingredients
    });
  }

  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // go back to the previous page
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.setState.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => <ContactData ingredients={this.state.ingredients} />}
        />
      </div>
    );
  }
}

export default Checkout;
